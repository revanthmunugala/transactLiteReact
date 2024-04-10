import React from "react";
import {Link} from 'react-router-dom';
import styles from '../cssModules/NavBar.module.css';

export default function NavBar() {
    return (
        <div className={styles.NavBarClass}>

        <div>
        Welcome to TransactLite.
        </div>

        <div>
            <button>
                <Link to={"/Body"}>Start exploring TransactLite. </Link>
            </button>
        </div>
    </div>
    );
}

