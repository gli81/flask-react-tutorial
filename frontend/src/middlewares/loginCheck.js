import { Middleware } from "oh-router";
import { getToken } from "../util/token";
import { router } from "../router";


export class LoginCheckMiddleware extends Middleware {
    async handler(ctx, next) {
        const token = getToken();
        if (ctx.to.pathname === "/") {next(); return;}
        if (ctx.to.pathname === "/login") {
            if (token) {router.navigate("/");}
            else {next();}
            return;
        }
        if (token) {
            next();
        } else {
            router.navigate("/login");
        }
    }

    register({to}) {
        return true
    }
}