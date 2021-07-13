import React,{useState, useEffect} from 'react'
import db from '../../../Configuration/Firebase'
import AddAdress from './AddAdress'

const ViewAdress = ({data}) => {

    const [Direcciones, setDirecciones] = useState([])
    const [Validacion, setValidacion] = useState(true)

    const cargarDirecciones = () => {
        let arregloDirecciones = []
        db.firestore.collection("Direccion").where("id", "==" , data.id ).get()
        .then(data => {
            if(data.docs.length > 0){
                data.forEach((doc) => {
                    let datos = {
                        ciudad : doc.data().ciudad,
                        pais : doc.data().pais,
                        direccion : doc.data().direccion,                        
                        id : doc.id
                    }
                    arregloDirecciones.push(datos)
                })
                setDirecciones(arregloDirecciones)
            }else{
                setDirecciones([])
            }
        })
    }

    useEffect(() => {
        cargarDirecciones()
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
                    {Direcciones.length > 0 ? 
                        <div>
                            {Direcciones.map(data =>
                                <div key={data.id} className="shadow p-3 m-2 row"  >
                                    <div className="col-md-2">
                                        <div className="p-2 d-flex justify-content-center" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-signpost-split-fill" viewBox="0 0 16 16">
                                                <path d="M7 16h2V6h5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.8 2.4A1 1 0 0 0 14 2H9v-.586a1 1 0 0 0-2 0V7H2a1 1 0 0 0-.8.4L.225 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4h5v5z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-2" >
                                            <h6 className="text-center" > {data.pais} </h6>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="p-2" >
                                            <h6 className="text-center" > {data.ciudad} </h6>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-2" >
                                            <h6 className="text-center" > {data.direccion} </h6>
                                        </div>
                                    </div>
                                </div>    
                            )}
                        </div>
                    :
                        <div className="alert alert-warning m-2" >
                            No tienes direcciones agregadas.
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
                    <AddAdress data={data} />
                </div>
            }
        </div>
    );
}
 
export default ViewAdress;