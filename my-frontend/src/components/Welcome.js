import React from "react";
import { Container, Button, Card } from "react-bootstrap";

const Welcome = () => {
    return (
        <Container className="mt-5">
            <Card className="text-center">
                <Card.Body>
                    <Card.Title><h1>Welcome to Images Gallery</h1></Card.Title>
                    <Card.Text>
                        This is a simple application that allows you to search for images using the Unsplash API.
                    </Card.Text>
                    <Button variant="primary" href="https://unsplash.com/" target="_blank">Learn more</Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Welcome;
