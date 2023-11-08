import React, { useEffect, useState } from 'react'
// import Chart from "react-chartjs-2"

import Chart from "chart.js/auto";
import { usersApi } from '../../../axiosApi/axiosInstance';
const Home = () => {
    const chartRef = React.createRef();
    const [chartData, setChartData] = useState([]);


    useEffect(()=>{
      const fetchApplications = async()=>{
        const res = await usersApi.get("admin/countApplication")
        if(res.status===200){
          console.log(res.data.result);
          const data = res.data.result.map(item => ({
            month: item._id.month,
            totalApplications: item.totalApplications
        }));
        setChartData(data);

        }else{
          console.error(res.data.error)
        }
      }
      fetchApplications()
    },[])


    const labels = chartData.map(item => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[item.month - 1];
    });

    const data = chartData.map(item => item.totalApplications);

    
    const transformedData = {
      labels:  labels,
      datasets: [
        {
          label: "Applications",
          data:data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
          y: {
              beginAtZero: true,
          },
      },
  };

  useEffect(() => {
      const ctx = chartRef.current.getContext("2d");
      let myChart = new Chart(ctx, {
          type: "bar",
          data: transformedData,
          options: options,
      });

      return () => {
          if (myChart) {
              myChart.destroy();
          }
      };
  }, [data]);


  return (
    <div>
        <div>
            <h5 style={{
                padding:"8px",
                color:"white"
            }}>Total Applications</h5>
        </div>
       <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "right",
          marginLeft: "150px",
          height: "500px",
          width: "1000px",border:"1px solid white",
          marginTop:"15px"
        }}
      >
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}

export default Home
