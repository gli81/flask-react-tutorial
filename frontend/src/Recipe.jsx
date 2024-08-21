import { Card } from "react-bootstrap";

const Recipe = (props) => {
    return(
        <Card className="recipe">
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <p>{props.description}</p>
            </Card.Body>
        </Card>
    )
}

export default Recipe
