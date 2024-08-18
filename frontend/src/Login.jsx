import {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom"
import { useForm } from "react-hook-form";
// import { login } from "../auth";
// import {useHistory} from "react-router-dom"

function Login() {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm();
    // const hist = useHistory();
    function login_(data) {
        const requestOptions = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        };
        fetch(
            "/api/login",
            requestOptions
        )
        .then(res => res.json())
        .then(d => {
            console.log(d.access_token);
            // login(d.access_token);
        })
        .catch(err => console.log(err))
        reset();
    };
    return (
        <div className="container">
            <div className="form">
                <h1>Login Page</h1>
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
                                            }
                                        )
                                    }
                        />
                    </Form.Group>
                    {
                        errors.username?.type==="required" &&
                        <p style={{color: "red"}}>
                            <small>Username is required</small>
                        </p>
                    }
                    {
                        errors.username?.type==="maxLength" &&
                        <p style={{color: "red"}}>
                            <small>Max length of username is 25</small>
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
                                                minLength: 8
                                            }
                                        )
                                    }
                        />
                    </Form.Group>
                    {
                        errors.password &&
                        <p stlye={{color: "red"}}>
                            <small>Invalid password</small>
                        </p>
                    }
                    <br />
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(login_)}>
                            Login
                        </Button>
                    </Form.Group>
                    <Form.Group>
                        <small><Link to="/signup">Do not have an account?</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    );
}
export default Login;