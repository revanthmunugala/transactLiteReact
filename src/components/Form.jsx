import styles from '../cssModules/Form.module.css';
import React, {useState} from "react";
import ResponseLog from "./ResponseLog";
//import ResponseLog from "./ResponseLog";

export default function Form({click}) {
    const [formData, setFormData] = useState({userName: '', email: '', itemDescription: '', amountSpent: '', sharedUser:[]});

    const [message, SetMessage] = useState("");

    const [isClick, SetIsClick] = useState(false);

    const [isMouseEnter, SetIsMouseEnter] = useState(false);

    const [availableUsers, setAvailableUsers] = useState([]);

    async function fetchUsers(e) {
        e.preventDefault();
        SetIsMouseEnter(true);

        try {
            const response = await fetch("http://localhost:8080/postTransactLiteCommon/getAllUsers");
            if (!response.ok) {
                console.log(response);
            }
            const jsonData = await response.json();
            setAvailableUsers(jsonData)
        } catch (error) {
            console.log("Failed to fetch users from table.")
        }
    }

    async function post(e) {

        //e.preventDefault();
        SetIsClick("true");
        try {

            const response = await fetch("http://localhost:8080/postTransactLiteCommon/post", {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(formData)
            })
            if (!response.ok) {
                SetMessage("Failed to Add transaction");
            }
            const responseText = await response.text();
            SetMessage(responseText);
            console.log(formData);
        } catch (error) {
            SetMessage("Failed to Add transaction");
        }

    }

    function updateChange(e)
    {
        const value = e.target.value;
        const sharedUsers = formData.sharedUser;
        if(sharedUsers.includes(value)){
            setFormData({...formData,sharedUser:sharedUsers.filter(user=>user!==value)});
        }else
        {
            setFormData({...formData,sharedUser:[...formData.sharedUser,value]})
        }
    }

    if (click) {
        return (<form className={styles.formClass}>
            <label htmlFor="userName">User Name:</label>
            <input type="text" id="userName" name="userName"
                   onChange={(e) => setFormData((data) => ({...data, userName: e.target.value}))}/>

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" onChange={(e) => {
                setFormData(data => ({...data, email: e.target.value}))
            }}/>

            <label htmlFor="itemDescription">Item Description:</label>
            <input type="text" id="itemDescription" name="itemDescription" onChange={(e) => {
                setFormData(data => ({...data, itemDescription: e.target.value}))
            }}/>

            <label htmlFor="amountSpent">Amount Spent:</label>
            <input type="number" id="amountSpent" name="amountSpent" onChange={(e) => {
                setFormData(data => ({...data, amountSpent: e.target.value}))
            }}/>


            <label>Share transaction among:</label>
            <div onClick={e=>(fetchUsers(e))}>
                Select users
                {isMouseEnter &&
                    availableUsers.map((user) => (
                        <div key={user}>
                            <input
                                type="checkbox"
                                value={user}
                                checked={formData.sharedUser.includes(user)}
                                onChange={(e) => updateChange(e)}
                            />
                            <label>{user}</label>
                        </div>
                    ))}

            </div>

            <button type="submit" onClick={(e) => {
                post(e)
            }}>Submit
            </button>

            {isClick && (<ResponseLog click={isClick} message={message}/>)}


        </form>);
    }

    return null;
}