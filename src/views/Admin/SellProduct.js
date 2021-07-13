import React,{useEffect ,useState} from 'react'
import db from '../../Configuration/Firebase'

const SellProduct = ({data}) => {

    const [Compradores, setCompradores] = useState([])

    const cargarCompradores = () => {
        let arregloCompradores = []

        data.ventas.forEach(async (element) => {
            await db.firestore.collection("Usuarios").where("id", "==" , element.comprador ).get()
            .then(data => {
                if(data.docs.length > 0){
                    data.forEach((doc) => {
                        arregloCompradores.push(doc.data())
                    })
                    setCompradores(arregloCompradores)
                }else{
                    setCompradores([])
                }
            }) 
        });
    }

    useEffect(() => {
        cargarCompradores()
        // eslint-disable-next-line  
    }, [])



    return (
        <div>
            {Compradores.length > 0 ? 
                <div>
                    <h4 className="text-center m-4" > Lista de compradores </h4>
                    {Compradores.map(dato => 
                        <div className="shadow p-3 m-2 row" key={dato.id} >
                            <div className="col-md-2 d-flex justify-content-center" >
                                <img className="img-product-list" src={dato.url} alt={dato.descripcion} />
                            </div>
                            <div className="col-md-3" >
                                <p className="text-time" >Nombre </p>
                                <h6> {dato.nombres} </h6>
                            </div>
                            <div className="col-md-2" >
                                <p className="text-time"> Telefono </p>
                                <h6> {dato.telefono} </h6>
                            </div>
                            <div className="col-md-2" >
                                <p className="text-time"> Precio </p>
                                <h6> {data.precio} </h6>
                            </div>
                        </div>
                    )}
                </div>
            : 
                <div className="alert alert-warning p-3 m-2" >
                    No tienes compras actualmente
                </div> 
            }
        </div>
    );
}
 
export default SellProduct;