import React, {useState} from "react";
import ResponseLog from "./ResponseLog";
import TransactionList from "./TransactionList";

export default function ShowTransaction() {

    const [transactionData, setTransactionData] = useState([]);

    const [isClick, SetIsClick] = useState(false);

    const [message, SetMessage] = useState("");

    async function show(e) {
        e.preventDefault();
        SetIsClick(true);
        try {
            const response = await fetch("http://localhost:8080/postTransactLiteCommon/get");
            if (!response.ok) {
                throw new Error("Failed to get transaction");
            }
            const jsonData = await response.json();
            setTransactionData(jsonData)

            SetMessage("Showed transaction");
        } catch (error) {

            SetMessage("Failed to get transaction");
        }

    }

    return (<div>
        <button onClick={(e) => show(e)}> Show Transactions</button>

        {isClick && (<div >

                {transactionData.map((item) => (<TransactionList key={item.id} id={item.id} userName={item.userName}
                                                                 emailAddress={item.emailAddress}
                                                                 amountSpent={item.totalSpent}/>))}


            <ResponseLog click={isClick} message={message}/>
        </div>)}
    </div>);

}