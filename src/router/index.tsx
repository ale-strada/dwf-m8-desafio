import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {Layout} from "components/Layout"
import { Home } from "pages/Home";
import {PetsNear} from "pages/PetsNear"
import { Login } from "pages/Login";
import { Signup } from "pages/Signup";
import { Post } from "pages/Post";
import { MyPets } from "pages/MyPets";
import { EditPet } from "pages/EditPet";
import {Load} from "pages/Load"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="/mascotas/:lat,:lng" element={<PetsNear/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/login/:email" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/post" element={<Post/>} />
                <Route path="/post/:lat,:lng" element={<Post/>} />
                <Route path="/mypets" element={<MyPets/>} />
                <Route path="/edit" element={<EditPet/>} />
                <Route path="/edit/:lat,:lng" element={<EditPet/>} />
                <Route path="/load" element={<Load/>} />
            </Route>
        </Routes>
    )
  }

  export {AppRoutes}