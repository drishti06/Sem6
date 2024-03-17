import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./AllForm.css"
import Sidebar from '../Sidebar'
import Email from './Email'
import DateTime from './DateTime'
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";

const AllForm = () => {
    const [forms, setForms] = useState([])
    const [email, setemail] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [formDetail, setFormDetail] = useState([])
    const [date, setdate] = useState({
        start: '',
        end: ''
    });
    const baseURL = 'http://localhost:8080'
    useEffect(() => {
        axios.get(`${baseURL}/form/allForms`)
            .then((res) => {
                setForms(res.data)
                // console.log(res.data)
            }).catch((error) => {
                console.log(error.message)
            })
    }, [])

    const handleShareButtonClick = (formName) => {
        setSelectedForm(formName);
    };
    const [mcqs, setMcqs] = useState([])
    const handleFormDetails = (formName) => {
        axios.post(`${baseURL}/form/detail`, { formName }).then((res) => {
            setFormDetail(res.data)
            console.log(res.data)
            setMcqs(res.data[0].total_mcqs)
        })
    }

    const handleFormSharing = async () => {
        const formItems = {
            form_name: selectedForm,
            email: email,
            startDate: date.start,
            endDate: date.end
        }
        const resp = await axios.post(`${baseURL}/form/email`, { formItems })
        // console.log(resp.response)
    }

    const handleDetele = async (id) => {
        await axios.get(`${baseURL}/form/deleteForm/${id}`).then((res) => {
            Swal.fire({
                icon: 'success',
                text: 'Form Deleted'
            })
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                text: `${error.message}`
            })
        })
    }
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ paddingTop: '5rem' }} className='container'>
                <span>Forms</span>
                <div>
                    {forms.map((form, index) => (
                        <div className="forms" key={index}>
                            <div key={index} className='forms-wrapper'>
                                <div style={{
                                    display: 'flex', gap: '2rem',
                                    alignItems: 'center'
                                }}>
                                    <div>{index + 1}. {form.form_name}</div>
                                    <button onClick={() => handleFormDetails(form.form_name)} type="button" className="btn btn-primary form-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Show details
                                    </button>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div style={{ paddingTop: '2rem' }} className="modal-dialog">
                                            <div className="modal-content" style={{ width: '45vw' }}>
                                                <div className="modal-header">
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body" >
                                                    {
                                                        formDetail.map((data, index) => {
                                                            return (
                                                                <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <span><strong> Form name: </strong>{data.form_name} </span>
                                                                    <span><strong>Template name:</strong> {data.template_name}</span>
                                                                    <span><strong>Total mcqs: </strong>{data.no_of_mcqs}</span>
                                                                    <span><strong>Total Marks: </strong>{data.total_marks}</span>
                                                                    <span><strong>Created by: </strong>{data.user}</span>
                                                                    <br />
                                                                    <span><strong>List of Questions : </strong></span>
                                                                    <div>
                                                                        {mcqs.map((mcq, index) => {
                                                                            return (
                                                                                <div key={index} style={{ display: 'flex', flexDirection: 'column' }}>
                                                                                    <strong>
                                                                                        <span>{index + 1}. {mcq.Question}</span>
                                                                                    </strong>
                                                                                    <span>A. {mcq.A}</span>
                                                                                    <span>B. {mcq.B}</span>
                                                                                    <span>C. {mcq.C}</span>
                                                                                    <span>D. {mcq.D}</span>
                                                                                    <strong>

                                                                                        <span>Ans. {mcq.Solution}</span>
                                                                                    </strong>
                                                                                    <br />
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
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
                                    <button onClick={() => handleShareButtonClick(form.form_name)} type="button" className="btn btn-primary form-btn" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                        Share
                                    </button>
                                    <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div style={{ paddingTop: '2rem' }} className="modal-dialog">
                                            <div className="modal-content" style={{ width: '45vw' }}>
                                                <div className="modal-header">
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body" >
                                                    <Email Email={setemail} />
                                                    <DateTime date={setdate} />
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleFormSharing}>Send</button>
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        handleDetele(form._id)
                                    }} className="btn btn-primary" >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllForm