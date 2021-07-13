import React, {useState, useEffect } from 'react'
import db from '../../Configuration/Firebase'
import SellProduct from './SellProduct'


const Shop = ({data}) => {

    const [Compras, setCompras] = useState([])
    const [Validacion, setValidacion] = useState(true)
    const [Compra, setCompra] = useState({})

    const cargarCompras = async () => {
        let arregloProductos = []
        await db.firestore.collection("Productos").where("usuarioId", "==" , data.id ).get()
        .then(data => {
            if(data.docs.length > 0){
                data.forEach((doc) => {
                    arregloProductos.push(doc.data())
                })
                setCompras(arregloProductos)
            }else{
                setCompras([])
            }
        })
    }

    useEffect(() => {
        cargarCompras()
        // eslint-disable-next-line  
    }, [])


    const cambiarInterfaz = (estado , data) => {
        setValidacion(estado)
        setCompra(data)
    }

    return (
        <div>
            {Validacion ? 
                <div>
                    {Compras.map(data => 
                        <div className="shadow p-3 m-2 bg-white row pointer opacidad" onClick={()=> cambiarInterfaz(false, data) } key={data.id} >
                            <div className="col-md-2 d-flex justify-content-center" >
                                <img className="img-product-list" alt={data.nombre} src={data.imagen} />
                            </div>
                            <div className="col-md-3" >
                                <p className="text-time" >Nombre Producto </p>
                                <h6> {data.nombre} </h6>
                            </div>
                            <div className="col-md-2" >
                                <p className="text-time" >Marca Producto </p>
                                <h6> {data.marca} </h6>
                            </div>
                            <div className="col-md-2" >
                                <p className="text-time" >Precio Producto </p>
                                <h6> {data.precio} </h6>
                            </div>
                            <div className="col-md-3" >
                                <p className="text-time" >Ventas Totales </p>
                                <h6 > {data.ventas.length} </h6>
                            </div>
                        </div>  
                    )}
                </div>
            :
                <div>
                    <div className="d-flex justify-content-start" >
                        <div className="p-3 m-2 shadow rounded-circle pointer" onClick={()=> cambiarInterfaz(true, {}) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        <SellProduct data={Compra} />
                    </div>
                </div>
            }
        </div>
    );
}
 
export default Shop;