import { Middleware } from "oh-router";
import { getToken } from "../../shared/token";
import { router } from "..";


export class LoginCheckMiddleware extends Middleware {
    async handler(
        ctx, next
    ) {
        const token = getToken();
        if (ctx.to.pathname === "/login") {
            if (token) {
                router.navigate("/");
            } else {
                next();
            }
            return;
        }
        if (token) {
            next();
        } else {
            router.navigate("/login");
        }
    }

    // register({ to }) {
    //     return to.pathname !== "/login";
    // }
}