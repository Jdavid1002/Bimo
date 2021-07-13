import React,{useState} from 'react';
import db from '../../../Configuration/Firebase';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import address from '../../../img/address.jpg'

const AddAdress = ({data}) => {

    const [Campos, setCampos] = useState({
        ciudad : "",
        pais : "",
        direccion : "",
    })

    const onChange = (e) => {
        setCampos({
            ...Campos , 
            [e.target.name] : e.target.value
        })
    }

    const agregarDireccion =  async (e) => {
        e.preventDefault()

        const {ciudad, pais, direccion} = Campos

        if(direccion !== "" && pais !== "" && ciudad !== ""){
            const adress = {
                id : data.id,
                ciudad : ciudad,
                pais : pais , 
                direccion : direccion
            }
            await db.firestore.collection("Direccion").doc().set(adress)
            Swal.fire({
                icon : "success",
                title : "Direccion agregada.",
                text : "Ya puedes usar tu dirección en las compras."
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
        <div className="p-4 row" >
            <div className="col-md-7">
                <div className="p-3 m-2" >
                    <img className="w-100" src={address} alt="Dirreciones" />
                </div>
            </div>
            <div className="col-md-5">
                <div className="p-3 m-2" >
                    <h5> Detalles de la Dirección </h5>
                    <form onSubmit={agregarDireccion} >
                        <TextField name="pais" onChange={onChange}  type="text" label="País" className="w-100 m-2" />
                        <TextField name="ciudad" onChange={onChange}  type="text" label="Ciudad" className="w-100 m-2" />
                        <TextField name="direccion" onChange={onChange}  type="text" label="Dirección" className="w-100 m-2" />

                        <Button  className="w-100 m-2" variant="contained"  color="secondary" type="submit" >
                            Agregar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default AddAdress;