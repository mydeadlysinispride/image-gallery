import React from "react";
import { Card, Button, Nav } from "react-bootstrap";

const ImageCard = ({ image, deleteImage, saveImage }) => {
    const imageUrl = image?.urls?.small || 'https://via.placeholder.com/150'; // Fallback URL
    const title = image?.title || 'Untitled'; // Fallback title
    const description = image?.description || image?.alt_description || 'No description available'; // Fallback description

    const authorName = image.user?.name || 'Unknown author';
    const authorPortfolioURL = image.user?.portfolio_url;
    return (
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={imageUrl} alt={description} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Button variant="primary" onClick={() => deleteImage(image.id)}>Delete</Button>{' '}
            {!image.saved && 
            (<Button variant="success" onClick={() => saveImage(image.id)}>Save</Button>)}
          </Card.Body>
          <Card.Footer className="text-center text-muted">
            {authorPortfolioURL && 
              <Nav.Link href={authorPortfolioURL} target="_blank">
                {authorName}
              </Nav.Link>}
            {!authorPortfolioURL && authorName}
          </Card.Footer>
        </Card>
    );
};

export default ImageCard;
