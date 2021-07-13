import React from 'react';
import {
    HashRouter as Router,
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

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/Login">
                        { User.hasEmitted ? <Dashboard /> : <Login /> }
                    </Route>
                    <Route path="/Register">
                        { User.hasEmitted ? <Dashboard /> : <Register /> }
                    </Route>
                    <Route path="/Dashboard">
                        { User.hasEmitted ? <Dashboard /> : <Login /> }
                    </Route>
                    <Route path="/ShopppingCart">
                        { User.hasEmitted ? <ShopppingCart /> : <Login /> }
                    </Route>
                    <Route path="/">
                        <Welcome />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
 
export default Rutas;
