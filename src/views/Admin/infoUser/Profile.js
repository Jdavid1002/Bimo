import React,{useState} from 'react'
import EditUser from './EditUser';

const Profile = ({data}) => {

    const [Validacion, setValidacion] = useState(true)

    return (
        <div>
            { Validacion? 
                <div>
                    <h6 className="text-center" > Perfil </h6>
                    <div className="d-flex justify-content-center" >
                        <img  className="w-50 rounded-circle" src={data.url} alt={data.imagen} />
                    </div>
                    <h6 className="text-center mt-2" > <strong> {data.nombres}  </strong></h6>
                    <div className="d-flex justify-content-center" >
                        <div className="shadow p-3 m-2 rounded-circle pointer"  onClick={()=> setValidacion(false) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                        </div>
                    </div>
                    <hr />
                    <h5> Información personal. </h5>
                    <div className="row mt-4" >
                        <div className="col-md-7" >
                            <h6>Descripción personal.</h6>
                            <p className="text-red-white pointer" > {data.descripcion} </p>
                        </div>
                    </div>
                    <div className="row" >
                        <div className="col-md-7" >
                            <h6>Contactos.</h6>
                            <p className="text-red-white pointer" > {data.telefono}</p>
                        </div>
                    </div>
                </div>
            :
                <div>
                    <div className="d-flex justify-content-start" >
                        <div className="shadow p-3 m-2 pointer rounded-circle" onClick={()=> setValidacion(true) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    <EditUser data={data} />
                </div>
            }
        </div>
    );
}
 
export default Profile;