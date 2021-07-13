import React,{useState} from 'react'
import firebase from 'firebase';
import Swal from 'sweetalert2';
import db from '../../Configuration/Firebase';


const AddProduct = ({data}) => {
    const [Campos, setCampos] = useState({nombre : "", precio : "", marca : "" })

    // PARA SUBIR PRODUCTOS

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value
        })
    }

    const subirProducto = (e) => {
        e.preventDefault()
        const {nombre, precio , marca } = Campos
        const IMG = document.getElementById("IMG").files[0]
        if(nombre !== "" && precio !== "" && marca !== ""){
            const storage = firebase.storage().ref(`/IMG-PRODUCTOS/${IMG.name}`)
            const task = storage.put(IMG)
            task.on('state_changed' , ()=> {

            }, error =>{
                console.log(error);
            }, () => {
                task.snapshot.ref.getDownloadURL().then(async (dato) => {
                    console.log(dato);
                    const producto = {
                        nombre : nombre,
                        precio : precio ,
                        marca : marca,
                        imagen : dato,
                        usuarioId : data.id,
                        usuarioNombre : data.nombres,
                        imagenNombre : `/IMG-PRODUCTOS/${IMG.name}`,
                        ventas : []
                    }
                    await db.firestore.collection("Productos").doc().set(producto)
                    Swal.fire({
                        icon : "success",
                        title : "Producto subido correctamente"
                    })
                    window.location.reload()
                })
            })
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacios",
                text : "Recuerda llenar todos los campos"
            })
        }
    }

    return (
        <form className="m-1" onSubmit={subirProducto} >
            <div className="row mt-4">
                <div className=" col-md-6 w-100" >
                    <h6>Nombre del Producto</h6>
                    <input onChange={onChange} type="text"   name="nombre" placeholder="Camisa cuello redondo azul" className="form-control" />
                </div>
                <div className="w-100 col-md-6" >
                    <h6> Precio del Producto </h6>
                    <input onChange={onChange}  type="number" name="precio" placeholder="32000" className="form-control" />
                </div>
            </div>
            <div className="row mt-4">
                <div className=" col-md-6 w-100" >
                    <h6> Marca del Producto</h6>
                    <input onChange={onChange}  type="text"   name="marca" placeholder="Balenciaga" className="form-control" />
                </div>
                <div className="w-100 col-md-6" >
                    <h6> Imagen del Producto </h6>
                    <input onChange={onChange}  className="form-control" type="file" id="IMG" />
                </div>
            </div>

            <button className="btn btn-outline-warning m-2"> Agregar Producto </button>
        </form>
    );
}
 
export default AddProduct;