import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {

  const [start, useStartDate] = useState(null);
  const [end, useEndDate] = useState(null);

  useEffect(() => {
    console.log(start, end)
    if (start && end) {
      axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
      .then((data) => {
        console.log(data)
      })
    }
  }, [start, end])

  const handleSubmit = (e) => {
    e.preventDefault();
    useStartDate(e.target.startDate.value);
    useEndDate(e.target.endDate.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Start date:</label>
      <input type="date" id="startDate" />
      <label>End date:</label>
      <input type="date" id="endDate" />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default App;