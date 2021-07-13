import React from 'react'

const Adress = () => {
    return (
        <div className="bg-white p-3 shadow rounded pointer opacidad" >
            <div className="d-flex justify-content-between" >
                <h4> Direcciones </h4>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="text-red-white bi bi-map" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z"/>
                    </svg>
                </div>
            </div>
            <div className="mt-3" >
                <h6> Bogotá, Colombia </h6>
                <p> Cra 10 a este número 76 sur 30 </p>
                <hr />
            </div>
            <div className="mt-3" >
                <h6> Bogotá, Colombia </h6>
                <p> Cra 10 a este número 76 sur 30 </p>
                <hr />
            </div>
        </div>
    );
}
 
export default Adress;