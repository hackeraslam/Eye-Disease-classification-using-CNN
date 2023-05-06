import patient_profile from "../assets/img/dashboard/patient2_pbl.png";
import reports from "../assets/img/dashboard/report2_pbl.png";
import search from "../assets/img/dashboard/search2.png";
import Footer from "../components/landingPage/Footer";
import eye from "../assets/img/dashboard/eye.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { uid } from "uid";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  set,
  ref as dbref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
import(getDatabase);

const PatientDashboard = (props) => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  function uploadImage(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const generateId = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 10; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  };

  const storage = getStorage();
  const auth = getAuth();
  const date = new Date();
  const database = getDatabase();
  // const database = getDatabase();
  const [dob, setDob] = useState("01/01/2006");
  const [file, setFile] = useState();
  const [imag, set_imag] = useState();
  const [disease, setDisease] = useState();
  const [open, setopen] = useState();
  const handleOpen = () => setopen(!open);
  const [dis, setdis] = useState();
  const [patient, setPatient] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
    dob: "",
    mobile: "",
    email: "",
    adharCard: "",
    bloodGroup: "",
    address: {
      building: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
    password: "",
    diseases: [{ disease: "", yrs: "" }],
    contactPerson: {
      name: {
        firstName: "",
        surName: "",
      },
      mobile: "",
      email: "",
      relation: "",
      address: {
        building: "",
        city: "",
        taluka: "",
        district: "",
        state: "",
        pincode: "",
      },
    },
  });

  const [prescriptions, setPrescriptions] = useState([{}]);

  useEffect(() => {
    // Get the current user's email
    async function getpatient() {
      const auth = getAuth();

      const currentUser = auth.currentUser;
      console.log(currentUser.email);

      const userEmail = currentUser.email;
      const dbRef = dbref(database, "patients");
      const emailQuery = query(
        dbRef,
        orderByChild("emails"),
        equalTo(userEmail)
      );

      onValue(emailQuery, (snapshot) => {
        const data = Object.values(snapshot.val())[0];
        console.log(data.firstname);
        setUser(data);
      });
    }
    getpatient();
  }, []);
  async function sendImageToAPI() {
    const formData = new FormData();
    formData.append("image", file);
    handleOpen();
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result.result);
    if (result.result === 0) {
      setDisease("Your Eye is Effected with Cataract Disease");
      setdis("Cataract");
    } else {
      setDisease("Congrats, Your Eye is Normal");
      setdis("Normal");
    }
    const userid = uid();
    const userEmail = auth.currentUser.email;
    const uniqueId = Date.now().toString(); // generate a unique ID using the current timestamp
    const imageRef = ref(storage, `${userEmail}/${uniqueId}`);

    try {
      const snapshot = await uploadBytes(imageRef, file);
      console.log("Uploaded a file!", snapshot);
      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      set(dbref(database, "reports/" + userid), {
        reportID: uniqueId,
        link: url,
        email: userEmail,
        disease: dis,
        date: new Date().toLocaleDateString(),
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle the error here
    }
    return result.result;
  }

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="full-body col-span-10 h-screen">
      <div className="body-without-footer max-h-min bg-bgprimary ">
        <div className=" main ">
          <div className="">
            <div className="flex  h-12 m-2 bg-bgprimary rounded mt-4  ">
              <div>
                <h1 className="text-2xl font-poppins font-bold p-2 ">
                  DashBoard Today
                </h1>
              </div>

              <div className="flex ml-20  h-10   ">
                <input
                  placeholder="Search"
                  className="w-96 rounded ml-4 text-xl   pl-4 border focus:outline-none "
                ></input>
                <div className="bg-white pl-2 rounded ">
                  <img src={search} className=" h-6 mt-2  " alt="search"></img>
                </div>
              </div>

              <Link to="/patient/profile">
                <button className="flex bg-white rounded shadow  px-4  ml-60 h-14 ">
                  <img
                    src={patient_profile}
                    className="h-14 p-1 rounded-2xl"
                    alt="profile"
                  ></img>
                  <div className="mt-4 ml-4  font-bold font-poppins">
                    <h1>{`${user.firstname}  ${user.lastname}`}</h1>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="m-4 p-4">
              <div>
                <h1 className="font-bold font-poppins text-xl ">
                  Patient Details
                </h1>
              </div>
              <div className="bg-white font-poppins p-4 mt-4 px-8 rounded-xl shadow">
                <div className="flex">
                  <div>
                    <h1>Name : </h1>
                  </div>
                  <div className="flex ml-2   ">
                    <h1 className="pl-1">{user.firstname}</h1>
                    <h1 className="pl-1">{user.lastname}</h1>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h1>Date : </h1>
                  </div>
                  <div className="ml-2">
                    <h1>{convertDatetoString(user.dob)}</h1>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h1>Blood group : </h1>
                  </div>
                  <div className="ml-2">
                    <h1>{user.BloodGroup}</h1>
                  </div>
                </div>
              </div>
            </div>
            {/* recent health check up start */}
            <div className="m-4 p-4 ">
              <div>
                <h1 className="font-bold font-poppins text-xl ">Eye Checkup</h1>
              </div>
              {prescriptions.length > 0 ? (
                <div className="bg-white mt-4 font-poppins p-4 rounded-xl shadow px-8">
                  <div className="flex">
                    <div>
                      <h1>Date :</h1>
                    </div>
                    <div className="ml-2">
                      <h1>{convertDatetoString(date)}</h1>
                    </div>
                  </div>

                  <input
                    type="file"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      setFile(e.target.files[0]);
                      setDisease("Loading");
                      set_imag(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <img width={200} height={200} src={imag} alt="" />
                  <div className=" mx-50   mt-5 pl-5  bg-primary  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-40  ">
                    <Button
                      className="font-bold"
                      size="lg"
                      onClick={sendImageToAPI}
                    >
                      Check Disease
                    </Button>
                  </div>
                  <Dialog open={open} handler={handleOpen}>
                    <DialogTitle>{disease}</DialogTitle>
                    <DialogContent>
                      <div className="   mt-5 pl-2 bg-primary  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-20  ">
                        <Button
                          className="font-bold"
                          size="lg"
                          onClick={handleOpen}
                        >
                          OK
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="bg-white mt-4 font-poppins p-4 rounded-xl shadow px-8 flex justify-center font-bold">
                  {" "}
                  No Data Found...{" "}
                </div>
              )}
            </div>
            {/* recent health check up end */}
            <div></div>
          </div>

          <div className="font-poppins m-4  ">
            {/* <div className="flex justify-between m-8">
              <div className="font-bold text-xl ml-4">
                <h1>Patient Dashboard</h1>
              </div>
            </div> */}
            <div className="bg-white m-4 rounded-lg ">
              <div className="grid grid-rows-2 p-6 gap-2 shadow">
                <div className="grid grid-cols-4 font-bold  ">
                  <div>
                    <h1>Date</h1>
                  </div>
                  <div>
                    <h1>Report ID</h1>
                  </div>
                  <div>
                    <h1>Diagnosis</h1>
                  </div>

                  <hr></hr>
                  <hr></hr>
                  <hr></hr>
                  <hr></hr>
                </div>

                {prescriptions.length > 1 ? (
                  prescriptions.slice(1, 3).map((prescription) => {
                    return (
                      <div className="grid grid-cols-4">
                        <div>
                          <h1>{convertDatetoString(prescription.createdAt)}</h1>
                        </div>
                        <div className="flex">
                          <h1>Dr. </h1>
                          <h1>{prescription.doctor}</h1>
                        </div>
                        <div>
                          <h1>{prescription.diagnosis}</h1>
                        </div>
                        <Link
                          to="/patient/prescription"
                          onClick={() =>
                            props.setPrescriptionID(prescription._id)
                          }
                        >
                          <div className=" flex  justify-center bg-primary py-1 px-3 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-2/5   ">
                            <img
                              src={eye}
                              className="h-4 my-auto"
                              alt="preview"
                            ></img>
                            <button className="font-bold ml-2">Preview </button>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div className="mx-auto mt-3 mb-5">No Records Found...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PatientDashboard;
