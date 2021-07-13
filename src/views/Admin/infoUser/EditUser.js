import React from 'react'
import Swal from 'sweetalert2'
import db from '../../../Configuration/Firebase'
import firebase from 'firebase';

const EditUser = ({data}) => {

    const editarUsuario = (e) => {
        e.preventDefault()
        const nombres = document.getElementById("nombres").value
        const telefono = document.getElementById("telefono").value
        const descripcion = document.getElementById("descri").value
        const IMG = document.getElementById("IMG").files

        if(nombres !== "" && telefono !== "" && IMG.length > 0 ){
            const storage = firebase.storage().ref(`/IMG-PRODUCTOS/${IMG[0].name}`)
            const task = storage.put(IMG[0])
            task.on('state_changed' , ()=> {

            }, error =>{
                console.log(error);
            }, () => {
                task.snapshot.ref.getDownloadURL().then(async (dato) => {
                    const usuario = {
                        nombres : nombres,
                        id : data.id,
                        descripcion : descripcion ,
                        imagen :`/IMG-PRODUCTOS/${IMG[0].name}` ,
                        url: dato,
                        telefono : telefono,
                    }
                    db.firestore.collection('Usuarios').where("id" ,"==" , data.id).get().then(res =>{
                        const id = res.docs[0].id
                        db.firestore.collection("Usuarios").doc(id)
                        .update(usuario)
                        .then(res => {
                            console.log(res);
                            Swal.fire({
                                icon : "success",
                                title : "Usuario editado correctamente"
                            })
                        })
                    })

                })
            })
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacíos",
                text : "Recuerda llenar todos los campos."
            })
        }
    }

    return (
        <div>
            <form onSubmit={editarUsuario} >
                <h6 className="m-2" > Nombres </h6>
                <input id="nombres" className="form-control m-2" defaultValue={data.nombres}  type="text" />
                <h6 className="m-2" > Telefono </h6>
                <input id="telefono" className="form-control m-2" defaultValue={data.telefono}  type="number" />
                <h6 className="m-2" > Foto de perfil </h6>
                <input id="IMG" className="form-control m-2" type="file" />
                <h6 className="m-2" > Descripción </h6>
                <input id="descri" type="text" className="form-control m-2" defaultValue={data.descripcion}  />
                <button className="btn btn-outline-dark m-2" > Editar  </button>
            </form>
        </div>
    );
}
 
export default EditUser;