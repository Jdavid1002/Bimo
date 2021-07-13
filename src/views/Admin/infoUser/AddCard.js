import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import db from '../../../Configuration/Firebase';
import Swal from 'sweetalert2';

const AddCard = ({data}) => {

    const [Campos, setCampos] = useState({
        cardNumber : "",
        nombre : "",
        fecha : "",
        ccv : ""
    })

    const onChange = (e) => {
        setCampos({
            ...Campos , 
            [e.target.name] : e.target.value
        })
    }

    const agregarTarjeta =  async (e) => {
        e.preventDefault()

        const {cardNumber , nombre, fecha, cvv} = Campos

        if(cardNumber !== "" && nombre !== "" && fecha !== "" && cvv !== ""){
            if(cardNumber.length === 16 && fecha.length === 5 && cvv.length === 3 ){
                const card = {
                    id : data.id,
                    cardNumber : cardNumber,
                    fecha : fecha , 
                    cvv : cvv
                }
                await db.firestore.collection("Tarjetas").doc().set(card)
                Swal.fire({
                    icon : "success",
                    title : "Tarjeta agregada.",
                    text : "Ya puedes usar tu tarjeta en las compras."
                })
            }else{
                Swal.fire({
                    icon : "warning",
                    title : "Datos invalidos",
                    text : "Recuerda llenar de manera correcta todos los campos"
                })
            }
        }else{
            Swal.fire({
                icon : "warning",
                title : "Campos Vacíos",
                text : "Recuerda llenar todos los campos."
            })
        }
    }

    return (
        <div className="p-4 row" >
            <div className="col-md-7">
                <div className="p-3 m-2" >
                    <div className="shadow-lg p-3 m-3 rounded bg-red-white" >
                        <div className="d-flex justify-content-end" >
                            { Campos.cardNumber.substr(0,1) === "4"  ? <h3 className="text-white h2" > Visa </h3> : null }
                            { Campos.cardNumber.substr(0,1) === "5"  ? <h3 className="text-white h2" > Master Card </h3> : null }
                        </div>
                        <div className="d-flex justify-content-start pl-3 pt-2" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="card-icon bi bi-credit-card-fill" viewBox="0 0 16 16">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z"/>
                            </svg>
                        </div>
                        <div className="p-3" >
                            <h4 className="text-white" > {Campos.cardNumber.substr(0,4)} - {Campos.cardNumber.substr(4,4)} - {Campos.cardNumber.substr(8,4)} - {Campos.cardNumber.substr(12,4)} </h4>
                        </div>
                        <div className="d-flex justify-content-between" >
                            <h5 className="text-white p-3" > {Campos.nombre} </h5>
                            <h5 className="text-white p-3" > {Campos.fecha} </h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-5">
                <div className="p-3 m-2" >
                    <h5> Detalles de la Tarjeta </h5>
                    <form onSubmit={agregarTarjeta} >
                        <TextField name="nombre" onChange={onChange}  type="text" label="Titular de la Cuenta" className="w-100 m-2" />
                        <TextField name="cardNumber" onChange={onChange}  type="number" label="Tarjeta" className="w-100 m-2" />
                        <div className="d-flex justify-content-center" >
                            <TextField name="fecha" onChange={onChange}  type="text" label="Fecha de Expedición" className="m-2 w-100" />
                            <TextField name="cvv" onChange={onChange} type="number" label="CVV" className="m-2 w-100" />
                        </div>
                        <Button  className="w-100" variant="contained"  color="secondary" type="submit" >
                            Agregar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default AddCard;