import React,{useEffect, useState }  from 'react'
import {useUser} from 'reactfire';
import db from '../../Configuration/Firebase';
import Menu from './Menu';
import Home from './Home';
import Chart from './Chart';
import Product from './Product';
import Shop from './Shop';
import User from './infoUser/User';

const Dashboard = () => {
    const [numeroInterfaz, setnumeroInterfaz] = useState(0)
    const [DatosUsuario, setDatosUsuario] = useState({})
    const user = useUser()

    const cargarDatosUsuario = () => {
        const id = user.data.uid
        db.firestore.collection("Usuarios").where("id", "==" , id ).get()
        .then(data => {
            if(data.docs.length > 0){
                data.forEach((doc) => {
                    setDatosUsuario(doc.data())
                })
                setnumeroInterfaz(1)
            }else{
                setDatosUsuario({})
            }
        })
    }

    useEffect(() => {
        cargarDatosUsuario()
        // eslint-disable-next-line  
    }, [])

    const cambiarInterfaz = (e) => {
        const id = parseInt(e.target.id)
        setnumeroInterfaz(id)
    }

    return (
        <div className="p-5 mt-2" >
            <div className=" shadow rounded" >
                <div className="row bg-light" >
                    <div className="col-md-2" onClick={cambiarInterfaz} >
                        <Menu Usuario={(e)=> DatosUsuario(e) } />
                    </div>
                    <div className="col-md-10">
                        { numeroInterfaz === 1?  <Home     data={DatosUsuario} />   :null}
                        { numeroInterfaz === 2?  <Product  data={DatosUsuario} /> :null}
                        { numeroInterfaz === 3?  <Shop     data={DatosUsuario} />   :null}
                        { numeroInterfaz === 4?  <Chart    data={DatosUsuario} />  :null}
                        { numeroInterfaz === 6?  <User     data={DatosUsuario} />   :null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;