import React,{useState} from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import firebase from 'firebase';
import Swal from 'sweetalert2';
import db from '../../Configuration/Firebase';

const Register = () => {
    const [Campos, setCampos] = useState({})
    const fb = useFirebaseApp();

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value.trim()
        })
    }
 
    const ValidarDatos = async (e) =>{
        e.preventDefault()
        const IMG = document.getElementById("IMG").files[0]
        const {pass, pass2 , email , lastname , firstname , tel} = Campos

        if(pass !== "" && pass2 !== "" && email !== "" && pass.length > 5 && lastname !== "" && firstname !== ""  && tel !== ""){
            if(pass === pass2){
                const storage = firebase.storage().ref(`/IMG-USUARIOS/${IMG.name}`)
                const task = storage.put(IMG)
                task.on('state_changed' , ()=> {
    
                }, error =>{
                    console.log(error);
                }, () => {
                    task.snapshot.ref.getDownloadURL().then(async (dato) => {
                        try {
                            await fb.auth().createUserWithEmailAndPassword(email, pass).then(async (res)  => {
                                const Datos = {
                                    id : res.user.uid,
                                    nombres : `${Campos.firstname} ${Campos.lastname}`,
                                    imagen : `/IMG-USUARIOS/${IMG.name}`,
                                    descripcion : "",
                                    telefono : tel,
                                    url : dato
                                }
                                await db.firestore.collection("Usuarios").doc().set(Datos)
                                Swal.fire({
                                    icon : "success",
                                    title : "Te has Registrado Correctamente"
                                })
                                window.location.reload()
                            })   
                        } catch (error) {
                            Swal.fire({
                                icon : 'error',
                                title : "Ocurrió un error",
                                text : "Este usuario ya esta registrado."
                            })
                        }
                    })
                })

            }else{
                Swal.fire({
                    icon : 'warning',
                    title : 'Contraseñas invalidas',
                    text : 'Las contraseñas no son iguales.'
                })
            }

        }else{
            Swal.fire({
                icon : 'warning',
                title : 'Campos Vacios',
                text : 'Recuerda llenar todos los campos del formulario y colocar una contraseña de 6 o más caracteres.'
            })
        }
    }


    return (
        <div className="container mb-5" >
            <div className="row shadow-lg mt-3 rounded" >
                <div className="col-md-5 register-img start-right" >
                    
                </div>
                <div className="col-md-7 bg-dark start-left" >
                    <div className="p-5 m-2" >
                        <h5 className="m-2 h2 text-white" > ¡Bienvenido a la familia! </h5>
                        <h5 className="m-2 text-white" > Esperamos que te quedes en nuestra plataforma. </h5>
                        <hr className="line w-75 bg-white m-2" />

                        <form className="mt-4" onSubmit={ValidarDatos} > 
                            <div className="d-flex justify-content-between" >
                                <div className="m-2 w-100" >
                                    <h6 className="text-white m-2" > Nombres </h6>
                                    <input  name="firstname" onChange={onChange} className="form-control input m-2" placeholder="Juan" />
                                </div>
                                <div className="m-2 w-100" >
                                    <h6 className="text-white m-2" > Apellidos </h6>
                                    <input  name="lastname" onChange={onChange} className="form-control input m-2" placeholder="Ramirez" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-between" >
                                <div className="m-2 w-100" >
                                    <h6 className="text-white m-2" > Contacto </h6>
                                    <input name="tel" onChange={onChange} className="form-control input m-2" placeholder="320..." />
                                </div>
                                <div className="m-2 w-100" >
                                    <h6 className="text-white m-2" > Imagen de Perfil </h6>
                                    <input type="file" id="IMG" className="form-control input m-2"/>
                                </div>
                            </div>
                            <div className="m-2" >
                                <h6 className="text-white m-2" > Correo Electronico </h6>
                                <input  name="email" onChange={onChange} className="form-control input m-2" placeholder="Email" />
                            </div>

                            <div className="d-flex justify-content-between" >
                                <div className="m-2 w-100" >
                                    <h6 className="text-white m-2" > Contraseña </h6>
                                    <input  name="pass"  onChange={onChange} className="form-control input m-2" placeholder="Password" type="password" />
                                </div>
                                <div className="m-2 w-100" >
                                    <h6 className="text-white m-2" > Valida tú contraseña </h6>
                                    <input  name="pass2"  onChange={onChange} className="form-control input m-2" placeholder="Password" type="password" />
                                </div>
                            </div>
                            <button className="btn btn-outline-light m-2" > Entrar </button>

                        </form>
                        <p className="text-muted mt-4" > ¿Ya tienes cuenta? Entra <a className="text-white" href="/Login" > aquí </a> </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Register;