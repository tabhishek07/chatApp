import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const AppRoutes = () => {

    return(
        <BrowserRouter>
         <Routes>
            <Route path="/" element = {<div>Home</div>} />
         </Routes>
        </BrowserRouter>
    )
}