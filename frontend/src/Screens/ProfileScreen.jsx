import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import countryList from 'react-select-country-list'
import { State, City } from 'country-state-city'
import Select from 'react-select'
import UserImage from '../Images/author1.png'
import '../Style/style.css'
import { UserDetailsAction, UpdateUserProfileAction } from '../Actions/UserAction'
import ErrorAlert from '../Shared/Alerts/CustomAlert'

const ProfileScreen = ({ history }) => {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [Email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setname] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')


    const options = useMemo(() => countryList().getData(), [])
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const userDetails = useSelector(state => state.userDetails)

    const { userInfo } = userLogin
    const { user } = userDetails

    const changeHandler = (value) => {
        setCountry(value)
    }

    let stateList = State.getStatesOfCountry(country.value)
    let cityList = City.getCitiesOfState(country.value, state)


    const userUpdate = useSelector((state) => state.userUpdate)
    const { succcess } = userUpdate

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            if (!user._id) {
                dispatch(UserDetailsAction('profile'))
            } else {
                setfirstName(user.name.split(" ")[0])
                setlastName(user.name.split(" ")[1])
                setEmail(user.email)
            }
        }
    }, [dispatch, history, user, userInfo])

    useEffect(() => {
        if (JSON.stringify(user) !== "{}") {
            let f = user.name.split(" ")[0]
            let l = user.name.split(" ")[1]
            if (firstName !== f || lastName !== l) {
                setname(firstName + " " + lastName)
            } else {
                setname(user.name)
            }
        }
    }, [firstName, lastName, user])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(UpdateUserProfileAction({ id: user._id, name, Email, password }))
    }

    return (
        <div>
            <section className="profile_section">

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="user_info">
                                <div className="user_dp">
                                    <img src={UserImage} alt="" />
                                </div>
                                <div className="info_details">
                                    <b className="user_name">Hello Annie</b>
                                    <span className="user_jioning">eTrade Member Since Sep 2020</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                    <i className="fas fa-th-large" /> dashboard
                                </a>
                                <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                                    <i className="fas fa-shopping-bag" />
                                    orders
                                </a>
                                <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                                    <i className="fas fa-file-download" />
                                    downloads
                                </a>
                                <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                                    <i className="fas fa-map-marker-alt" /> address
                                </a>
                                <a className="nav-link" id="v-pills-account-tab" data-toggle="pill" href="#v-pills-account" role="tab" aria-controls="v-pills-account" aria-selected="false">
                                    <i className="fas fa-user" />
                                    account details
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    555
                                </div>
                                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">Order</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td>Larry</td>
                                                <td>the Bird</td>
                                                <td>@twitter</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                    slhfhifhifhifgefr
                                </div>
                                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                    <div className="address_area">
                                        <small>
                                            The following addresses will be used on the checkout page by
                                            default.
                                        </small>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="shipping_header">
                                                    <b className="shipping_title">Shipping Address</b>
                                                    <Link to={"/"} className="adress_edit">
                                                        <i className="fas fa-edit" />
                                                    </Link>
                                                </div>
                                                <ul className="address-details">
                                                    <li>Name: Annie Mario</li>
                                                    <li>Email: annie@example.com</li>
                                                    <li>Phone: 1234 567890</li>
                                                    <li className="mt--30">
                                                        7398 Smoke Ranch Road <br />
                                                        Las Vegas, Nevada 89128
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="shipping_header">
                                                    <b className="shipping_title">Billing Address</b>
                                                    <Link to={"/"} className="adress_edit">
                                                        <i className="fas fa-edit" />
                                                    </Link>
                                                </div>
                                                <ul className="address-details">
                                                    <li>Name: Annie Mario</li>
                                                    <li>Email: annie@example.com</li>
                                                    <li>Phone: 1234 567890</li>
                                                    <li className="mt--30">
                                                        7398 Smoke Ranch Road <br />
                                                        Las Vegas, Nevada 89128
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="v-pills-account" role="tabpanel" aria-labelledby="v-pills-account-tab">
                                    <div className="user_account_detl">
                                        {succcess && <ErrorAlert variant="success" children={"Profile Updated"} />}

                                        <Form onSubmit={submitHandler} className="account-details-form">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input type="text" className="form-control" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input type="text" className="form-control" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input type="text" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group mb--40 select_box">
                                                        <label>Country/ Region</label>
                                                        <Select options={options} value={country} onChange={changeHandler} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group mb--40 select_box">
                                                        <label>State</label>
                                                        {
                                                            JSON.stringify(stateList) !== "[]" ? (
                                                                <select className="form-select" aria-label="Default select example" value={state} onChange={(e)=> setState(e.target.value)}>
                                                                    <option value={"StateSelected"} selected>Select State</option>
                                                                    {
                                                                        stateList.map((stateList) => (
                                                                            <option value={stateList.isoCode}>{stateList.name}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            ) : (
                                                                <select className="form-select" aria-label="Default select example">
                                                                    <option value={"StateSelected"}>Select...</option>
                                                                </select>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group mb--40 select_box">
                                                        <label>City</label>
                                                        {
                                                            JSON.stringify(cityList) !== "[]" ? (
                                                                <select className="form-select" aria-label="Default select example" value={city} onChange={(e) => setCity(e.target.value)}>
                                                                    <option value={"StateSelected"} selected>Select City</option>
                                                                    {
                                                                        cityList.map((cityList) => (
                                                                            <option value={cityList.name}>{cityList.name}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            ) : (
                                                                <select className="form-select" aria-label="Default select example">
                                                                    <option value={"StateSelected"}>Select...</option>
                                                                </select>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <p className="b3 mt--10">
                                                        This will be how your name will be displayed in the account
                                                        section and in reviews
                                                    </p>
                                                    <h5 className="title">Password Change</h5>
                                                    <div className="form-group">
                                                        <label>New Password</label>
                                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Confirm New Password</label>
                                                        <input type="password" className="form-control" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                    </div>
                                                    <div className="form-group mb--0">
                                                        <input type="submit" className="save_changes_btn" defaultValue="Save Changes" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default ProfileScreen