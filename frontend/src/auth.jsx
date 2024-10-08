// -*- coding: utf-8 -*-

import { createAuthProvider } from "react-token-auth";

export const {useAuth, authFetch, login, logout} = 
    createAuthProvider(
        {
            getAccessToken: session => session.access_token,
            storage: localStorage,
            onUpdateToken: (token) => fetch(
                "/api/refresh",
                {
                    method: "POST",
                    body: token.refresh_token
                }
            )
            .then(r => r.json())
        }
    )
