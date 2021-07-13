import React,{useState, useEffect} from 'react'
import db from '../../Configuration/Firebase'
import Swal from 'sweetalert2'

const DetailsPurchase = ({Productos, Total, User}) => {

    const [Direcciones, setDirecciones] = useState([])
    const [Tarjetas, setTarjetas] = useState([])


    const cargarDirecciones = async  () => {
        let arregloDirecciones = []
        await db.firestore.collection("Direccion").where("id", "==" , User.data.uid ).get().then(data => {
            if(data.docs.length > 0){
                data.forEach((doc) => {
                    let datos = {
                        ciudad : doc.data().ciudad,
                        direccion : doc.data().direccion,
                        pais : doc.data().pais,                        
                        id : doc.id,
                    }
                    arregloDirecciones.push(datos)
                })
                setDirecciones(arregloDirecciones)
            }else{
                setDirecciones([])
            }
        })
    }

    const cargarTarjetas = async  () => {
        let arregloTarjetas = []
        await db.firestore.collection("Tarjetas").where("id", "==" , User.data.uid ).get().then(data => {
            if(data.docs.length > 0){
                data.forEach((doc) => {
                    let datos = {
                        cardNumber : doc.data().cardNumber,
                        cvv : doc.data().cvv,
                        fecha : doc.data().fecha,                        
                        id : doc.id
                    }
                    arregloTarjetas.push(datos)
                })
                setTarjetas(arregloTarjetas)
            }else{
                setTarjetas([])
            }
        })
    }

    useEffect(() => {
        cargarDirecciones()
        cargarTarjetas()
        // eslint-disable-next-line  
    }, [])



    const Comprar = () => {
        if(Productos.length > 0){
            let arregloPrecios = []
            Productos.forEach(data => {
                const input = parseInt(document.getElementById(data.nombre).value)
                const adress = document.getElementById("adress").value
                const card = document.getElementById("card-debit").value

                if(input === "" || isNaN(input) || adress === "Entrega" || input < 1 || card === "Tarjeta"){ 
                    Swal.fire({
                        icon : "error",
                        title : "Cantidades Incorrectas o Ubicación incorrecta",
                        text : "Verifica que el campo de cantidad sea mayor a 0. Verifica la dirección de entrega."
                    })
                }else{  
                    arregloPrecios.push(input)
                }
            })

            if(arregloPrecios.length >0){
                Productos.forEach(dato => {
                    arregloPrecios.map( async (cantidad) => {
                        const nombre = dato.nombre
                        db.firestore.collection("Productos").where("nombre", "==" , nombre ).get().then(data => {
                            if(data.docs.length > 0){
                                data.forEach(async  (doc) => {
                                    // Manera de agregar las nuevas ventas al producto 
                                    const ventas = doc.data().ventas
                                    let idVentas = []
                                    for(let i = 0; i < cantidad ;i++){
                                        const datosCompra = {
                                            comprador : User.data.uid,
                                            precio : Number(dato.precio),
                                        }
                                        idVentas.push(datosCompra)
                                    }
                                    const nuevasVentas = ventas.concat(idVentas)

                                    // Actualizar los datos del producto con las nuevas ventas 
                                    const datos = {
                                        nombre : doc.data().nombre,
                                        precio : doc.data().precio,
                                        marca : doc.data().marca,
                                        imagen : doc.data().imagen,
                                        usuarioId : doc.data().usuarioId,
                                        usuarioNombre : doc.data().usuarioNombre,
                                        ventas : nuevasVentas
                                    }
                                    await db.firestore.collection('Carrito').where("usuario" ,"==" ,User.data.uid ).get().then(res => {
                                        res.forEach(async (doc)=> {
                                            await db.firestore.collection('Carrito').doc(doc.id).delete()
                                        })
                                    })
                                    await db.firestore.collection("Productos").doc(doc.id).update(datos)
                                    Swal.fire({
                                        icon : "success",
                                        title : "Compras registradas correctamente",
                                        text : "Se registró correctamente tu compra."
                                    })
                                    window.location.replace("/")
                                })
                            }else{
                                Swal.fire({
                                    icon : "error",
                                    title : "Error en el servidor"
                                })
                            }
                        })
                    })
                })
            }
        }else{
            Swal.fire({
                icon :"warning",
                title : "No tienes productos agregados",
                text : "Recuerda agregar productos para proceder con la compra."
            })
        }
    }

    return (
        <div className="p-4 h-100 ">
            <h4> Resumen de pedido </h4>
            <hr/>
            <div className="d-flex justify-content-between" >
                <h5> Items {Productos.length} </h5>
                <h5> { Productos.length > 0 ? Total.reduce((a, b) => a + b, 0) : 0 } </h5>
            </div>
            <div className="mt-3" >
                <h6> Ubicación </h6>
                <select className="form-control" id="adress"  >
                    <option className="form-control" value={null} > Entrega </option>
                    {Direcciones.map(data =>
                        <option className="form-control" key={data.id} value={data.id}> {data.direccion} </option>
                    )}
                </select>
            </div>

            <div className="mt-3" >
                <h6> Medio de Pago </h6>
                <select className="form-control" id="card-debit"  >
                    <option className="form-control" value={null} > Tarjeta </option>
                    {Tarjetas.map(data =>
                        <option className="form-control" key={data.id} value={data.id}> **** **** **** {data.cardNumber.substr(12,4)} </option>
                    )}
                </select>
            </div>

            <div className="d-flex align-items-end mt-5" >
                <button className="btn btn-danger w-100" onClick={Comprar} > Comprar </button>
            </div>
        </div>
    );
}
 
export default DetailsPurchase;