import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";
import Swal from "sweetalert2";

function FormItem() {
  const [percent, setPercent] = useState(0);
  const [total, setTotal] = useState(0);
  const [passing_marks, setPassingMarks] = useState(0);
  const [tempName, setTempName] = useState([]);
  const [totTemp, setTotTemp] = useState([]);
  const [totQues, setTotQues] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [marksPerQuestion, setMarksPerQuestion] = useState(0);
  const [error, setError] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState(0); // Newly added state for selected number of questions
  const [prevQ, setPrevQ] = useState([])
  const [answers, setAnswers] = useState([])
  const baseURL = "http://localhost:8080";

  useEffect(() => {
    const totalMarks = selectedQuestions * marksPerQuestion;
    setTotal(totalMarks);
  }, [totQues, marksPerQuestion]);

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
      const response = await axios.get(
        `${baseURL}/api/template/${selectedTemplate}`
      );
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

  const handlePreviewQuestions = async () => {
    const data = {
      temp_name: selectedTemplate,
      number: selectedQuestions
    }
    // console.log(data.temp_name)
    if (data.temp_name == '' || data.number == 0) {
      Swal.fire({
        icon: 'error',
        text: 'Select both, "Template" and choose number of "Questions" to preview'
      })
    }
    else {
      try {
        await axios.post(`${baseURL}/api/randomQuestions`, data).then((res) => {
          console.log(res)
          setPrevQ(res.data.randomMcqs)
          setAnswers(res.data.answers)

        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleQuestionChange = (e) => {
    const selected = parseInt(e.target.value);
    if (selected <= totQues) {
      setSelectedQuestions(selected);
    } else {
      setError(`Please select a number less than or equal to ${totQues}`);
    }
  };


  const handleInputChange1 = (e) => {
    const passMarks = e.target.value
    const tot = total
    if (passMarks <= tot) {
      setPassingMarks(passMarks)
      setPercent(e.target.value);
    }
    else {
      Swal.fire({
        icon: 'error',
        text: `passing marks should be less than ${total}`
      })
    }
  };

  const [examFormName, setExamFormName] = useState('')
  // console.log(localStorage.getItem('loggedInUsername'))
  // This function is used to create ExamForm
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        formItems: {
          form_name: examFormName,
          template_name: selectedTemplate,
          total_mcqs: prevQ,
          no_of_mcqs: selectedQuestions,
          total_marks: total,
          passing_marks: passing_marks,
          answers: answers,
          user: localStorage.getItem('loggedInUsername')
        }
      }
      const requiredFields = ['form_name', 'template_name', 'total_mcqs', 'no_of_mcqs', 'passing_marks', 'total_marks', 'user', 'answers'];
      const missingFields = requiredFields.filter(field => !data.formItems[field]);
      if (missingFields.length > 0) {
        const errorMessage = `Please fill in the following fields:<br>${missingFields.join('<br>')}`;
        Swal.fire({
          icon: 'error',
          title: 'Missing Fields',
          html: errorMessage,
        });
        return;
      }
      const resp = await axios.post(`${baseURL}/form/createForm`, data)
      console.log(resp)
      if (resp.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Form Submitted",
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Error in form submission'
        })
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        text: `${error.response.data}`
      })
    }
  }
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ paddingTop: "5rem", width: "100%", paddingBottom: "2rem" }} className="container" >
        <form onSubmit={handleSubmit}>
          <div className="input mb-3 ">
            <span className="input-text" id="inputGroup-sizing-default">
              Enter Exam Name
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              name="examName"
              onChange={(e) => { setExamFormName(e.target.value) }}
              aria-describedby="inputGroup-sizing-default"
            />
          </div>
          <label htmlFor="templet-Select">
            Total No of templates : {totTemp}
          </label>
          <br />
          <span></span>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            id="templet-Select"
            label="Select one"
            onChange={(e) => handleTemplateChange(e.target.value)}
          >
            {" "}
            <option value="">Select a Template</option>
            {tempName.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <div className="card">
            <h5 className="card-header">Total Questions:{totQues}</h5>
            <div className="card-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-small">
                  Questions
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="mcqQues"
                  value={selectedQuestions}
                  onChange={handleQuestionChange}
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
                <span className="input-group-text" id="inputGroup-sizing-small">
                  Marks Per Question
                </span>
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
              {error && (
                <div>
                  <span style={{ color: "red" }}>{error}</span>
                  <p style={{ color: "white" }}>
                    {setTimeout(() => setError(""), 2000)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <br />
          <div>
            <button type="button" onClick={handlePreviewQuestions} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Preview Questions
            </button>
            <div style={{ paddingTop: '5rem' }} className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    {
                      prevQ.map((data, index) => {
                        return (
                          <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                            <strong>
                              <span>{index + 1}. {data.Question}</span>
                            </strong>
                            <span>A. {data.A}</span>
                            <span>B. {data.B}</span>
                            <span>C. {data.C}</span>
                            <span>D. {data.D}</span>
                            <strong>
                              <span>Ans. {data.Solution}</span>
                            </strong>
                            <br />
                          </div>

                        )
                      })
                    }
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
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
              onChange={handleInputChange1}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <span className="input-group-text" id="basic-addon2">
              {isNaN(percent) ? 0 : Math.round((percent / total) * 100, 2)}%
            </span>
          </div>
          {/* <DateTime date={setdate} /> */}
          {/* <Email Email={setemail} /> */}
          <div className="col-12">
            <br />
            <button type="submit" className="btn btn-primary text-center">
              Save Form
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FormItem;
