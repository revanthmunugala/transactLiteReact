import React,{useState} from "react";
import ResponseLog from "./ResponseLog";

export default function DeleteTransaction() {

    const[isClick,SetIsClick]=useState(false);

    const [message,SetMessage]=useState("");

    async function handleClick(e) {
        //e.preventDefault();
        SetIsClick(true);
        try {
            const response = await fetch("http://localhost:8080/postTransactLiteCommon/deleteAll", {method: "DELETE"});
            if (!response.ok) {
                throw new Error("Failed to delete transaction");
            }
            const data = await response.text();
            SetMessage(data);
        } catch (err) {
            SetMessage("Failed to delete data");
        }
    }

    return (<div>
        <button onClick={(e) => (handleClick(e))}> Delete All Transactions</button>

        {isClick && (
            <ResponseLog click={isClick} message={message} />
        ) }


    </div>);
}