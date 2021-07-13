import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {useUser} from 'reactfire';
import Dashboard from '../views/Admin/Dashboard';
import Login from '../views/User/Login';
import Register from '../views/User/Register';
import Welcome from '../views/User/Welcome';
import ShopppingCart from '../views/Admin/ShopppingCart';

const Rutas = () => {
    const User = useUser()

    console.log(process.env.PUBLIC_URL);
    return (
        <div>
            <Router basename={process.env.PUBLIC_URL} >
                <Switch>
                    <Route path="/Bimo/Login">
                        { User.hasEmitted ? <Dashboard /> : <Login /> }
                    </Route>
                    <Route path="/Bimo/Register">
                        { User.hasEmitted ? <Dashboard /> : <Register /> }
                    </Route>
                    <Route path="/Bimo/Dashboard">
                        { User.hasEmitted ? <Dashboard /> : <Login /> }
                    </Route>
                    <Route path="/Bimo/ShopppingCart">
                        { User.hasEmitted ? <ShopppingCart /> : <Login /> }
                    </Route>
                    <Route path="/Bimo">
                        <Welcome />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
 
export default Rutas;
