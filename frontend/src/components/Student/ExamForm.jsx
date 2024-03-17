import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./ExamForm.css"
import Swal from 'sweetalert2'



const ExamForm = () => {
    const [examName, setExamName] = useState('')
    const [exam, setExam] = useState("")
    const [subName, setSubName] = useState("")
    const [studentInfo, setStudentInfo] = useState({
        name: '',
        seatNo: '',
        rollNo: ''
    })
    const [examQues, setExamQues] = useState([])
    const [examAns, setExamAns] = useState([])
    const [correctAns, setCorrectAns] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [totalMarks, setTotalMarks] = useState(0)
    const [loading, setLoading] = useState(false) // New state for loading indication
    const [name, setName] = useState('');
    const baseURL = "http://localhost:8080"
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const examName = searchParams.get('name');
    setName(examName);
    setLoading(true);
    axios.post(`${baseURL}/form/examForm`, { examName })
            .then((res) => {
                // console.log(res)
                setExam(res.data.form_name)
                setSubName(res.data.template_name)
                setExamQues(res.data.total_mcqs);
                setCorrectAns(res.data.answers)
                setTotalMarks(res.data.total_marks)
                const initialAnswers = res.data.total_mcqs.map(() => '');
                setExamAns(initialAnswers);
                // console.log(examAns)
            }).catch((error) => {
                console.log(error)
                Swal.fire({
                    icon: 'info',
                    text: error.response.data.message
                })
            }).finally(() => {
                setLoading(false); // Set loading state to false when response is received
            });
  }, []);

    // console.log(name);
    


    const handleAnswerSelection = (index, selectedAnswer) => {
        const updatedAnswers = [...examAns];
        updatedAnswers[index] = selectedAnswer;
        setExamAns(updatedAnswers);
    }

    const handleSubmitAnswers = () => {
        setSubmitting(true);
        console.log("Shivam",{ answers: examAns, correctAns: correctAns, examName: name, studentName: studentInfo.name, totalMarks: totalMarks })
         axios.post(`${baseURL}/form/examResponse`, { answers: examAns, correctAns: correctAns, examName: name, studentName: studentInfo.name, totalMarks: totalMarks })
            .then((res) => {
                console.log(res)
                setExamQues([]);
                setExamName('')
                setStudentInfo({})
                setExamAns([]);
                setSubmitting(false);
                Swal.fire(
                    {
                        icon: 'success',
                        text: `Your Score: ${res.data.score}`
                    }
                )

            }).catch((error) => {
                console.log(error);
                setSubmitting(false);
                Swal.fire({
                    icon: 'error',
                    text: 'error'
                })
            })
    }

    return (
        <div className="exam-wrapper">
           
            {loading && <div>Loading exam...</div>} {/* Show loading message when loading state is true */}
            {!loading && exam && ( // Show the rest of the form when exam data is available
                <div className="examForm">
                    <div>
                        <span>Exam: {exam}</span>
                        <span>Subject: {subName}</span>
                    </div>
                    <div className="input-group mb-3">
                        {/* <input type="text" className='form-control' placeholder="Enter exam name" value={name} name='exam_name' /> */}
                        <input type="text" className='form-control' placeholder="Enter Name" onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })} name='exam_name' />
                        <input type="text" className='form-control' placeholder="Enter Seat No" onChange={(e) => setStudentInfo({ ...studentInfo, seatNo: e.target.value })} name='exam_name' />
                        <input type="number" className='form-control' placeholder="Enter Roll No" onChange={(e) => setStudentInfo({ ...studentInfo, rollNo: e.target.value })} name='exam_name' />

                    </div>
                    <div className='q-a'>
                        {examQues.map((data, index) => (
                            <div key={index}>
                                <strong>
                                    <span>{index + 1}.{data.Question}</span>
                                </strong>
                                <div className="answers-opt">
                                    <div>
                                        A. <input type="radio" name={`answer${index}`} value="A" onChange={(e) => handleAnswerSelection(index, e.target.value)} />  {data.A}
                                    </div>
                                    <div>
                                        B.  <input type="radio" name={`answer${index}`} value="B" onChange={(e) => handleAnswerSelection(index, e.target.value)} /> {data.B}
                                    </div>
                                    <div>
                                        C.  <input type="radio" name={`answer${index}`} value="C" onChange={(e) => handleAnswerSelection(index, e.target.value)} /> {data.C}
                                    </div>
                                    <div>
                                        D. <input type="radio" name={`answer${index}`} value="D" onChange={(e) => handleAnswerSelection(index, e.target.value)} /> {data.D}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
                    {submitting ? (
                        <div className="submitting-message">Your response is being submitted...</div>
                    ) : (
                        <button className='btn btn-success' onClick={handleSubmitAnswers}>Submit Answers</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default ExamForm
