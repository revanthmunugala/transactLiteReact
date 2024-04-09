import Body from "./Body";
import NavBar from "./NavBar";
import React from "react";
import Default from "./Default";

import {BrowserRouter, Route, Routes} from "react-router-dom";

// export default function App() {
//     return (
//         <div className="App">
//             <NavBar/>
//             <Body/>
//         </div>
//     );
// }

export default function App() {
    return (<BrowserRouter>
            <Routes>
                <Route path="/" element={<NavBar/>}> </Route>
                <Route path="/Body" element={<Body/>}> </Route>
                <Route path="*" element={<Default/>}> </Route>
            </Routes>
        </BrowserRouter>);
}
