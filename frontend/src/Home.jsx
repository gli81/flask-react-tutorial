import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "./auth.jsx";

function LoggedInHome() {
    return (
        <div className="recipes">
            <h1>List</h1>
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