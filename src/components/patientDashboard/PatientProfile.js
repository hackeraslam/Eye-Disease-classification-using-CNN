import Footer from "../landingPage/Footer";
import patient_card_profile from "../../assets/img/dashboard/admin-card-profile.png";
import name from "../../assets/img/dashboard/patient-profile-name.png";
import birth from "../../assets/img/dashboard/patient-profile-birth.png";
import address from "../../assets/img/dashboard/patient-profile-address.png";
import phone from "../../assets/img/dashboard/patient-profile-phone.png";
import mail from "../../assets/img/dashboard/patient-profile-mail.png";
import blood from "../../assets/img/dashboard/patient-profile-blood.png";
import healthid from "../../assets/img/dashboard/patient-profile-healthid.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
// import { getDatabase, onValue } from "firebase/database";
// import firebase from "firebase/app";
import "firebase/database";
import db from "../firebase.ts";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
import { UncontrolledAccordion } from "reactstrap";

const PatientProfile = (props) => {
  const navigate = useNavigate();
  // const auth = getAuth();
  const [user, setUser] = useState({});

  useEffect(() => {
    // Get the current user's email
    async function getpatient() {
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
        // console.log(data.firstname);
        setUser(data);
      });
    }
    getpatient();
  }, []);

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <body className="font-poppins col-span-10 h-screen overflow-y-scroll ">
      <div className="grid grid-cols-2 mt-16">
        <div className="p-4 m-8 bg-white shadow-md w-2/3 mx-auto rounded-md  ">
          <div className="flex justify-center">
            <img
              src={patient_card_profile}
              className="h-40 w-40 rounded-full border-2  p-4 "
              alt="patient-profile"
            />
          </div>
          <div className="mt-6">
            <div className="flex ml-8 ">
              <img src={name} className="h-8 w-8  " />
              <div className="flex mt-1">
                <h2 className="ml-2">{user.firstname}</h2>
                <h2 className="ml-2">{user.lastname}</h2>
              </div>
            </div>
            <div className="flex ml-8 mt-4">
              <img src={birth} className="h-5 w-5 ml-1" />
              <h2 className="ml-4">{user.dob}</h2>
            </div>
            <div className="flex ml-8 mt-4">
              <img src={blood} className="h-6 w-6" />
              <h2 className="ml-4">{user.BloodGroup}</h2>
            </div>
            <div className="flex ml-8 mt-4">
              <img src={phone} className="h-6 w-6 " />
              <h2 className="ml-4">+92</h2>
              <h2 className="ml-2">{user.mobile}</h2>
            </div>
            <div className="flex ml-8 mt-4">
              <img src={mail} className="h-6 w-5 " />
              <h2 className="ml-4 ">{user.emails}</h2>
            </div>
            <div className="flex ml-8 mt-4">
              <img src={healthid} className="h-6 w-5 " />
              <h2 className="ml-4">{"NaN"}</h2>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="p-8 m-2 bg-white shadow-md w-2/3 rounded-md">
            <div className="flex mt-3">
              <img src={address} className="h-7 w-8" />
              <div className="ml-4">
                <h2>
                  {" "}
                  {`${user.area},  ${user.city},  ${user.district},  ${user.state}  `}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default PatientProfile;
