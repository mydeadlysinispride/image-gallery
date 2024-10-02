from flask import Flask, request
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import insert_test_document
from mongo_client import mongo_client
from flask import jsonify

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path='./.env.local')

UNSPLASH_URL = 'https://api.unsplash.com/photos/random'
UNSPLASH_KEY = os.getenv('UNSPLASH_KEY',"")
DEBUG = bool(os.getenv('DEBUG', True))

if not UNSPLASH_KEY:
    raise ValueError('UNSPLASH_KEY is not set. Please create a .env.local file and set the UNSPLASH_KEY variable.')

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = DEBUG


@app.route('/new-image')
def new_image():
    word = request.args.get('query')
    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY
    }
    params = {
        "query": word
    } 
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data

@app.route('/images', methods=['GET', 'POST'])
def images():
    if request.method == 'GET':
        images = images_collection.find()
        return jsonify([image for image in images])
    elif request.method == 'POST':
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}

@app.route('/images/<image_id>', methods=['DELETE'])
def image(image_id):
    if request.method == 'DELETE':
        result = images_collection.delete_one({"_id": image_id})
        print(result.deleted_count)
        if not result:
            return {"error": "Image was not deleted. Please try again"}, 500
        if result and not result.deleted_count:
            return {"error": "Image not found"}, 404
        return {"deleted_id": image_id}

@app.route('/')
def home():
    return "Hello, Flask on Windows!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

