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
            <div className="row shadow-lg mt-5 login-containter rounded bg-dark" >
                <div className="col-md-6 start-right" >
                    <div className="p-5" >
                        <h2 className="text-white h1" > <strong> Organiza todos tus productos de manera óptima. </strong></h2>
                        <div className="d-flex justify-content-start" >
                            <div className="m-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-shield-fill-check" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"/>
                                </svg>
                            </div>
                            <h6 className="text-white m-2" > Cuenta con la mejor seguridad en tus cuentas y tus productos. </h6>
                        </div>
                        <div className="d-flex justify-content-start mt-2" >
                            <div className="m-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-archive-fill" viewBox="0 0 16 16">
                                    <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                                </svg>
                            </div>
                            <h6 className="text-white m-2" > Manten organizado tu inventario de manera óptima. </h6>
                        </div>
                        <div className="d-flex justify-content-start mt-2" >
                            <div className="m-2" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-white bi bi-columns-gap" viewBox="0 0 16 16">
                                    <path d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z"/>
                                </svg>
                            </div>
                            <h6 className="text-white m-2" > Agregar y edita tus bodegas, mantén organizados todos tus productos. </h6>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 start-left" >
                    <div className="p-5 m-2" >
                        <h5 className="m-2 h2 text-white" > ¡Bienvenido! </h5>
                        <h5 className="m-2 text-white" > Nos da gusto tenerte de vuelta. </h5>
                        <hr className="line w-75 bg-white m-2" />

                        <form className="mt-4" onSubmit={ValidarDatos} > 
                            <h6 className="text-white m-2" > Correo Electronico </h6>
                            <input  name="email" onChange={onChange} className="form-control input m-2" placeholder="Email" />
                            <h6 className="text-white m-2" > Contraseña </h6>
                            <input  name="pass"  onChange={onChange} className="form-control input m-2" placeholder="Password" type="password" />
                            <button className="btn btn-outline-light m-2" > Entrar </button>
                        </form>
                        
                        <p className="text-muted mt-4" > ¿No tienes cuenta? Registrate <a className="text-white" href="/Register" > aquí </a> </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;