import React, { useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'react-bootstrap'
import countryList from 'react-select-country-list'
import { State, City } from 'country-state-city'
import Select from 'react-select'
import { UserSaveAddressAction } from '../Actions/UserAction'

function Modal() {
    const [name, setName] = useState("")
    const [mobileNo, setMobileNo] = useState(0)
    const [EmailId, setEmailId] = useState(0)
    const [pincode, setPinCode] = useState(0)
    const [Locality, setLocality] = useState('')
    const [commentText, setCommentText] = useState("")
    const [Newcountry, setNewCountry] = useState('')
    const [Newstate, setNewState] = useState('')
    const [Newcity, setNewCity] = useState('')
    const [WorkType, setWorkType] = useState("")

    const dispatch = useDispatch()

    const options = useMemo(() => countryList().getData(), [])


    const changeCountryHandler = (value) => {
        setNewCountry(value)
    }

    let NewstateList = State.getStatesOfCountry(Newcountry.value)
    let NewcityList = City.getCitiesOfState(Newcountry.value, Newstate)

    const SaveAddress_submitHandler = (e) => {
        dispatch(UserSaveAddressAction(name, mobileNo, EmailId, pincode, Locality, commentText, Newcountry.label, Newstate, Newcity, WorkType))
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" style={{ width: "132%" }}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Add Address
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form className="mx-auto max-w" onSubmit={SaveAddress_submitHandler}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput1" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                        <label htmlFor="floatingInput1">Name</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control" id="floatingInput3" placeholder="pincode" value={pincode} onChange={(e) => setPinCode(e.target.value)} />
                                        <label htmlFor="floatingInput3">Pincode</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control" id="floatingPassword2" placeholder="10-digit mobile number" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
                                        <label htmlFor="floatingPassword2">10-digit mobile number</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingPassword6" placeholder="Email Id" value={EmailId} onChange={(e) => setEmailId(e.target.value)} />
                                        <label htmlFor="floatingPassword6">Email ID</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingInput7" placeholder="Landmark (Optional)" />
                                        <label htmlFor="floatingInput7">Landmark (Optional)</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mb-3">
                                        <input type="password" className="form-control" id="floatingPassword8" placeholder="Alternate Phone (Optional)" />
                                        <label htmlFor="floatingPassword8">Alternate Phone (Optional)</label>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="form-floating mb-3">
                                        <textarea name="" id="floating_textarea" rows="5" className="form-control" placeholder="Address (Area and Street)" value={commentText} onChange={e => setCommentText(e.target.value)}></textarea>
                                        <label htmlFor="floating_textarea">Address (Area and Street)</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingPassword4" placeholder="Locality" value={Locality} onChange={(e) => setLocality(e.target.value)} />
                                        <label htmlFor="floatingPassword4">Locality</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mb-3">
                                        <Select options={options} value={Newcountry} onChange={changeCountryHandler} />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mb-3">
                                        {
                                            JSON.stringify(NewstateList) !== "[]" ? (
                                                <select className="form-select" aria-label="Default select example" value={Newstate} onChange={(e) => setNewState(e.target.value)} style={{ height: "60px" }}>
                                                    <option value={"StateSelected"} selected>Select State</option>
                                                    {
                                                        NewstateList.map((NewstateList) => (
                                                            <option key={NewstateList.isoCode} value={NewstateList.isoCode}>{NewstateList.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            ) : (
                                                <select className="form-select" aria-label="Default select example" style={{ height: "60px" }}>
                                                    <option value={"StateSelected"}>Select...</option>
                                                </select>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating mb-3">
                                        {
                                            JSON.stringify(NewcityList) !== "[]" ? (
                                                <select className="form-select" aria-label="Default select example" value={Newcity} onChange={(e) => setNewCity(e.target.value)} style={{ height: "60px" }}>
                                                    <option value={"StateSelected"} selected>Select City</option>
                                                    {
                                                        NewcityList.map((NewcityList) => (
                                                            <option key={NewcityList.name} value={NewcityList.name}>{NewcityList.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            ) : (
                                                <select className="form-select" aria-label="Default select example" style={{ height: "60px" }}>
                                                    <option value={"StateSelected"}>Select...</option>
                                                </select>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <label className="adress_label">Address Type</label>
                                    <div className="radio_area">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={WorkType} onChange={(e) => setWorkType("Home")} />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1"> Home </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={WorkType} onChange={(e) => setWorkType("Work")} />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2"> Work </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb--0" style={{ textAlign: "center" }}>
                                <input type="submit" className="btn-sm save_changes_btn" defaultValue="Save Changes" />
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
