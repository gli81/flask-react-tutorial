import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "./auth.jsx";
import Recipe from "./Recipe.jsx";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

function LoggedInHome() {
    const[show, setShow] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [recipeId, setRecipeId] = useState(0);
    const [changed, setChanged] = useState(true);
    // const hist = useNavigate();
    useEffect(
        () => {
            fetch("/api/recipes")
            .then(resp => resp.json())
            .then(data => {
                setRecipes(data);
            })
            .catch(err => console.log(err))
        }, [changed] // only load when first rendering
    );
    function closeModal() {
        setShow(false);
    }
    function showModal(id) {
        setShow(true);
        setRecipeId(id);
        recipes.map(
            recipe => {
                if (recipe.id === id) {
                    setValue("title", recipe.title);
                    setValue("description", recipe.description);
                }
            }
        );
    }
    const {register, handleSubmit, setValue, formState: {errors}} = useForm();
    function updateRecipe(data) {
        const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
        const reqOp = {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify({...data, id: recipeId}),
        };
        fetch(
            `/api/recipe/${recipeId}`,
            reqOp
        )
        .then(() => {closeModal();setChanged(!changed);})
        .catch(err => console.log(err));
    }
    function deleteRecipe(id) {
        const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
        const reqOp = {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${JSON.parse(token)}`
            },
        };
        fetch(
            `/api/recipe/${id}`,
            reqOp
        )
        .then(() => {setChanged(!changed);})
        .catch(err => console.log(err));
    }
    return (
        <div className="home container">
            <Modal
                show={show}
                size="lg"
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Recipe
                    </Modal.Title>
                    <Modal.Body>
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
                                    onClick={handleSubmit(updateRecipe)}
                                >
                                    Save
                                </Button>
                            </Form.Group>
                        </form>
                    </Modal.Body>
                </Modal.Header>
            </Modal>
            <h1>List</h1>
            <>{recipes.map(
                recipe => {
                    return <Recipe
                                key={recipe.id}
                                title={recipe.title}
                                description={recipe.description}
                                onClick={() => showModal(recipe.id)}
                                onDelete={() => {deleteRecipe(recipe.id);}}
                            />
                }
            )}
            </>
        </div>
    )
}

function LoggedOutHome() {
    return (
        <div className="home container">
            <h1 className="heading">Welcome</h1>
            <Link to="/signup" className="btn btn-primary btn-lg">Get Start</Link>
        </div>
    )
}

function Home() {
    const [logged] = useAuth();
    return (
        <>{logged ? <LoggedInHome /> : <LoggedOutHome />}</>
    );
}
export default Home;
