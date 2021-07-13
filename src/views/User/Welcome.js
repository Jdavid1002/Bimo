import React,{useEffect, useState} from 'react'
import db from '../../Configuration/Firebase'
import Swal from 'sweetalert2'
import {useUser} from 'reactfire';
import Carrusel from './Carrusel';

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
            return window.location.replace("/Login")
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
            <Carrusel />
            <div className="container">
                <div className="row" >
                    {Productos.map(data =>
                        <div key={data.id} className="col-md-4"  >
                            <div className="shadow m-2 card-product">
                                <div className="d-flex justify-content-between p-3" > 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="pointer bi bi-heart" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                    </svg>
                                </div>

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