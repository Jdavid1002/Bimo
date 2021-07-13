import React, {useState, useEffect} from 'react'
import db from '../../Configuration/Firebase';
import { Bar } from 'react-chartjs-2';


const Chart = ({data}) => {

    const [Productos, setProductos] = useState([])
    const [Ventas, setVentas] = useState([])

    const cargarVentas = () => {
        let arregloProductos = []
        let arregloVentas = []
        db.firestore.collection("Productos").where("usuarioId", "==" , data.id ).get()
        .then(data => {
            if(data.docs.length > 0){
                data.forEach((doc) => {
                    arregloProductos.push(doc.data().nombre)
                    arregloVentas.push(doc.data().ventas.length)
                })
                setVentas(arregloVentas)
                setProductos(arregloProductos)
            }else{
                setProductos([])
            }
        })
    }

    useEffect(() => {
        cargarVentas()
        // eslint-disable-next-line  
    }, [])



    const datos = {
    labels: Productos,
    datasets: [
        {
        label: 'Ventas Totales',
        data: Ventas,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        },
    ],
    };

    const options = {
    scales: {
        yAxes: [
        {
            ticks: {
            beginAtZero: true,
            },
        },
        ],
    },
    };
    return (
        <div  className="p-4" >
            <Bar data={datos} options={options} />
        </div>
    );
}
 
export default Chart;