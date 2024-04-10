import Body from "./Body";
import NavBar from "./NavBar";
import React from "react";
import Default from "./Default";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import ShowTransaction from "./ShowTransaction";
import AddTransaction from "./AddTransaction";
import DeleteTransaction from "./DeleteTransaction";

import styles from '../cssModules/App.module.css';

export default function App() {
    return (
        <BrowserRouter>
            <div className={styles.AppClass}>
            <Routes>
                <Route path="/" element={<NavBar/>}> </Route>
                <Route path="/Body" element={<Body/>}> </Route>
                <Route path="/ShowTransaction" element={<ShowTransaction/>}> </Route>
                <Route path="/AddTransaction" element={<AddTransaction/>}> </Route>
                <Route path="/DeleteTransaction" element={<DeleteTransaction/>}> </Route>
                <Route path="*" element={<Default/>}> </Route>
            </Routes>
            </div>
        </BrowserRouter>
    );
}
