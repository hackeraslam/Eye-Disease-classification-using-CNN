import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import Footer from "../landingPage/Footer";
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
const PreviewPrescription = (props) => {
  function printPrescription(id) {
    console.log("print");
  }

  const [user, setUser] = useState({});
  const database = getDatabase();

  const navigate = useNavigate();

  const [report, setReport] = useState([]);

  const [reportID, setRepordID] = useState(0);
  useEffect(() => {
    async function getReport() {
      setRepordID(props.prescriptionID);
      // console.log(props.prescriptionID);
      const dbRef = dbref(database, "reports");
      const emailQuery = query(
        dbRef,
        orderByChild("reportID"),
        equalTo(props.prescriptionID)
      );

      onValue(emailQuery, (snapshot) => {
        const data = Object.values(snapshot.val());
        console.log(data);
        setReport(data);
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
    // console.log(report[0].disease);
    // console.log(report[0].date);
  }, []);

  return (
    <div
      className="body h-screen col-span-10 font-poppins   overflow-y-scroll scroll-m-0"
      id="prescription"
    >
      <div className="w-3/4  ml-32 bg-white shadow-xl p-8 mb-4 mt-6" id="print">
        <div className="grid grid-cols-2 border-b-2 border-black">
          <div className="m-2 ">
            <div className="flex font-bold">
              <h1 className="">FCAI Air University</h1>
            </div>
            <div className="flex font-bold items-center justify-center text-4xl">
              <h1 className="">AstralSpec</h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-4">
          <div className="col-span-2">
            <div className="flex">
              <h1 className="font-bold">ID : </h1>
              <h4 className="ml-2">{reportID}</h4>
            </div>
            <div className="flex">
              <h1 className="font-bold">Email : </h1>
              <h4 className="ml-2">{user.emails}</h4>
            </div>
            <div className="flex">
              <h1 className="font-bold">Patient Name : </h1>
              <div className="flex">
                <h2 className="pl-1">{user.firstname}</h2>
                <h2 className="pl-1">{user.lastname}</h2>
              </div>
            </div>
            <div className="flex">
              <h1 className="font-bold mr-2">Address: </h1>
              <h4>{`${user.area},  ${user.city},  ${user.district},  ${user.state}`}</h4>
            </div>
          </div>
          <div>
            <div className="flex">
              <h1 className="font-bold">Date : </h1>
              <h4 className="ml-2">{report[0]?.date}</h4>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <h1 className="font-bold">Diagnosis</h1>
          <h4 className="ml-2">{report[0]?.disease}</h4>
        </div>

        <div>
          {report[0]?.link ? (
            <img src={report[0]?.link} alt="firebase-image" />
          ) : (
            <p>Loading image...</p>
          )}
        </div>
      </div>
      <Footer />
      <button
        className="flex justify-center items-center bg-primary py-1 px-3 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary"
        onClick={printPrescription("print")}
      >
        Print
      </button>
    </div>
  );
};

export default PreviewPrescription;
