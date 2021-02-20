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
  const [dateLength, useDateLength] = useState(0);
  const [values, useValues] = useState([]);
  const [chartLine, useChartLine] = useState(true);

  useEffect(() => {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05')
      .then(({ data }) => {
        useDateLength(Object.keys(data.bpi).length);
        useDates(Object.keys(data.bpi))
        useValues(Object.values(data.bpi))
      })
  }, [])

  useEffect(() => {
    if (start && end) {
      axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
      .then(({ data }) => {
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
    if (e.target.typeOfChart.value === 'Bar') {
      useChartLine(false);
    } else {
      useChartLine(true);
    }
  }

  const renderChart = () => {
    let currentDates = dates;
    if (dates.length !== dateLength) {
      currentDates = dates.slice(0, dateLength);
    }
    if (chartLine) {
      return <LineChart data={{
        labels: currentDates,
        datasets: [{
            label: 'Bitcoin Value',
            data: values,
            borderWidth: 1,
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
      } width="1300" height="250"/>
    } else {
      return <BarChart data={{
        labels: currentDates,
        datasets: [{
            label: 'Bitcoin Value',
            data: values,
            borderWidth: 1
        }]
      }} options={{
        scales: {
          xAxes: [{
            type: 'time',
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
      }
    }} width="1300" height="250"/>
    }
  }

  return (
    <>
      <Form handleSubmit={handleSubmit}/>
      <div className="chart">
        {renderChart()}
      </div>
      <form onSubmit={handleChart}>
        <label>Chart type:
          <select name="typeOfChart">
            <option value="Line">Line</option>
            <option value="Bar">Bar</option>
          </select>
          <input type="submit" value="update"/>
        </label>
      </form>
    </>
  )
}
export default App;