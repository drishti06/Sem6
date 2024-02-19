import axios from 'axios'
import React, { useState } from 'react'
import "./ExamForm.css"

const ExamForm = () => {
    const [examName, setExamName] = useState('')
    const [exam, setExam] = useState("")
    const [subName, setSubName] = useState("")
    const [examQues, setExamQues] = useState([])
    const [examAns, setExamAns] = useState([])

    const baseURL = "http://localhost:8080"
    const handleExamForm = (e) => {
        e.preventDefault()
        axios.post(`${baseURL}/form/examForm`, { examName })
            .then((res) => {
                setExam(res.data.form_name)
                setSubName(res.data.template_name)
                setExamQues(res.data.total_mcqs);
                console.log(res.data)
                console.log(res.data.total_mcqs)
            }).catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className="exam-wrapper">
            <div>

                <input type="text" placeholder="Enter exam name" onChange={(e) => { setExamName(e.target.value) }} name='exam_name' />
                <button onClick={handleExamForm}>Load</button>
            </div>
            <div className="examForm">
                <div>
                    <span>Exam: {exam}</span>
                    <span>Subject: {subName}</span>
                </div>
                <div className='q-a'>
                    {examQues.map((data, index) => (
                        <div key={index}>
                            <strong>
                                <span>{index + 1}.{data.Question}</span>
                            </strong>
                            <div className="answers-opt">
                                <div>
                                    A. <input type="radio" name="answer" id="" />  {data.A}
                                </div>
                                <div>
                                    B.  <input type="radio" name="answer" id="" /> {data.B}
                                </div>
                                <div>
                                    C.  <input type="radio" name="answer" id="" /> {data.D}
                                </div>
                                <div>
                                    D. <input type="radio" name="answer" id="" /> {data.D}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ExamForm