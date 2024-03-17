import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./AllForm.css"
import Sidebar from '../Sidebar'
import Email from './Email'
import DateTime from './DateTime'

const AllForm = () => {
    const [forms, setForms] = useState([])
    const [email, setemail] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [date, setdate] = useState({
        start: '',
        end: ''
    });
    const baseURL = 'http://localhost:8080'
    useEffect(() => {
        axios.get(`${baseURL}/form/allForms`)
            .then((res) => {
                setForms(res.data)
            }).catch((error) => {
                console.log(error.message)
            })
    }, [])

    // console.log(email)
    // console.log(date)
    const handleShareButtonClick = (formName) => {
        setSelectedForm(formName);
    };

    const handleFormSharing = async () => {

        const formItems = {
            form_name: selectedForm,
            email: email,
            startDate: date.start,
            endDate: date.end
        }

        const resp = await axios.post(`${baseURL}/form/email`, { formItems })
        console.log(resp.response)
    }
    return (
        <div style={{ display: 'flex', paddingLeft: '2rem' }}>
            <Sidebar />
            <div style={{ paddingTop: '5rem' }}>
                <span>Forms</span>
                {forms.map((form, index) => (
                    <div className="forms" key={index}>
                        <div key={index} className='forms-wrapper'>
                            <div style={{
                                display: 'flex', gap: '2rem',
                                alignItems: 'center'
                            }}>
                                <div>{index + 1}. {form.form_name}</div>
                                <button type="button" className="btn btn-primary form-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Show details
                                </button>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div style={{ paddingTop: '2rem' }} className="modal-dialog">
                                        <div className="modal-content" style={{ width: '45vw' }}>
                                            <div className="modal-header">
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body" >
                                                will be shown here
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
                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default AllForm