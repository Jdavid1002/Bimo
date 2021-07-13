import React,{useState, useEffect} from 'react'
import db from '../../Configuration/Firebase'
import {useUser} from 'reactfire';
import Swal from 'sweetalert2';
import DetailsPurchase from './DetailsPurchase';

const ShopppingCart = () => {
    const User = useUser()

    const [Productos, setProductos] = useState([])
    const [Validacion, setValidacion] = useState(false)
    const [Total, setTotal] = useState(0)

    const traerDatos = async () =>{
        const consulta = await db.firestore.collection("Carrito").where("usuario", "==" , User.data.uid ).get()
        if(consulta.docs.length > 0){
            let arregloProductos = []
            let suma = []
            consulta.docs.map(async (doc) => {
                const res =  await db.firestore.collection("Productos").where("nombre", "==" ,  doc.data().producto).get()
                arregloProductos.push(res.docs[0].data())
                suma.push(parseInt(res.docs[0].data().precio))
            })
            setProductos(arregloProductos)
            setTotal(suma)
        }else{
            setProductos([])
        }
    }



    useEffect(() => {
        traerDatos()

        setInterval(() => {
            setValidacion(true)            
        }, 2000)
        // eslint-disable-next-line  
    }, [])


    const eliminarProducto = (product) => {
        Swal.fire({
            title: '¿Quieres eliminar este producto?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
          }).then( async (result) => {
            if (result.isConfirmed) {
                const productoEliminar = await db.firestore.collection('Carrito').where("usuario", "==" ,User.data.uid ).where("producto", "==" , product.nombre).get()
                await db.firestore.collection('Carrito').doc(productoEliminar.docs[0].id).delete()
                setProductos(Productos.filter(dato => dato.nombre !== product.nombre ))
            } 
          })
    }
    
    return (
            <div>
                <div>
                    { Validacion?
                        <div className="mx-5 mt-4">
                            <div className="row" >
                                <div className="col-md-8 bg-white">
                                    <div className="p-4">
                                        <div className="d-flex justify-content-between" >
                                            <h4>Items Carrito</h4>
                                            <h4> {Productos.length} Items </h4>
                                        </div>
                                        <hr />
                                        {Productos.map(data => 
                                            <div className="shadow p-3 m-2 bg-white row" key={data.nombre} >
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
                                                <div className="col-md-2" >
                                                    <p className="text-time" >Cantidad </p>
                                                    <input type="number" className="form-control" id={data.nombre} />
                                                </div>
                                                <div className="col-md-1">
                                                    <div className="d-flex align-items-center h-100 justify-content-center m-2">
                                                        <svg onClick={()=> eliminarProducto(data)} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-circle pointer" viewBox="0 0 16 16">
                                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>    
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 bg-light">
                                    <DetailsPurchase  Productos={Productos} Total={Total} User={User} />
                                </div>
                            </div>
                        </div> 
                    :
                        <div className="d-flex justify-content-center cargar" >
                            <div className="spinner-border text-info" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        </div>
                    }
                </div>
            </div>
    );
}
 
export default ShopppingCart;