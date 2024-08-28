import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { router } from "./router";
import { RouterView } from "oh-router-react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterView router={router}/>
  </StrictMode>,
)
