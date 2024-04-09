import ShowTransaction from "./ShowTransaction";
import AddTransaction from "./AddTransaction";
import DeleteTransaction from "./DeleteTransaction";
import React from "react";

export default function Body() {
    return (
        <div>
            <ShowTransaction/>
            <AddTransaction/>
            <DeleteTransaction/>
        </div>);

}