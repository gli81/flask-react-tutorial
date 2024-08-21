import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function CreateRecipe() {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    function createRecipe(data) {
        const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
        const reqOp = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data),
        };
        fetch(
            "/api/recipes",
            reqOp
        )
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
        
        reset();
    }
    return (
        <div className="container">
            <h1>Create Recipe</h1>
            <form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        {
                            ...register(
                                "title",
                                {required: true, maxLength: 25}
                            )
                        }
                    />
                </Form.Group>
                {
                    errors.title?.type==="required" &&
                        <p style={{color: "red"}}>
                            <small>Title is required</small>
                        </p>
                }
                {
                    errors.title?.type==="maxLength" &&
                        <p style={{color: "red"}}>
                            <small>Max length exceeded</small>
                        </p>
                }
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        {
                            ...register(
                                "description",
                                {required: true, maxLength: 255}
                            )
                        }
                    />
                </Form.Group>
                {
                    errors.description?.type==="required" &&
                        <p style={{color: "red"}}>
                            <small>Description is required</small>
                        </p>
                }
                {
                    errors.description?.type==="maxLength" &&
                        <p style={{color: "red"}}>
                            <small>Max length exceeded</small>
                        </p>
                }
                <br />
                <Form.Group>
                    <Button
                        variant="btn btn-primary btn-lg"
                        onClick={handleSubmit(createRecipe)}
                    >
                        Save
                    </Button>
                </Form.Group>
            </form>
        </div>
    );
}
export default CreateRecipe;
