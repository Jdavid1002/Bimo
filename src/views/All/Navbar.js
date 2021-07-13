import React from 'react'
import {useUser} from 'reactfire';

const Navbar = () => {
    const User = useUser()
    const agregarInterfazUser = () => {
        if(User.hasEmitted === true){
            window.location.replace("/Bimo/#/Dashboard")
        }else{
            window.location.replace("/Bimo/#/Login")
        }
    }

    const agregarInterfazCarrito = () => {
        if(User.hasEmitted === true){
            window.location.replace("/Bimo/#/ShopppingCart")
        }else{
            window.location.replace("/Bimo/#/Login")
        }
    }

    return (
        <div className="mx-3" >
            <div className="row" >
                <div className="col-md-4" >
                    <h1 className="mt-3 text-monospace text-center pointer" onClick={()=> window.location.replace("/Bimo/#/")} > Bimo </h1>
                </div>
                <div className="col-md-4" >

                </div>
                <div className="col-md-4" >
                    <div className="d-flex justify-content-center mt-4" >
                        <div className="m-2 pointer" onClick={agregarInterfazUser} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                        </div>
                        <div className="m-2 pointer" onClick={agregarInterfazCarrito} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-fill" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z"/>
                            </svg>
                        </div>
                        <div className="m-2 pointer" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;