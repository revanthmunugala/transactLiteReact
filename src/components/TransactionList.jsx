import React from "react";

export default function TransactionList({id, userName, emailAddress, amountSpent}) {

    const[transactionLogData, setTransactionLogData] = React.useState([]);

    const[isClicked, setIsClicked] = React.useState(false);

    async function handleClick(e)
    {
        e.preventDefault();
        setIsClicked(true);
        const response =await fetch (`http://localhost:8080/postTransactLiteCommon/getLogSelected?id=${id}`)
        const data = await response.json();
        setTransactionLogData(data);
        console.log(data);
    }

    return (

        <div>

            <div style={{ display: 'inline' }} id={id} onClick = {(e) =>(handleClick(e))}>
                {userName} {emailAddress} {amountSpent}
            </div>
            ß
     {isClicked && (
        transactionLogData.map((item) => (
             <div key={item.id}>
                 {item.transactionType} {item.amountSpent} {item.transactionTimeStamp}
             </div>
         ))
     )}
            </div>

     );
}
