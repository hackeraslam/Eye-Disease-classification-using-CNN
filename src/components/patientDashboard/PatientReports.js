import Footer from "../landingPage/Footer";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import PatientReportCompo from "./PatientReportCompo";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
const PatientReports = (props) => {
  const auth = getAuth();
  const database = getDatabase();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const [prescriptions, setPrescriptions] = useState([]);

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    // Get the current user's email
    async function getReport() {
      // 2. Get a reference to the reports node in the Firebase Realtime Database
      // const reportsRef = database.ref("reports");
      const currentUser = auth.currentUser;

      console.log(currentUser.email);
      const userEmail = currentUser.email;
      const dbRef = dbref(database, "reports");
      const emailQuery = query(
        dbRef,
        orderByChild("email"),
        equalTo(userEmail)
      );

      onValue(emailQuery, (snapshot) => {
        const data = snapshot.val();
        const reports = [];
        // setPrescriptions({})
        console.log(snapshot.val());
        snapshot.forEach((reportSnapshot) => {
          const report = reportSnapshot.val();
          prescriptions.push(report);
        });
        console.log(prescriptions);
      });
    }

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
    getReport();
    getpatient();
  }, []);
  return (
    <div className="col-span-10">
      <div className=" px-12">
        <div className="h-screen">
          <div className="font-poppins   mainf">
            <Link to="/patient/profile">
              <div className="flex bg-white rounded shadow  px-4   ml-auto h-14 w-1/5 mr-8 mt-8">
                <img
                  src={patient_profile}
                  className="w-12 p-1 rounded-2xl"
                  alt="profile"
                ></img>
                <div className="grid grid-rows-2 ml-4 gap-2  mb-4">
                  <div className="mt-4 ml-4  font-bold font-poppins">
                    <h1 className="ml-2">
                      {`${user.firstname} ${user.lastname}`}
                    </h1>
                  </div>
                </div>
              </div>
            </Link>
            <div className="flex justify-between m-8">
              <div className="font-bold text-xl ml-4">
                <h1>Patient Reports</h1>
              </div>
            </div>
            <div className="bg-white m-4 rounded-lg ">
              <div className="grid grid-rows-2 p-6 gap-2 shadow">
                <div className="grid grid-cols-4 font-bold ">
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
                {prescriptions.length > 0 ? (
                  prescriptions.map((prescription) => {
                    return (
                      <PatientReportCompo
                        prescription={prescription}
                        setPrescriptionID={props.setPrescriptionID}
                      />
                    );
                  })
                ) : (
                  <div className="font-bold mt-3 mx-auto">
                    No Record Found...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="-mt-20 mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PatientReports;
