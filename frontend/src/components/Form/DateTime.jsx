import { useState, useEffect } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

function DateTime(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    props.date({
      start: startDate,
      end: endDate
    });
  }, [startDate, endDate]);

  const handleDateChangeStart = (event) => {
    const startDateValue = event.target.value;
    setStartDate(startDateValue);
    console.log(startDateValue)
  };

  const handleDateChangeEnd = (event) => {
    const endDateValue = event.target.value;
    setEndDate(endDateValue);
    console.log(endDateValue)
  };

  const minDate = dayjs();

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        {/* <DateTimePicker label="Set Start Time" value={startDate}
          onChange={handleDateChangeStart} minDate={minDate} /> */}
        <div className="time" style={{ display: 'flex', justifyContent: 'space-between' }}>

          <div className="start">
            <label htmlFor="">Start Time</label>
            <br />
            <input type="datetime-local" id="startDate" onChange={handleDateChangeStart} name="startDate" value={startDate} min={minDate} />
          </div>
          <div className="end">
            <label htmlFor="">End Time</label>
            <br />
            <input type="datetime-local" id="startDate" onChange={handleDateChangeEnd} name="endDate" value={endDate} min={startDate} />
          </div>
        </div>
        {/* <DateTimePicker label="Set End Time" value={endDate}
          onChange={handleDateChangeEnd} minDate={startDate} /> */}
      </DemoContainer>
    </LocalizationProvider>

  );
}

export default DateTime;
