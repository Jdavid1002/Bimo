import React,{useState} from 'react'

const Carrusel = () => {

    const imagenes = [
        {
            img : "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            id : 1,
            alt : "Man Standing on Street"
        },{
            img : "https://images.pexels.com/photos/206434/pexels-photo-206434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            id : 2,
            alt : "Woman Standing Surrounded by Tress"
        },{
            img : "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            id : 3,
            alt : "Woman Holding Shopping Bag"
        },{
            img : "https://images.pexels.com/photos/3781538/pexels-photo-3781538.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            id : 4,
            alt : "Woman Holding Shopping Bag"
        }
    ]

    const [imagenCarrusel, setimagenCarrusel] = useState(imagenes[0])
    const [contador, setcontador] = useState(0)

    const cambiarImagen = (num) => {
        if(num === 1 ){
            if(contador > 0){
                setimagenCarrusel(imagenes[contador -1])
                setcontador(contador -1)
            }else{
                setimagenCarrusel(imagenes[imagenes.length -1])
                setcontador(imagenes.length-1)
            }
        }else if(num === 2){
            if(contador < imagenes.length -1){
                setimagenCarrusel(imagenes[contador + 1])
                setcontador(contador +1)
            }else{
                setimagenCarrusel(imagenes[0])
                setcontador(0)
            }
        }
    }

    return (
        <div className="m-3" >
            <div className="d-flex justify-content-between">
                <div className="col-md-1 d-flex align-items-center justify-content-start">
                    <div className="p-3 shadow rounded-circle m-2 pointer" onClick={()=> cambiarImagen(1) } >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </div>
                </div>

                <div>
                    <img className="img-banner" id={imagenCarrusel.id} src={imagenCarrusel.img} alt={imagenCarrusel.alt} />
                </div>

                <div className="col-md-1 d-flex align-items-center justify-content-end">
                    <div className="p-3 shadow rounded-circle m-2 pointer" onClick={()=> cambiarImagen(2) } >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Carrusel;