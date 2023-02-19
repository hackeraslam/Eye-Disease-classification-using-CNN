import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import plus_logo from "../../assets/img/dashboard/add2_pbl.png";
import minus_logo from "../../assets/img/dashboard/minus2_pbl.png";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
// import auth from "../firebase.ts";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { uid } from "uid";

import { getDatabase, ref, set } from "firebase/database";

export default function Register(props) {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [Toggle, setToggle] = useState("Patient");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: {},
    address: {},
    contactPerson: { address: {} },
  });
  const [passwordError, setPasswordError] = useState("");
  const [fname, set_fname] = useState("");
  const [lname, set_lname] = useState("");
  const [dob, set_dob] = useState("");
  const [mobile, set_mobile] = useState("");
  const [email, set_email] = useState("");
  const [cnic, set_cnic] = useState("");
  const [blood, setblood] = useState("");
  const [area, set_area] = useState("");
  const [city, set_city] = useState("");
  const [district, set_district] = useState("");
  const [state, set_state] = useState("");
  const [pass, set_pass] = useState("");
  const [cpass, set_cpass] = useState("");

  function register(userId) {
    const db = getDatabase();
    const auth = getAuth();
    userId = uid();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(() => {
        set(ref(db, "patients/" + userId), {
          firstname: fname,
          lastname: lname,
          emails: email,
          dob: dob,
          mobile: mobile,
          cnic: cnic,
          BloodGroup: blood,
          area: area,
          city: city,
          district: district,
          state: state,
          password: pass,
          type: "patient",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // const register = async (e) => {
  //   const db = getDatabase();
  //
  // };
  return (
    <div className="body overflow-hidden">
      <Navbar></Navbar>
      <div className="bg-secoundry w-full">
        <div className="">
          <div className=" flex justify-center mt-4">
            <h1 className="  p-2 px-8 rounded font-bold text-5xl">Register</h1>
          </div>

          <form
            className="font-poppins lg:ml-60  lg:px-8 lg:py-4 bg-white shadow-lg rounded max-w-screen-lg mt-8 mb-4 "
            onSubmit={register}
          >
            <div className="flex   mt-2 bg-bgsecondary w-fit  justify-between rounded mx-auto">
              <button
                onClick={() => setToggle("Patient")}
                className={
                  Toggle === "Patient"
                    ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
                    : "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-bgsecondary"
                }
              >
                Patient
              </button>
              <button
                onClick={() => setToggle("Doctor")}
                className={
                  Toggle === "Doctor"
                    ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
                    : "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-bgsecondary"
                }
              >
                Doctor
              </button>
            </div>
            <div
              className={
                Toggle === "Doctor"
                  ? "h-96 p-2 flex flex-col justify-center "
                  : "hidden"
              }
            >
              <h1 className="font-bold flex justify-center mt-6">
                For register as doctor contact to admin with you all information
              </h1>
              <div className="border-4 p-4 mx-auto w-1/2 rounded-xl mt-8  ">
                <h1>send your all information</h1>
                <div>
                  <div className=" rounded-xl p-4 mt-4 ">
                    <h1 className="font-bold">Email :</h1>
                    <p>admin@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={Toggle === "Patient" ? "" : "hidden"}>
              <div className="lg:grid lg:grid-cols-4 lg:gap-2 mt-4 mr-4 grid grid-cols-4 gap-2">
                <label className="font-bold lg:text-xl font-poppins px-4 my-4 ">
                  Name
                </label>
                <div>
                  <input
                    className="bg-blue-100 rounded lg:h-10 lg:pl-4 mt-4 lg:text-md text-sm h-8 px-2"
                    required
                    placeholder="first name"
                    value={fname}
                    type="text"
                    onChange={(e) => {
                      set_fname(e.target.value);
                      // register();
                    }}
                  ></input>
                </div>

                <input
                  className="bg-blue-100 rounded lg:h-10 lg:pl-4 mt-4 lg:text-md text-sm h-8 px-2"
                  required
                  placeholder="last name"
                  type="text"
                  value={lname}
                  onChange={(e) => {
                    set_lname(e.target.value);
                  }}
                ></input>
              </div>
              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="font-bold lg:text-xl px-4 ">Birthdate</label>
                <input
                  type="date"
                  className=" bg-blue-100 lg:h-10 rounded pl-4 h-8"
                  required
                  value={dob}
                  onChange={(e) => {
                    set_dob(e.target.value);
                  }}
                ></input>
              </div>
              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="font-bold lg:text-xl px-4 ">
                  Mobile No.{" "}
                </label>

                <input
                  type="tel"
                  placeholder="mobile no."
                  required
                  className="pl-4 bg-blue-100 lg:h-10  rounded h-8"
                  value={mobile}
                  onChange={(e) => {
                    set_mobile(e.target.value);
                  }}
                ></input>
              </div>

              <div className=" aadhar lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="font-bold lg:text-xl px-4 ">CNIC. </label>
                <div>
                  <input
                    type="text"
                    placeholder="CNIC"
                    required
                    className="pl-4 bg-blue-100 lg:h-10  rounded h-8"
                    value={cnic}
                    onChange={(e) => {
                      set_cnic(e.target.value);
                    }}
                  ></input>
                  <span className="text-xs text-red-500 py-1">
                    {errors.Cnic}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="  lg:text-xl font-bold px-4 ">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="e.g : abcdefg@gmail.com"
                  required
                  className="bg-blue-100 lg:h-10 rounded pl-4 col-span-2 h-8"
                  value={email}
                  onChange={(e) => {
                    set_email(e.target.value);
                    // register();
                  }}
                ></input>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 mr-4">
                <label className="  lg:text-xl font-bold px-4">
                  Blood Group
                </label>
                <div className="">
                  <select
                    className="pl-4 lg:w-1/2 bg-blue-100 lg:h-10  rounded  h-8"
                    id="blood-group"
                    value={blood}
                    onChange={(e) => {
                      setblood(e.target.value);
                    }}
                  >
                    <option id="select">select</option>
                    <option id="A+">A+</option>
                    <option id="A-">A-</option>
                    <option id="B+">B+</option>
                    <option id="B-">B-</option>
                    <option id="AB+">AB+</option>
                    <option id="AB-">AB-</option>
                    <option id="O+">O+</option>
                    <option id="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 mr-4 grid-flow-dense ">
                <label className=" lg:text-xl font-bold px-4 mb-8 col-span-1">
                  Address
                </label>
                <div className="grid grid-cols-2 lg:gap-8 gap-2 col-span-3 ">
                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded pl-4 h-8 "
                    required
                    placeholder="building/area"
                    value={area}
                    onChange={(e) => {
                      set_area(e.target.value);
                    }}
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded pl-4 h-8 "
                    required
                    placeholder="village/city"
                    value={city}
                    onChange={(e) => {
                      set_city(e.target.value);
                      register();
                    }}
                  ></input>

                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded  pl-4 h-8"
                    required
                    placeholder="District"
                    value={district}
                    onChange={(e) => {
                      set_district(e.target.value);
                    }}
                  ></input>
                  <input
                    type="number"
                    className="bg-blue-100 lg:h-10  rounded  pl-4 h-8"
                    required
                    placeholder="Pin-code"
                    // value={}
                    onChange={(e) => {}}
                  ></input>
                  <input
                    type="text"
                    className="bg-blue-100 lg:h-10  rounded  pl-4 h-8"
                    placeholder="State"
                    value={state}
                    onChange={(e) => {
                      set_state(e.target.value);
                    }}
                  ></input>
                </div>
              </div>

              <div className="lg:grid grid-cols-4 gap-2 mt-4 mr-4">
                <label type="password" className="  lg:text-xl font-bold px-4">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-blue-100 lg:h-10  rounded pl-4 h-8"
                  required
                  placeholder="password"
                  value={pass}
                  onChange={(e) => {
                    set_pass(e.target.value);
                  }}
                ></input>
              </div>

              <div className="lg:grid lg:grid-cols-4 gap-2 mt-4 mr-4 flex">
                <label type="password" className=" lg:text-xl font-bold px-4">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-blue-100 lg:h-10  rounded lg:pl-4 h-8 pl-2"
                  required
                  placeholder="Confirm password"
                  value={cpass}
                  onChange={(e) => set_cpass(e.target.value)}
                ></input>
                <span className="text-sm py-1 text-red-500">
                  {passwordError}
                </span>
              </div>
            </div>

            <div className={Toggle === "Patient" ? "" : "hidden"}>
              <div className="flex justify-center mb-4 mt-8">
                {Loading ? (
                  <ReactLoading
                    type={"bubbles"}
                    color={""}
                    height={"5%"}
                    width={"5%"}
                  />
                ) : (
                  <button className="bg-primary rounded p-2 px-8 font-bold text-xl hover:bg-bgsecondary mb-4 ">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="mt-auto relative bottom-0">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </div>
  );
}
