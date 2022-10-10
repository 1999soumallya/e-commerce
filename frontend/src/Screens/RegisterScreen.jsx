import React, { useState, useEffect } from "react";
import "../Style/css2.css";
import "../Style/tailwind.min.css";
import Logo from "../Images/Online-shop-logo-template-on-transparent-background-PNG.png";
import BackgroundImage from "../Images/Online-Shopping.svg";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Form , Row, Col} from "react-bootstrap";
import DnaLoader from "../Shared/Loaders/DnaLoader";
import ErrorAlert from "../Shared/Alerts/CustomAlert";
import { UserRegister } from "../Actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

const RegisterScreen = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [message, setmessage] = useState("");


    const history = useHistory();
    const location = useLocation();

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);

    const { loading, error, userInfo } = userRegister;
    
    useEffect(() => {
        if (JSON.stringify(userRegister) !== '{}') {
            console.log(userRegister);
            history.push(redirect);
        } else {
            history.push('/register')
        }
    }, [history, userInfo, redirect, userRegister]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setmessage('Password Do Not Matched')
        } else {
            dispatch(UserRegister(name, email, password));
        }
    };

    return (
        <>
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div>
                        <img src={Logo} alt={Logo} className="w-32 mx-auto" />
                    </div>
                    {error && <ErrorAlert varient="danger" children={error}></ErrorAlert>}
                    {loading && <DnaLoader />}
                    {message && <ErrorAlert variant="danger" children={message}></ErrorAlert>}
                    <div className="flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">
                            <Form className="mx-auto max-w-xs" onSubmit={submitHandler}>
                                <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" type="text" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} />
                                <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4" type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
                                <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4" type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                                <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-4" type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} />
                                <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy={7} r={4} />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">Register</span>
                                </button>
                                <Row className="row text-center pt-2">
                                    <Col>
                                        Have an account ?{" "}
                                        <Link to={"/signin"}> Login </Link>
                                    </Col>
                                </Row>
                            </Form>
                            <p className="mt-6 text-xs text-gray-600 text-center">
                                I agree to abide by templatana's
                                <Link to={"#"} className="border-b border-gray-500 border-dotted"> {" "} Terms of Service{" "} </Link>
                                and its
                                <Link to={"#"} className="border-b border-gray-500 border-dotted"> {" "} Privacy Policy{" "} </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url("${BackgroundImage}")` }}/>
                </div>
            </div>
        </>
    );
};

export default RegisterScreen;
