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

    console.log(process.env.PUBLIC_URL + '/Login');

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="https://jdavid1002.github.io/Login" >
                        { User.hasEmitted ? <Dashboard /> : <Login /> }
                    </Route>
                    <Route path={process.env.PUBLIC_URL + '/Register'}  >
                        { User.hasEmitted ? <Dashboard /> : <Register /> }
                    </Route>
                    <Route path={process.env.PUBLIC_URL + '/Dashboard'} >
                        { User.hasEmitted ? <Dashboard /> : <Login /> }
                    </Route>
                    <Route path={process.env.PUBLIC_URL + '/ShopppingCart'}>
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
