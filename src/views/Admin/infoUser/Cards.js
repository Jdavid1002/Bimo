import React from 'react'

const Cards = () => {

    return (
        <div className="p-5 bg-red-white rounded shadow pointer opacidad" >
            <div className="d-flex justify-content-between" >
                <div className="p-4" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="card-icon bi bi-credit-card-fill" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z"/>
                    </svg>
                </div>
                <div className="p-4" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="master-circle-one bi bi-circle-fill" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="master-circle-two bi bi-circle-fill" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8"/>
                    </svg>
                </div>
            </div>
            <h5 className="ml-4 h1 text-white" > °°°° °°°° °°°° °°°° </h5>
            <div className="row ml-3" >
                <div className="col-md-3 box-card p-3 m-2" ></div>
                <div className="col-md-1 box-card p-3 m-2" ></div>
            </div>
        </div>
    );
}
 
export default Cards;