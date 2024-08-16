import {useState} from "react";
import {Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom"

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [username, setUsername] = useState();

    const submitForm = () => {
        console.log("Form submitted");
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }
    return (
        <div className="container">
            <div className="form">
                <h1>Sign Up Page</h1>
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                                    placeholder="Please enter your email"
                                    value={email} name="email"
                                    onChange={(e) => {setEmail(e.target.value);}}
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
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                                   value={confirmPassword} name="confirmPassword"
                                   onChange={(e) => {setConfirmPassword(e.target.value);}}
                        />
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Button as="sub"
                                variant="primary"
                                onClick={submitForm}
                        >Sign up</Button>
                    </Form.Group>
                    <Form.Group>
                        <small><Link to="/login">Already have an account?</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    );
}
export default Signup;