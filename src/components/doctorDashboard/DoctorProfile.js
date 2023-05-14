import Footer from "../landingPage/Footer";

import patient_card_profile from "../../assets/img/dashboard/admin-card-profile.png";
import name from "../../assets/img/dashboard/patient-profile-name.png";
import birth from "../../assets/img/dashboard/patient-profile-birth.png";
import address from "../../assets/img/dashboard/patient-profile-address.png";
import phone from "../../assets/img/dashboard/patient-profile-phone.png";
import mail from "../../assets/img/dashboard/patient-profile-mail.png";
import blood from "../../assets/img/dashboard/patient-profile-blood.png";
import hospital from "../../assets/img/dashboard/doctor-profile-hospital.png";
import hospital_contact from "../../assets/img/dashboard/doctor-profile-contact.png";
import speciality from "../../assets/img/dashboard/doctor-profile-speciality.png";
import degree from "../../assets/img/dashboard/doctor-profile-degree.png";
import home from "../../assets/img/dashboard/doctor-profile-home.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";

const DoctorProfile = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  useEffect(() => {
    async function getpatient() {
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
        // console.log(data.firstname);
        setUser(data);
        // console.log(data.specialization);
      });
    }
    getpatient();
  }, []);
  const [doctor, setDoctor] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
    org: "",
    orgAddress: {
      building: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
    emergencyno: "",
    orgNumber: "",
    dob: "",
    mobile: "",
    email: "",
    adharCard: "",
    bloodGroup: "",
    education: [{ degree: "" }],
    address: {
      building: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
    specialization: [{ special: "" }],
    password: "",
    _id: "",
  });

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <body className="font-poppins col-span-10 overflow-y-scroll">
      <div className="grid grid-cols-2 mt-16">
        <div className="p-4 m-8 bg-white shadow-md w-2/3 mx-auto rounded-md ">
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
                <h2 className="ml-2">Dr.</h2>
                <h2 className="ml-2">{user?.firstName}</h2>
                <h2 className="ml-2">{user?.lastname}</h2>
              </div>
            </div>
            <div className="flex ml-8 mt-4">
              <img src={birth} className="h-5 w-5 ml-1" />
              <h2 className="ml-4">{convertDatetoString(user?.dob)}</h2>
            </div>
            <div className="flex ml-8 mt-4">
              <img src={blood} className="h-6 w-6" />
              <h2 className="ml-4">{user?.BloodGroup}</h2>
            </div>
            <div className="flex ml-8 mt-4">
              <img src={phone} className="h-6 w-6 " />
              <h2 className="ml-4">+92</h2>
              <h2 className="ml-2">{user?.mobile}</h2>
            </div>
            <div className="flex ml-8 mt-4">
              <img src={mail} className="h-6 w-5 " />
              <h2 className="ml-4 ">{user?.emails}</h2>
            </div>
          </div>
        </div>
        <div className="my-2">
          <div className="p-8 m-2 bg-white shadow-md w-2/3 rounded-md">
            <div className="flex mt-3">
              <img src={home} className="h-6 w-6" />
              <div className="ml-4">
                <h2>
                  {`${user?.address?.building},  ${user?.address?.city},  ${user?.address?.taluka},  ${user?.address?.district},  ${user?.address?.state}-  ${user.address?.pincode}`}
                </h2>
              </div>
            </div>
            {/* <div className="flex mt-4">
              <img src={degree} className="h-6 w-6" />
              <h1 className="ml-4">{user.address}</h1>
            </div> */}
            <div className="flex mt-4">
              <img src={speciality} className="h-6 w-6" />
              <h1 className="ml-4">
                {user?.specialization?.map((i) => {
                  return `${i.special}  `;
                })}
              </h1>
            </div>
          </div>
          <div className="p-8 m-2 bg-white shadow-md w-2/3 rounded-md mt-10">
            <h1 className="font-bold flex justify-center text-xl">
              Hospital Details
            </h1>
            <div className="flex mt-4 ">
              <img src={hospital} className="h-6 w-6" />
              <h1 className="ml-4"> {user?.org}</h1>
            </div>

            <div className="flex mt-3">
              <img src={hospital_contact} className="w-5 h-5 " />

              <h1 className="ml-4">{"949494993939"}</h1>
            </div>
            <div className="flex mt-3">
              <img src={mail} className="w-5 h-6 " />

              <h1 className="mx-4">cityhospital@gmail.com</h1>
            </div>

            <div className="flex mt-6">
              <img src={address} className="h-7 w-8" />
              <div className="ml-4 ">
                <h2>
                  {`${user?.orgAddress?.building},  ${user?.orgAddress?.city},  ${user?.orgAddress?.taluka},  ${user?.orgAddress?.district},  ${user?.orgAddress?.state}-  ${user?.orgAddress?.pincode}`}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default DoctorProfile;
