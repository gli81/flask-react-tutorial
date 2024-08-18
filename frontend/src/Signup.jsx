import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup() {
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [serverResponse, setServerResponse] = useState('');
    const submitForm = (data) => {
        if (data.password === data.confirmPassword) {
            const payload = {
                username: data.username,
                password: data.password,
                email: data.email
            }
            const requestOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(payload)
            };
            // console.log(requestOptions.body);
            fetch("/api/signup", requestOptions)
                .then(res => res.json())
                .then(data => {
                    setServerResponse(data.msg);
                    setShow(true);
                })
                .catch(err => console.log(err));
            reset();
        } else {
            alert("Passwords don't match");
        }
    }
    return (
        <div className="container">
            <div className="form">
                {
                    show ?
                    <>
                        <Alert variant="success"
                            onClose={
                                () => {setShow(false)}
                            } dismissible>
                        <p>
                            {serverResponse}
                        </p>
                        </Alert>
                        <h1>Sign Up Page</h1>
                    </>
                    :
                    <h1>Sign Up Page</h1>
                }
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="Please enter your name"
                            {
                            ...register(
                                "username",
                                {
                                    required: true,
                                    maxLength: 25,
                                },
                            )
                            }
                        />
                    </Form.Group>
                    {
                        errors.username?.type === "required" &&
                        <p style={{ color: "red" }}>
                            <small>Username is required</small>
                        </p>
                    }
                    {
                        errors.username?.type === "maxLength" &&
                        <p style={{ color: "red" }}>
                            <small>Max length for username is 25</small>
                        </p>
                    }
                    <br />
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="Please enter your email"
                            {
                            ...register(
                                "email",
                                {
                                    required: true,
                                    maxLength: 80,
                                },
                            )
                            }
                        />
                    </Form.Group>
                    {
                        errors.email?.type === "required" &&
                        <p style={{ color: "red" }}>
                            <small>Email is required</small>
                        </p>
                    }
                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Please enter your password"
                            {
                            ...register(
                                "password",
                                {
                                    required: true,
                                    minLength: 8,
                                },
                            )
                            }
                        />
                    </Form.Group>
                    {
                        errors.password?.type === "required" &&
                        <p style={{ color: "red" }}>
                            <small>Password is required</small>
                        </p>
                    }
                    {
                        errors.password?.type === "minLength" &&
                        <p style={{ color: "red" }}>
                            <small>Min length for password is 8</small>
                        </p>
                    }
                    <br />
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Please confirm your password"
                            {
                            ...register(
                                "confirmPassword",
                                {
                                    required: true,
                                    minLength: 8,
                                    // validate: "password",
                                },
                            )
                            }
                        />
                    </Form.Group>
                    {
                        watch("password") != watch("confirmPassword") &&
                        <p style={{ color: "red" }}>
                            <small>Passwords don't match</small>
                        </p>
                    }
                    <br />
                    <Form.Group>
                        <Button as="sub"
                            variant="primary"
                            onClick={handleSubmit(submitForm)}
                        >Sign up</Button>
                    </Form.Group>
                    <Form.Group>
                        <small>
                            <Link to="/login">Already have an account?</Link>
                        </small>
                    </Form.Group>
                </form>
            </div>
        </div>
    );
}
export default Signup;