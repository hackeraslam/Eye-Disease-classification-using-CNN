import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/img/landingPage/profile.png";
import ReactLoading from "react-loading";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
import { auth } from "../firebase.ts";
// import { Auth } from "firebase/auth";
export default function Login(props) {
  const navigate = useNavigate();

  const [Loading, setLoading] = useState(false);
  const [Toggle, setToggle] = useState("Patient");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState({});
  const [usertype, settype] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    switch (Toggle) {
      case "Patient":
        await signInWithEmailAndPassword(auth, username, password)
          .then(() => {
            setLoading(true);

            const auth = getAuth();
            const currentUser = auth.currentUser;
            console.log(currentUser.email);

            const userEmail = currentUser.email;
            const dbRef = ref(getDatabase(), "patients");
            const emailQuery = query(
              dbRef,
              orderByChild("emails"),
              equalTo(userEmail)
            );

            onValue(emailQuery, (snapshot) => {
              const data = Object.values(snapshot.val())[0];

              setUser(data);
              settype(data.type);
              if (data.type === "patient") {
                navigate("/patient/dashboard");
              } else {
                setLoading(false);
                alert("Invalid Email or Password");
              }
            });
          })
          .catch((error) => {
            setLoading(false);
            alert(error.message);
            // setUsernameError(error);
            // setPasswordError(error);
          });

        break;
      case "Doctor":
        await signInWithEmailAndPassword(auth, username, password)
          .then(() => {
            setLoading(true);

            const auth = getAuth();
            const currentUser = auth.currentUser;
            console.log(currentUser.email);

            const userEmail = currentUser.email;
            const dbRef = ref(getDatabase(), "doctors");
            const emailQuery = query(
              dbRef,
              orderByChild("emails"),
              equalTo(userEmail)
            );

            onValue(emailQuery, (snapshot) => {
              const data = Object.values(snapshot.val())[0];

              setUser(data);
              settype(data.type);
              if (data.type === "doctor") {
                navigate("/doctor/dashboard");
              } else {
                setLoading(false);
                alert("Error while Login");
              }
            });
          })
          .catch((error) => {
            // navigate("/");
            // setUsernameError(error);
            // setPasswordError(error);
            setLoading(false);
            alert("Error while Login");
          });
        break;
      case "Admin":
        await signInWithEmailAndPassword(auth, username, password)
          .then(() => {
            setLoading(false);
            navigate("/admin/dashboard");
            props.settoastCondition({
              status: "success",
              message: "Logged in Successfully!!!",
            });
            props.setToastShow(true);
          })
          .catch((error) => {
            // navigate("/");
            // setUsernameError(error);
            // setPasswordError(error);
            setLoading(false);
            alert(error.message);
          });
        break;
      default:
        break;
    }
  };
  return (
    <div className="bg-white flex flex-col justify-items-center items-center py-4 px-4 rounded shadow-md lg:w-3/4 w-full my-7 ml-auto ">
      <h1 className="text-3xl font-bold font-poppins text-primary py-5">
        Login
      </h1>
      <div className="flex bg-bgsecondary w-fit justify-between rounded">
        <button
          className={
            Toggle === "Patient"
              ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
              : "py-2 px-8 text-lg font-poppins font-medium text-primary cursor-pointer rounded"
          }
          onClick={() => {
            setToggle("Patient");
            setUsername("");
            setPassword("");
            setUsernameError("");
            setPasswordError("");
          }}
        >
          Patient
        </button>
        <button
          onClick={() => {
            setToggle("Doctor");
            setUsername("");
            setPassword("");
            setUsernameError("");
            setPasswordError("");
          }}
          className={
            Toggle === "Doctor"
              ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
              : "py-2 px-8 text-lg font-poppins font-medium text-primary cursor-pointer rounded"
          }
        >
          Doctor
        </button>
        <button
          onClick={() => {
            setToggle("Admin");
            setUsername("");
            setPassword("");
            setUsernameError("");
            setPasswordError("");
          }}
          className={
            Toggle === "Admin"
              ? "py-2 px-8 text-lg font-poppins font-semibold cursor-pointer rounded bg-primary"
              : "py-2 px-8 text-lg font-poppins font-medium text-primary cursor-pointer rounded"
          }
        >
          Admin
        </button>
      </div>
      <img
        src={profile}
        alt="profile pic"
        className="h-20 my-6 border-2 rounded-full"
      />
      <form className="flex flex-col w-full px-8" onSubmit={handleLogin}>
        <label
          htmlFor="email"
          className="font-poppins pt-2 pb-1 text-lg font-bold"
        >
          {Toggle === "Patient" ? "Health Id" : "Email"}
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="font-poppins px-3 py-2 bg-bgsecondary rounded outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <span className="text-sm text-red-500">{usernameError}</span>
        <label
          htmlFor="password"
          className="font-poppins pt-6 pb-1 text-lg font-bold"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="font-poppins px-3 py-2 bg-bgsecondary rounded outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className="text-sm text-red-500">{passwordError}</span>

        {Loading ? (
          <div className="flex justify-center items-center py-3">
            <ReactLoading
              type={"bubbles"}
              color={"color"}
              height={"10%"}
              width={"10%"}
            />
          </div>
        ) : (
          <button
            type="submit"
            className="text-lg mt-10  bg-primary py-1 px-3 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary"
          >
            Login
          </button>
        )}
      </form>
      <h1 className="font-poppins text-base pt-5">
        New User, <Link to="/Register">Register here</Link>
      </h1>
    </div>
  );
}
