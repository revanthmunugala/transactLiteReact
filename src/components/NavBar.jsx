import React from "react";
import {Link} from 'react-router-dom';

export default function NavBar() {
    return (<div>
        Welcome to TransactLite.

        <div>
            <button>
                <Link to={"/Body"}>Start exploring TransactLite. </Link>
            </button>
        </div>
    </div>);
}

