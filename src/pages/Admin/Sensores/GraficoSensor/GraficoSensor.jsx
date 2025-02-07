import React from 'react';

//LIBRERIA PARA GRAFICAS
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// REGISTRA LOS COMPONENTES NECESARIOS PARA LA GRAFICA
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  // DATOS DEL GRAFICO
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],  //EN QUE TIEMPOS LO QUEREMOS
    datasets: [
      {
        label: 'Calor',  // NOMBRE DE LA LINEA
        data: [12, 19, 3, 5, 2, 3],  // DATOS TRAIDOS DEL SENSOR
        borderColor: 'rgba(75, 192, 192, 1)',  //COLOR DE LA LINEA
        tension: 0.1,  // CURVATURA DE LINEA
      },
      {
        label: 'ph',  
        data: [20, 2, 3, 5, 2, 0.1], 
        borderColor: 'rgb(31, 194, 72)',  
        tension: 0.1,  
      }
    ],
  };

  // VISTAS DEL GRAFICO
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Gráfico de Líneas de Ventas',  // Título del gráfico
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,  // Iniciar el eje X en cero
      },
      y: {
        beginAtZero: true,  // Iniciar el eje Y en cero
      },
    },
  };

  return (
    <div>
      <h2>Gráfico de Línea en React</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
