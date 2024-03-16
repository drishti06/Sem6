import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./AllForm.css"
import Sidebar from '../Sidebar'
import Email from './Email'

const AllForm = () => {
    const [forms, setForms] = useState([])
    const [email, setemail] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/form/allForms')
            .then((res) => {
                setForms(res.data)
            }).catch((error) => {
                console.log(error.message)
            })
    }, [])

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
                                <button type="button" className="btn btn-primary form-btn" data-bs-toggle="modal" data-bs-target="#exampleModal1">
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
                                            </div>
                                            <div className="modal-footer">
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