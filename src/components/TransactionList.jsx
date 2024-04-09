import React from "react";
export default function TransactionList({id,userName})
{
   return (<li key={id}> Name = {userName} </li>);
}