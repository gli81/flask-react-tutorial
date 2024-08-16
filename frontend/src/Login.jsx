import {useState, useEffect} from "react";
import {Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom"

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    function login() {
        console.log("");
        setUsername('');
        setPassword('');
    }
    return (
        <div className="container">
            <div className="form">
                <h1>Login Page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                                    placeholder="Please enter your name"
                                    value={username} name="username"
                                    onChange={(e) => {setUsername(e.target.value);}}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                    placeholder="Please enter your password"
                                    value={password} name="password"
                                    onChange={(e) => {setPassword(e.target.value);}}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Button as="sub"
                                variant="primary"
                                onClick={login}
                        >Login</Button>
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