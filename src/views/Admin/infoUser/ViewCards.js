import React,{useState, useEffect} from 'react'
import AddCard from './AddCard';
import db from '../../../Configuration/Firebase';

const ViewCards = ({data}) => {

    const [datosTarjetas, setdatosTarjetas] = useState([])
    const [Validacion, setValidacion] = useState(true)

    const cargarTarjetas = () => {
        let arregloProductos = []
        db.firestore.collection("Tarjetas").where("id", "==" , data.id ).get()
        .then(data => {
            if(data.docs.length > 0){
                data.forEach((doc) => {
                    let datos = {
                        cardNumber : doc.data().cardNumber,
                        cvv : doc.data().cvv,
                        fecha : doc.data().fecha,                        
                        id : doc.id
                    }
                    arregloProductos.push(datos)
                })
                setdatosTarjetas(arregloProductos)
            }else{
                setdatosTarjetas([])
            }
        })
    }

    useEffect(() => {
        cargarTarjetas()

        // eslint-disable-next-line  
    }, [])


    const cambiarInterfaz = (estado) => {
        setValidacion(estado)
        document.getElementById("back-cards").classList.toggle("Eliminar")
    }

    return (
        <div>
            { Validacion ? 
                <div>
                    {datosTarjetas.length > 0 ? 
                        <div>
                            {datosTarjetas.map(data =>
                                <div key={data.id} className="shadow p-3 m-2 row"  >
                                    <div className="col-md-3">
                                        <div className="p-2 d-flex justify-content-center" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-credit-card-2-back-fill" viewBox="0 0 16 16">
                                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5H0V4zm11.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zM0 11v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1H0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-2" >
                                            <h6 className="text-center" > {data.cardNumber} </h6>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-2" >
                                            <h6 className="text-center" > {data.cvv} </h6>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-2" >
                                            <h6 className="text-center" > {data.fecha} </h6>
                                        </div>
                                    </div>
                                </div>    
                            )}
                        </div>
                    :
                        <div className="alert alert-warning" >
                            No tienes tarjetas agregadas.
                        </div>
                    }
                        <div className="shadow p-3 m-2 opacidad pointer" onClick={() => cambiarInterfaz(false) } >
                            <h2 className="text-center" > <strong> + </strong> </h2>
                        </div>
                </div>
            :
                <div>
                    <div className="d-flex justify-content-start" >
                        <div className="shadow p-3 m-2 pointer rounded-circle" onClick={()=> cambiarInterfaz(true) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    <AddCard data={data} />
                </div>
            }
        </div>
    );
}
 
export default ViewCards;