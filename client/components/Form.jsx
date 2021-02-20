import React from 'react';

const Form = ({ handleSubmit }) => {
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

export default Form;