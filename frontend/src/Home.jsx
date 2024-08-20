import {useEffect, useState} from "react";
// import {Link} from "react-router-dom";
// import {useAuth} from "./auth.jsx";
import Recipe from "./Recipe.jsx";
import { Button } from "react-bootstrap";
// import { router } from "./router.jsx";
import {handleSignup} from "./util/handleAcct.js"

function LoggedInHome() {
    const [recipes, setRecipes] = useState([]);
    useEffect(
        () => {
            fetch("/api/recipes")
            .then(resp => resp.json())
            .then(data => {
                setRecipes(data);
            })
            .catch(err => console.log(err))
        }, [] // only load when first rendering
    );
    return (
        <div className="recipes">
            <h1>List</h1>
            <>{recipes.map(
                recipe => {
                    return <Recipe
                                key={recipe.id}
                                title={recipe.title}
                                description={recipe.description}
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
            <Button variant="primary" onClick={() => handleSignup()}>
                sign up
            </Button>
        </div>
    )
}

function Home() {
    // const [logged] = useAuth();
    return (
        <LoggedOutHome />
    )
    // return (
    //     <>{logged ? <LoggedInHome /> : <LoggedOutHome />}</>
    // );
}
export default Home;