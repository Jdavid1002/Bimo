import React from 'react';
import Welcome from '../../img/welcome.svg'

const Home = ({data}) => {
    return (
        <div className="p-5 row" >
            <div className="col-md-6" >
                <h1 className="text-monospace mt-5 pt-3" > Bienvenido a casa</h1>
                <hr />
                <h1> {data.nombres}  </h1>
            </div>
            <div className="col-md-6" >
                <div className="d-flex justify-content-center" >
                    <img src={Welcome} alt="Welcome" className="w-75" />
                </div>
            </div>
        </div>
    );
}
 
export default Home;