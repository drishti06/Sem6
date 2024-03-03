import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTime from "../Form/DateTime";
import Sidebar from "../Sidebar";
// import { Email } from "@mui/icons-material";
import Email from "./Email";
import Swal from 'sweetalert2'

function FormItem() {
  const [percent, setPercent] = useState(0);
  const [total, setTotal] = useState(0);
  const [tempName, setTempName] = useState([]);
  const [totTemp, setTotTemp] = useState([]);
  const [totQues, setTotQues] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [marksPerQuestion, setMarksPerQuestion] = useState(0);
  const [error, setError] = useState('')
  const [selectedQuestions, setSelectedQuestions] = useState(0); // Newly added state for selected number of questions
  const [email, setemail] = useState([])
  const [date, setdate] = useState()
  const baseURL = 'http://localhost:8080';
  useEffect(() => {
    const totalMarks = selectedQuestions * marksPerQuestion;
    setTotal(totalMarks);
  }, [totQues,marksPerQuestion])

  const tempApi = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/templates`);
      setTempName(response.data.map((template) => template.temp_name));
      setTotTemp(response.data.length);
      setTotQues(0); // Reset totQues initially
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    tempApi();
  }, []);

  const handleTemplateChange = async (selectedTemplate) => {
    try {
      const response = await axios.get(`${baseURL}/api/template/${selectedTemplate}`);
      const templateData = response.data;
      if (templateData) {
        setTotQues(templateData);
        setSelectedQuestions(0);
      } else {
        setTotQues(0);
      }
      setSelectedTemplate(selectedTemplate);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleQuestionChange = (e) => {
    const selected = parseInt(e.target.value);
    if (selected <= totQues) {
      setSelectedQuestions(selected);
    } else {
      setError(`Please select a number less than or equal to ${totQues}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${baseURL}/form/createForm/${""}`);
      
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Logged in'
        })
      } else {
        
      }
      
    } catch (error) {
      console.log(error.message);
    }
 
    
  };

  const handleInputChange1 = (e) => {
    setPercent(e.target.value);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{
        paddingTop: '5rem',
        width: '75 %'
      }} className="container">
        < form onSubmit={handleSubmit} >
          <div className="input mb-3">
            <span className="input-text" id="inputGroup-sizing-default">
              Enter Exam Name
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              name='examName'
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <label htmlFor="templet-Select">Total No of templates : {totTemp}</label>
          <br />
          <span></span>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            id="templet-Select"
            label="Select one"
            onChange={(e) => handleTemplateChange(e.target.value)}
          >            <option value="">Select a Template</option>

            {tempName.map((name) =>
            (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <div className="card">
            <h5 className="card-header">Total:{totQues}</h5>
            <div className="card-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-small">Questions</span>
                <input
                  type="text"
                  className="form-control"
                  id="mcqQues"
                  value={selectedQuestions}
                  onChange={handleQuestionChange}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
                <span className="input-group-text" id="inputGroup-sizing-small">Marks Per Question</span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  id="mcqMarks"
                  value={marksPerQuestion}
                  onChange={(e) => setMarksPerQuestion(e.target.value)}
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              {
                error && (
                  <div>
                    <span style={{ color: 'red' }}>{error}</span>
                    <p style={{ color: 'white' }}>
                      {setTimeout(() => setError(''), 2000)}
                    </p>
                  </div>
                )
              }
            </div>
          </div>
          <br />
          <h3>Total Marks: {total}</h3>
          <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-small">
              Enter Passing Marks
            </span>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Number"
              max={total}
              onChange={handleInputChange1}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <span className="input-group-text" id="basic-addon2">
              {isNaN(percent) ? 0 : Math.round(((percent / total) * 100), 2)}%
            </span>
          </div>
          <DateTime date={setdate}/>
          <Email Email={setemail} />
          <div className="col-12">
            <br />
            <button type="submit" className="btn btn-primary text-center">
              Save Form
            </button>
          </div>
        </form>
      </div >
    </div >
  );
}

export default FormItem;