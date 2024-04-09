import React,{useState} from "react";
import TransactionList from "./TransactionList";
import ResponseLog from "./ResponseLog";

export default function ShowTransaction() {

    const[transactionData,setTransactionData]=useState([]);

    const[isClick,SetIsClick]=useState(false);

    const [message,SetMessage]=useState("");

    async function show(e) {
        e.preventDefault();
        SetIsClick(true);
        try {
            const response = await fetch("http://localhost:8080/postTransactLiteCommon/get");
            if(!response.ok)
            {
                throw new Error("Failed to get transaction");
            }
            const jsonData = await response.json();
            setTransactionData(jsonData)
            //message = jsonData.message;
            SetMessage("Showed transaction");
        }catch(error)
        {
            //message = error.message;
            SetMessage("Failed to get transaction");
        }

        //console.log(message);

    }

    return (
        <div>
            <button onClick={(e) => show(e)}> Show Transactions</button>

            {isClick && (
                <div>
                    <ul>
                        {transactionData.map((item) => (
                            <TransactionList key={item.id} id={item.id} userName={item.userName} />
                        ))}
                    </ul>
                    <ResponseLog click={isClick} message={message} />
                </div>
            )}
        </div>
    );

}