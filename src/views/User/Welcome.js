import React,{useEffect, useState} from 'react'
import db from '../../Configuration/Firebase'
import Swal from 'sweetalert2'
import {useUser} from 'reactfire';

const Welcome = () => {
    const User = useUser()

    const [Productos, setProductos] = useState([])

    const cargarProductos = () => {
        let arregloProductos = []
        db.firestore.collection("Productos").get()
        .then(data => {
            if(data.docs.length > 0){
                data.forEach((doc) => {
                    let datos = {
                        nombre : doc.data().nombre,
                        usuarioNombre : doc.data().usuarioNombre,
                        usuarioId : doc.data().usuarioId,                        
                        precio : doc.data().precio,
                        marca : doc.data().marca , 
                        imagen : doc.data().imagen,
                        id : doc.id,
                        imagenNombre : doc.data().imagenNombre
                    }
                    arregloProductos.push(datos)
                })
                setProductos(arregloProductos)
            }else{
                setProductos([])
            }
        })
    }



    useEffect(() => {
        cargarProductos()
        // eslint-disable-next-line  
    }, [])


    const agregarProductoCarrito = async (product) => {       
        if(User.data === null){
            return window.location.replace("/Bimo/#/Login")
        }else{
            let arregloCarrito = []
            db.firestore.collection("Carrito").get()
            .then(async(data) => {

                if(data.docs.length > 0){

                    data.forEach((doc) => {
                        let datos = {
                            producto : doc.data().producto,
                            usuario : doc.data().usuario
                        }
                        arregloCarrito.push(datos)
                    })
                    const arregloRepetido = arregloCarrito.filter(data => data.producto === product.nombre)
                    if(arregloRepetido.length > 0){
                        Swal.fire({
                            icon : "error",
                            title : "Producto ya agregado",
                            text : "No puedes agregar el mismo producto a tu carrito"
                        })
                    }else{
                        const datos = {
                            producto : product.nombre,
                            usuario : User.data.uid
                        }
                        await db.firestore.collection("Carrito").doc().set(datos)
                        Swal.fire({
                            icon : "success",
                            title : "Producto agregado al carrito correctamente."
                        })
                    }

                }else{
                    const datos = {
                        producto : product.nombre,
                        usuario : User.data.uid
                    }
                    await db.firestore.collection("Carrito").doc().set(datos)
                    
                    Swal.fire({
                        icon : "success",
                        title : "Producto agregado al carrito correctamente."
                    })
                }
            })
        }

    }

    return (
        <div>
            <div className="container">
                <div className="row" >
                    {Productos.map(data =>
                        <div key={data.id} className="col-md-4"  >
                            <div className="shadow m-2 card-product pt-3">

                                <div className="d-flex justify-content-center mt-2" >
                                    <img className="img-card-product" src={data.imagen} alt={data.nombre} />
                                </div>
                                <div className="m-2 p-3" >
                                    <h6 className="text-center" >  {data.nombre} </h6>
                                    <p className="text-center h6 text-danger" > ${data.precio} </p>
                                </div>

                                <div className="Eliminar bg-red-white p-3 pointer" onClick={()=> agregarProductoCarrito(data) } >
                                    <h6 className="text-center text-white" > COMPRAR </h6>
                                </div>
                            </div>
                        </div>                
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default Welcome;