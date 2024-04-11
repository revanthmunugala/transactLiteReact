import styles from '../cssModules/Form.module.css';
import React, {useState} from "react";
import ResponseLog from "./ResponseLog";
//import ResponseLog from "./ResponseLog";

export default function Form({click}) {
    const [formData, setFormData] = useState({
        userName: '', email: '', itemDescription: '', amountSpent: '', sharedUser: []
    });

    const [message, SetMessage] = useState("");

    const [isClick, SetIsClick] = useState(false);

    const [isSearchClick, SetIsSearchClick] = useState(false);

    const [isFetch, setIsFetch] = useState(false);

    const [availableUsers, setAvailableUsers] = useState([]);

    const [searchedUsers, setSearchedUsers] = useState([]);

    const [searchValue, setSearchValue] = useState("");

    async function post(e) {

        e.preventDefault();
        SetIsClick("true");
        try {
            // console.log(formData);
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
            //console.log(formData);
        } catch (error) {
            SetMessage("Failed to Add transaction");
        }

    }

    async function fetchUsers() {
        if (!isFetch) {
            const response = await fetch("http://localhost:8080/postTransactLiteCommon/getAllUsers");
            if (!response.ok) {
                console.log(response);
            }
            const jsonData = await response.json();
            setAvailableUsers(jsonData)
            setIsFetch(true);
        }
    }

    fetchUsers()

    function updateChange(e, value) {
        //const value = e.target.value;
        const sharedUsers = formData.sharedUser;
        if (e.target.checked) {
            if (!sharedUsers.includes(value)) {
                setFormData({...formData, sharedUser: [...formData.sharedUser, value]})
            }
        } else {
            if (sharedUsers.includes(value)) {
                setFormData({...formData, sharedUser: sharedUsers.filter(user => user !== value)});
            }
        }
    }

    async function updateUsers(e) {
        // console.log(availableUsers);
        try {
            SetIsSearchClick(true);
            const value = e.target.value;
            setSearchValue(value);

            let matchUsers = []
            if (value !== "") {
                matchUsers = availableUsers.filter(user => user.includes(value))
            }

            setSearchedUsers(matchUsers)
        } catch (error) {
            console.log("Failed to fetch users from table.")
        }

    }

    const myStyle = {
        display: "flex", flexDirection: "row", justifyContent: "space-between", width: "150%", // border: "1px solid #ccc",
    };


    if (click) {
        return (<div style={myStyle}>
            <>
                {< form className={styles.formClass}>
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
                    <input type="search" value={searchValue} onChange={(e) => {
                        updateUsers(e)
                    }}/>


                    {isSearchClick && (<>
                        {searchedUsers.map(user => (<div key={user}>
                            <input type="checkbox"
                                   checked={formData.sharedUser.includes(user)}
                                   onChange={(e) => updateChange(e, user)}/>
                            {user}
                        </div>))}

                        {/*{formData.sharedUser.map(user => (*/}
                        {/*    <div key={user}>{user}</div>*/}
                        {/*))}*/}
                    </>)}


                    <button type="submit" onClick={(e) => {
                        post(e)
                    }}>Submit
                    </button>

                    {isClick && (<ResponseLog click={isClick} message={message}/>)}


                </form>}

                {<>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div> Shared Users</div>
                        <div>
                            {(formData.sharedUser).map(user => (<div key={user}>{user}</div>))}
                        </div>
                    </div>
                </>

                }
            </>
        </div>);
    }

    return null;
}