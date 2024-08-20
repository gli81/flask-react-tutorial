import {Router} from "oh-router";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import CreateRecipe from "./CreateRecipe";
import { LoginCheckMiddleware } from "./middlewares/loginCheck";


export const router = new Router({
    middlewares: [new LoginCheckMiddleware()],
    routes: [
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/signup",
            element: <Signup />
        },
        {
            path: "/create_recipe",
            element: <CreateRecipe />
        }
    ]
})