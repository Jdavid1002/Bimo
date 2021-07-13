import React,{useState} from 'react'
import Profile from './Profile';
import Cards from './Cards';
import Adress from './Adress';
import ViewCards from './ViewCards';
import ViewAdress from './ViewAdress';

const User = ({data}) => {
    const [Validacion, setValidacion] = useState(true)
    const [numeroInterfaz, setnumeroInterfaz] = useState(0)

    const cambiarInterfaz = (numero, estado) => {
        setValidacion(estado)
        setnumeroInterfaz(numero)
    }

    return (
        <div>
            {Validacion ? 
                <div>
                    <div className="row p-3" >
                        <div className="col-lg-8">
                            <div className="row" >
                                <div className="col-md-12" onClick={()=> cambiarInterfaz(1, false) } >
                                    <Cards data={data} />
                                </div>
                                <div className="col-md-6 mt-3" onClick={()=> cambiarInterfaz(2, false) } >
                                    <Adress data={data} />
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="p-3 m-2 bg-white" >
                                <Profile  data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            : 
                <div>
                    <div className="d-flex justify-content-start" >
                        <div className="shadow p-3 m-2 rounded-circle pointer" id="back-cards"  onClick={()=> cambiarInterfaz(0, true) } >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                        </div>
                    </div>
                    <div>
                        { numeroInterfaz === 1? <ViewCards data={data} /> : null}
                        { numeroInterfaz === 2? <ViewAdress data={data} /> : null}
                    </div>
                </div>
            }
        </div>
    );
}
 
export default User;