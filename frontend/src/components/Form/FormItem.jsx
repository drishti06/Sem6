import React, { useState, useEffect } from "react";
import axios from "axios";
import DateTime from "../Form/DateTime";
<<<<<<< HEAD
=======
import "./FormItem.css"
>>>>>>> master

function FormItem() {
  const [percent, setPercent] = useState(0);
  const [mcq, setMcq] = useState({
    question: 0,
    marks: 0
  });
  const [total, setTotal] = useState(0);
  const [tempName, setTempName] = useState([]);
  const [totTemp, setTotTemp] = useState([]);
  const [totQues, setTotQues] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [marksPerQuestion, setMarksPerQuestion] = useState(0);
  const [error, setError] = useState('')
  const [selectedQuestions, setSelectedQuestions] = useState(0); // Newly added state for selected number of questions

  const baseURL = 'http://localhost:8080';

  const tempApi = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/templates`);
      setTempName(response.data.map((template) => template.temp_name));
      setTotTemp(response.data.length);
<<<<<<< HEAD
      setTotQues(0); // Reset totQues initially
=======
      setTotQues(0); // Reset totQues initiallyc
>>>>>>> master
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

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    // Calculate total marks based on selected questions and marks per question
    const totalMarks = selectedQuestions * marksPerQuestion;
    setTotal(totalMarks);
=======
    if (!e.target.examName.value || !selectedTemplate || selectedQuestions === 0 || !marksPerQuestion || !percent) {
      let errorMessage = 'Please fill in all the details:';
      if (!e.target.examName.value) errorMessage += '\n- Exam Name';
      if (!selectedTemplate) errorMessage += '\n- Template';
      if (selectedQuestions === 0) errorMessage += '\n- Number of Questions';
      if (!marksPerQuestion) errorMessage += '\n- Marks Per Question';
      if (!percent) errorMessage += '\n- Passing Marks';

      alert(errorMessage);
      return;
    }
    const totalMarks = selectedQuestions * marksPerQuestion;
    setTotal(totalMarks);
    const data = {
      form_name: e.target.examName.value,
      template_name: selectedTemplate,
      total_mcqs: randomQuestions,
      no_of_mcqs: selectedQuestions,
      total_marks: totalMarks,
      passing_marks: Math.floor(percent),
    };

    axios.post("http://localhost:8080/form/createForm", data)
      .then((res) => {
        console.log('Form saved successfully:', res.data);
        alert('Form saved')
      })
      .catch((error) => {
        console.log('Error:', error);
      });
>>>>>>> master
  };

  const handleInputChange1 = (e) => {
    setPercent(e.target.value);
  };

<<<<<<< HEAD
=======
  const [randomQuestions, setRandomQuestions] = useState([]);

  // console.log(randomQuestionsData)
  const handleRandomQuestions = () => {

    const data = {
      temp_name: selectedTemplate,
      number: selectedQuestions
    };

    axios.post(`${baseURL}/api/randomQuestions`, data)
      .then((res) => {
        setRandomQuestions(res.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

>>>>>>> master
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
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
<<<<<<< HEAD

=======
>>>>>>> master
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
<<<<<<< HEAD
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
        <DateTime />
=======
        </div>
        <div className="questions" >
          <button onClick={handleRandomQuestions} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Preview Questions
          </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div style={{ paddingTop: '2rem' }} className="modal-dialog">
              <div className="modal-content" style={{ width: '45vw' }}>
                <div className="modal-header">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body" >
                  {randomQuestions.map((question, index) => (
                    <div key={index}>
                      <ul className="randQues">
                        <li>
                          <strong> Q.{index + 1}. {question.Question}</strong>
                        </li>
                        <li>
                          A. {question.A}
                        </li>
                        <li>
                          B.  {question.B}
                        </li>
                        <li>
                          C.  {question.C}
                        </li>
                        <li>
                          D. {question.D}
                        </li>
                        <li>
                          <strong> Ans. {question.Solution}</strong>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h3>Total Marks: {selectedQuestions * marksPerQuestion}</h3>
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-small">
            Enter Passing Marks
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Number"
            max={selectedQuestions * marksPerQuestion}
            onChange={handleInputChange1}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <span className="input-group-text" id="basic-addon2">
            {isNaN(percent) ? 0 : Math.round(((percent / (selectedQuestions * marksPerQuestion)) * 100), 2)}%
          </span>
        </div>
        {/* <DateTime /> */}
>>>>>>> master
        <div className="col-12">
          <br />
          <button type="submit" className="btn btn-primary text-center">
            Save Form
          </button>
        </div>
<<<<<<< HEAD
      </form>
    </div>
=======
      </form >
    </div >
>>>>>>> master
  );
}

export default FormItem;