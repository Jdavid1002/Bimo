import React,{useState} from 'react';
import { useFirebaseApp} from 'reactfire';
import 'firebase/auth';
import Swal from 'sweetalert2'

const Login = () => {
    const [Campos, setCampos] = useState({})
    const firebase = useFirebaseApp();

    const onChange = (e) => {
        setCampos({
            ...Campos,
            [e.target.name] : e.target.value.trim()
        })
    }
 
    const ValidarDatos = async (e) =>{
        e.preventDefault()
        if(Campos.pass !== "" && Campos.email !== "" && Campos.pass.length > 5){
            try {
                await firebase.auth().signInWithEmailAndPassword(Campos.email , Campos.pass).then(res => {
                    window.location.replace("/Bimo/#/Dashboard")
                })
            } catch (error) {
                if(error.message){
                    Swal.fire({
                        icon : 'error',
                        title : "Ocurrió un error",
                        text : "Tus credenciales son incorrectas o no estas registrado."
                    })
                }
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
        <div className="container" >
            <div className="row shadow-lg mt-5 login-containter rounded" >
                <div className="col-md-6" >
                    <img className="w-100" src="https://images.pexels.com/photos/2058131/pexels-photo-2058131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                </div>

                <div className="col-md-6 start-left" >
                    <div className="p-5 m-2" >
                        <h5 className="m-2 h2" > <strong> ¡Bienvenido! </strong> </h5>
                        <h5 className="m-2" > Nos da gusto tenerte de vuelta. </h5>
                        <hr className="line w-75 bg-dark m-2" />

                        <form className="mt-5" onSubmit={ValidarDatos} > 
                            <h6 className=" m-2" > Correo Electronico </h6>
                            <input  name="email" onChange={onChange} className="form-control input m-2" placeholder="Email" />
                            <h6 className=" m-2" > Contraseña </h6>
                            <input  name="pass"  onChange={onChange} className="form-control input m-2" placeholder="Password" type="password" />
                            <button className="btn btn-outline-dark m-2 shadow" > Entrar </button>
                        </form>
                        
                        <p className="text-muted mt-4" > ¿No tienes cuenta? Registrate <a href="/Bimo/#/Register" > aquí </a> </p>

                        <div className="mt-5" >
                            <hr />
                            <h6> <strong> ¿Lorem ipsum dolor sit amet.? </strong> </h6>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. In illo sequi odit cum quisquam reiciendis quibusdam itaque voluptates aliquid. Saepe! </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;