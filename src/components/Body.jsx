import React from "react";
import {Link} from 'react-router-dom';
import ShowTransaction from "./ShowTransaction";
import AddTransaction from "./AddTransaction";
import DeleteTransaction from "./DeleteTransaction";

export default function Body() {
    return (

        <nav>
            <button>
                <Link to = {"/ShowTransaction"} element = { <ShowTransaction/>}> ShowTransaction </Link>
            </button>

            <button>
                <Link to = {"/AddTransaction"} element = { <AddTransaction/>}> AddTransaction </Link>
            </button>

            <button>
                <Link to = {"/DeleteTransaction"} element = { <DeleteTransaction/>}> DeleteTransaction </Link>
            </button>
        </nav>);

}