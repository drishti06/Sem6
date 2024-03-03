import axios from 'axios'
import React, { useState } from 'react'
import "./ExamForm.css"

const ExamForm = () => {
    const [examName, setExamName] = useState('')
    const [exam, setExam] = useState("")
    const [subName, setSubName] = useState("")
    const [studentName, setStudentName] = useState("")
    const [examQues, setExamQues] = useState([])
    const [examAns, setExamAns] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [loading, setLoading] = useState(false) // New state for loading indication

    const baseURL = "http://localhost:8080"

    const handleExamForm = (e) => {
        e.preventDefault()
        setLoading(true); // Set loading state to true
        axios.post(`${baseURL}/form/examForm`, { examName })
            .then((res) => {
                setExam(res.data.form_name)
                setSubName(res.data.template_name)
                setExamQues(res.data.total_mcqs);
                const initialAnswers = res.data.total_mcqs.map(() => '');
                setExamAns(initialAnswers);
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoading(false); // Set loading state to false when response is received
            });
    }

    const handleAnswerSelection = (index, selectedAnswer) => {
        const updatedAnswers = [...examAns];
        updatedAnswers[index] = selectedAnswer;
        setExamAns(updatedAnswers);
    }

    const handleSubmitAnswers = () => {
        if (examAns.some(answer => answer === '')) {
            setErrorMessage('Please answer all questions before submitting.');
            return;
        }

        if (studentName === '') {
            setErrorMessage('Please enter your name before submitting.');
            return;
        }

        setSubmitting(true);

        axios.post(`${baseURL}/form/examResponse`, { answers: examAns, studentName, examName })
            .then((res) => {
                alert('Exam Submitted! ')
                setExamQues([]);
                setExamName('')
                setStudentName('')
                setExamAns([]);
                setSubmitting(false);
            }).catch((error) => {
                console.log(error);
                setSubmitting(false);
            })
    }

    return (
        <div className="exam-wrapper">
            <div class="input-group mb-3">
                <input type="text" className='form-control' placeholder="Enter exam name" onChange={(e) => { setExamName(e.target.value) }} name='exam_name' />
                <button className='btn btn-primary' onClick={handleExamForm}>Load</button>
            </div>
            {loading && <div>Loading exam...</div>} {/* Show loading message when loading state is true */}
            {!loading && exam && ( // Show the rest of the form when exam data is available
                <div className="examForm">
                    <div>
                        <span>Exam: {exam}</span>
                        <span>Subject: {subName}</span>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" className='form-control' placeholder="Enter exam name" onChange={(e) => { setExamName(e.target.value) }} name='exam_name' />
                        <input type="text" className='form-control' placeholder="Enter Seat No" onChange={(e) => { setExamName(e.target.value) }} name='exam_name' />
                        <input type="text" className='form-control' placeholder="Enter Roll No" onChange={(e) => { setExamName(e.target.value) }} name='exam_name' />
                        {/* <button className='btn btn-primary' onClick={handleExamForm}>Load</button> */}
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
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
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