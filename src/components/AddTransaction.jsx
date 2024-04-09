import {useState} from "react";
import Form from "./Form";
import React from "react";

export default function AddTransaction() {

    const [click,setClick] = useState(false);
    return (
        <div>
            <button onClick={ ()=> setClick(true)}> Add Transaction</button>
            <Form click={click}/>
        </div>

    );

}