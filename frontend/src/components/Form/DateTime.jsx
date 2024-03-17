import React, { useState, useEffect } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

function DateTime(props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

 

  const handleDateChangeStart = (event) => {
    const startDateValue = event.target.value;
    setStartDate(startDateValue);
    props.startdate(startDateValue);
  };

  const handleDateChangeEnd = (event) => {
    const endDateValue = event.target.value;
    setEndDate(endDateValue);
    props.enddate(endDateValue);
  };

  const minDate = dayjs();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <div className="time" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="start">
            <label htmlFor="startDate">Start Time</label>
            <br />
            <input type="datetime-local" id="startDate" onChange={handleDateChangeStart} name="startDate" value={startDate} min={minDate.format('YYYY-MM-DDTHH:mm')} />
          </div>
          <div className="end">
            <label htmlFor="endDate">End Time</label>
            <br />
            <input type="datetime-local" id="endDate" onChange={handleDateChangeEnd} name="endDate" value={endDate} min={startDate} />
          </div>
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateTime;
