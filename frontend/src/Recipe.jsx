import { Card, Modal, Button } from "react-bootstrap";

const Recipe = (props) => {
    return(
        <Card className="recipe">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <p>{props.description}</p>
                <Button
                    variant="primary"
                    onClick={props.onClick}
                >
                    Update
                </Button>
                <Button
                    variant="danger"
                    onClick={props.onDelete}
                >
                    Delete
                </Button>
            </Card.Body>
        </Card>
    )
}

export default Recipe
