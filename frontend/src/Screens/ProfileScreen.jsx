import React, { useEffect, useState, useMemo } from 'react'
import '../Style/style.css'
import UserImage from '../Images/author1.png'
import { useDispatch, useSelector } from 'react-redux'
import { UserDetailsAction } from '../Actions/UserAction'
import { Link } from 'react-router-dom'
import countryList from 'react-select-country-list'
import Select from 'react-select'

const ProfileScreen = ({ history }) => {
    const [firstName, setfirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [Email, setEmail] = useState("")
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const userDetails = useSelector(state => state.userDetails)

    const { userInfo } = userLogin
    const { user } = userDetails

    const changeHandler = value => {
        setValue(value)
    }

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
                                        <form action="" className="account-details-form">
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
                                                        <input type="text" className="form-control" value={lastName} onChange={(e) => setfirstName(e.target.value)} />
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
                                                        <Select options={options} value={value} onChange={changeHandler} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <p className="b3 mt--10">
                                                        This will be how your name will be displayed in the account
                                                        section and in reviews
                                                    </p>
                                                    <h5 className="title">Password Change</h5>
                                                    <div className="form-group">
                                                        <label>Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            defaultValue={123456789101112131415}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>New Password</label>
                                                        <input type="password" className="form-control" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Confirm New Password</label>
                                                        <input type="password" className="form-control" />
                                                    </div>
                                                    <div className="form-group mb--0">
                                                        <input type="submit" className="save_changes_btn" defaultValue="Save Changes" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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