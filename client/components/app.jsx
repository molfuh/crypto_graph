import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form.jsx';
var LineChart = require("react-chartjs").Line;
var BarChart = require("react-chartjs").Bar;

const App = () => {

  const [start, useStartDate] = useState(null);
  const [end, useEndDate] = useState(null);
  const [cryptoData, useCryptoData] = useState([]);
  const [dates, useDates] = useState([]);
  const [values, useValues] = useState([]);
  const [chartLine, useChartLine] = useState(true);

  useEffect(() => {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json`)
      .then(({ data }) => {
        useDates(Object.keys(data.bpi))
        useValues(Object.values(data.bpi))
      })
  })

  useEffect(() => {
    console.log(start, end)
    if (start && end) {
      axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
      .then(({ data }) => {
        console.log(data)
        // console.log(Object.keys(data.bpi))
        // console.log(Object.values(data.bpi))
        useDates(Object.keys(data.bpi))
        useValues(Object.values(data.bpi))
      })
    }
  }, [start, end])

  const handleSubmit = (e) => {
    e.preventDefault();
    useStartDate(e.target.startDate.value);
    useEndDate(e.target.endDate.value);
  }

  const handleChart = (e) => {
    e.preventDefault();
    console.log(e.target.value)
  }

  const renderChart = () => {
    console.log(chartLine)
    if (chartLine) {
      return <LineChart data={{
        labels: dates,
        datasets: [{
            label: 'Bitcoin Value',
            data: values,
            borderWidth: 1
        }]
      }} options={{
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          }
        }
      } width="600" height="250"/>
    } else {
      return <BarChart data={{
        labels: dates,
        datasets: [{
            label: 'Bitcoin Value',
            data: values,
            borderWidth: 1
        }]
      }} options={{
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
          }
        }
      } width="600" height="250"/>
    }
  }

  return (
    <>
      <Form handleSubmit={handleSubmit}/>
      <div className="chart">
        {renderChart}
      </div>
      <form onSubmit={handleChart}>
        <label>Chart type:
          <select>
            <option value="Line">Line</option>
            <option value="Bar">Bar</option>
          </select>
          {/* <select>
            <option value="Second">Second</option>
            <option value="Minute">Minute</option>
            <option value="Hour">Hour</option>
            <option value="Day">Day</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select> */}
          <input type="submit" value="update"/>
        </label>
      </form>
    </>
  )
}
export default App;