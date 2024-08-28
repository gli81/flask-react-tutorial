import { useState } from "react";
import { Input, Button } from "antd";
import { setToken } from "../shared/token";
import { router } from "../router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    async function onsubmit() {
        await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify({
            //     "username": username,
            //     "password": password
            // })
            // ==> more concise
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setToken("_access", data.access_token);
            setToken("_refresh", data.refresh_token);
        });
        router.navigate("/");
    }
    return (
        <div>
            <h1>Login</h1>
            <Input 
                value={username}
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
            />
            <Input 
                value={password}
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                loading={loading}
                type="primary"
                block onClick={onsubmit}
            >
                Login
            </Button>
        </div>
    );
}