import { Router } from "oh-router";
import Login from "../pages/Login";
import Book from "../pages/Book";
import User from "../pages/User";
import { LoginCheckMiddleware } from "./middlewares/LoginCheck";

export const router = new Router({
    middlewares: [new LoginCheckMiddleware()],
    routes: [
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/",
            redirect: "user-manage"
        },
        {
            path: "/book-manage",
            element: <Book />
        },
        {
            path: "/User-manage",
            element: <User />
        },
        {
            path: "*",
            element: <div>404</div>
        }
    ]
})
