import React from 'react'
import db from '../../Configuration/Firebase'
import Swal from 'sweetalert2'

const EditProduct = ({product}) => {
    console.log(product);

    const editarProducto = (e) => {
        e.preventDefault()
        let name = document.getElementById("nombre").value
        let precio = document.getElementById("precio").value
        let marca = document.getElementById("marca").value
        if(name !== "" && precio !== "" && marca !== ""){
            const datos = {
                nombre : name,
                precio : precio,
                marca : marca,
                imagen : product.imagen,
                usuarioId : product.usuarioId,
                usuarioNombre : product.usuarioNombre,
                ventas : product.ventas
            }
            console.log(datos);
            db.firestore.collection("Productos").doc(product.id)
            .update(datos)
            .then(res => {
                window.location.reload()
            })
        }else{
            Swal.fire({
                icon : 'warning',
                title : 'Campos Vacios',
                text : 'Recuerda llenar todos los campos del formulario y colocar una contraseña de 6 o más caracteres.'
            })
        }

    }

    return (
        <form className="m-1" onSubmit={editarProducto} >
            <div className="row mt-4">
                <div className=" col-md-6 w-100" >
                    <h6>Nombre del Producto</h6>
                    <input  type="text"   id="nombre"  defaultValue={product.nombre} className="form-control" />
                </div>
                <div className="w-100 col-md-6" >
                    <h6> Precio del Producto </h6>
                    <input   type="number" id="precio" defaultValue={product.precio} className="form-control" />
                </div>
            </div>
            <div className="row mt-4">
                <div className=" col-md-6 w-100" >
                    <h6> Marca del Producto</h6>
                    <input  type="text"  id="marca" defaultValue={product.marca} className="form-control" />
                </div>
            </div>

            <button className="btn btn-outline-warning m-2"> Actualizar Producto </button>
        </form>
    );
}
 
export default EditProduct;