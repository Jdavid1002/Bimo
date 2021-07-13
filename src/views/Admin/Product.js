import React, {useState, useEffect} from 'react'
import db from '../../Configuration/Firebase';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Swal from 'sweetalert2';
import firebase from 'firebase';

const Product = ({data}) => {
    const [Productos, setProductos] = useState([])
    const [cambioInterfaz, setcambioInterfaz] = useState(true)
    const [numeroInterfaz, setnumeroInterfaz] = useState(0)
    const [Product, setProduct] = useState({})

    //PARA CARGAR PRODUCTOS

    const traerDatos = async () =>{
        let arregloProductos = []
        db.firestore.collection("Productos").where("usuarioId", "==" , data.id ).get()
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
        traerDatos()
        // eslint-disable-next-line  
    }, [])


    const cambiarInterfaz = (numero , estado , product) => {
        setnumeroInterfaz(numero)
        setcambioInterfaz(estado)
        setProduct(product)
    }

    const eliminarProduct = (product) => {
        console.log(product);
        Swal.fire({
            title: '¿Quieres eliminar este producto?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
          }).then( async (result) => {
            if (result.isConfirmed) {
                await db.firestore.collection('Carrito').where("producto" ,"==" , product.nombre).get().then(data =>{
                    if(data.docs.length > 0){
                        let storage = firebase.storage();
                        let storageRef = storage.ref();
                        let spaceRef = storageRef.child(product.imagenNombre);
                        spaceRef.delete().then(async ()=> {
                            await db.firestore.collection('Carrito').doc(data.docs[0].id).delete()  
                            await db.firestore.collection('Productos').doc(product.id).delete()
                            setProductos(Productos.filter(dato => dato.id !== product.id ))
                        }).catch(function(error) {
                            console.log(error);
                        });
                    }else{
                        let storage = firebase.storage();
                        let storageRef = storage.ref();
                        let spaceRef = storageRef.child(product.imagenNombre);
                        spaceRef.delete().then(async ()=> {
                            await db.firestore.collection('Productos').doc(product.id).delete()
                            setProductos(Productos.filter(dato => dato.id !== product.id ))
                        }).catch(function(error) {
                            console.log(error);
                        });
                    }
                })



            } 
          })
    }


    return (
        <div>
            { cambioInterfaz?
                <div>
                    {Productos.length === 0 ?
                        <div className="alert alert-warning mt-3" >
                            No has Agregado Productos.
                        </div>
                    :
                        <div>
                            {Productos.map(data => 
                                <div className="shadow p-3 m-2 bg-white row" key={data.id} >
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
                                        <div className="d-flex justify-content-center mt-3" >
                                            <div className="shadow p-3 m-2 rounded-circle pointer bg-warning" onClick={()=> cambiarInterfaz(2 , false , data) }>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                </svg>
                                            </div>
                                            <div className="shadow p-3 m-2 rounded-circle pointer bg-danger" onClick={()=> eliminarProduct(data) } >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>    
                            )}
                        </div>
                    }
                    <div>
                        <div className="shadow p-3 m-2 pointer opacidad" onClick={()=> cambiarInterfaz(1 , false , {}) } >
                            <h2 className="text-center" > + </h2>
                        </div>
                    </div>
                </div>
            : 
                <div>
                    <div className="d-flex justify-content-start" >
                        <div className="shadow p-3 m-2 rounded-circle pointer" onClick={()=> cambiarInterfaz(0 , true , {}) }   >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    
                    { numeroInterfaz === 1? <AddProduct data={data} /> :null}
                    { numeroInterfaz === 2? <EditProduct product={Product} /> :null}
                </div>
            }
        </div>
    );
}
 
export default Product;