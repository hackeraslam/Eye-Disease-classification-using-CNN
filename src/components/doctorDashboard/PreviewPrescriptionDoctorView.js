import { Link, useNavigate } from "react-router-dom";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import Footer from "../landingPage/Footer";
import doctor_profile from "../../assets/img/dashboard/doctor2.png";
import { useEffect, useState } from "react";
import {
  getDatabase,
  set,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
const PreviewPrescriptionDoctorView = (props) => {
  // printprescriptionstart

  // printprescriptionend
  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const navigate = useNavigate();
  const [prescription, setPrescription] = useState({
    doctor: "",
    doctormobile: "",
    hospital: {
      name: "",
      address: "",
      mobile: "",
    },
    chiefComplaints: [{ complaint: "", duration: "", finding: "" }],
    notes: "",
    diagnosis: "",
    procedureConducted: "",
    medicines: [
      {
        medicineName: "",
        type: "",
        dosage: {
          morning: { quantity: "", remark: "" },
          afternoon: { quantity: "", remark: "" },
          evening: { quantity: "", remark: "" },
        },
        duration: "",
        total: "",
      },
    ],
    investigations: [{ investigation: "" }],
    advices: [{ advice: "" }],
  });
  const [patient, setPatient] = useState({});
  const database = getDatabase();
  const [report, setreport] = useState({});
  const [datap, setdatap] = useState({});
  useEffect(() => {
    async function fetchprescription() {
      const database = getDatabase();

      const prescriptionRef = ref(database, "Prescriptions");

      // Listen for changes in the "Prescriptions" reference
      onValue(prescriptionRef, (snapshot) => {
        const prescriptions = snapshot.val();
        setdatap(Object.values(snapshot.val()));
        console.log(datap[0].chiefComplaints[0].finding);

        // do something with the prescriptions data
      });
    }
    async function getreport() {
      const userEmail = props.healthID;
      const dbRef = ref(database, "reports");
      const emailQuery = query(
        dbRef,
        orderByChild("email"),
        equalTo(userEmail)
      );

      onValue(emailQuery, (snapshot) => {
        const data = Object.values(snapshot.val())[0];
        // console.log(data.firstname);
        setreport(data);
      });
    }
    async function fetchpatient() {
      // const res = await fetch(`/searchpatient/${props.healthID}`);
      // const data = await res.json();

      // if (data.AuthError) {
      //   props.settoastCondition({
      //     status: "info",
      //     message: "Please Login to proceed!!!",
      //   });
      //   props.setToastShow(true);
      //   navigate("/");
      // } else {
      //   setPatient(data.patient);
      // }
      console.log("health: " + props.healthID);

      const userEmail = props.healthID;
      const dbRef = ref(database, "patients");
      const emailQuery = query(
        dbRef,
        orderByChild("emails"),
        equalTo(userEmail)
      );

      onValue(emailQuery, (snapshot) => {
        const data = Object.values(snapshot.val())[0];
        console.log(data.firstname);
        setPatient(data);
      });
    }
    getreport();
    fetchprescription();
    fetchpatient();
  }, []);

  return (
    <div
      className="body h-screen col-span-10 font-poppins   overflow-y-scroll scroll-m-0"
      id="prescription"
    >
      <div className="w-3/4  ml-32 bg-white shadow-xl p-8 mb-4 mt-6">
        <div className="grid grid-cols-2 border-b-2 border-black">
          <div className="m-2 ">
            <div className="flex font-bold">
              <h1 className="">Dr.</h1>
              {/* <h1 className="ml-2 ">{prescription[0].doctor}</h1> */}
            </div>
            {/* <div className="flex">
              <h4>MBBS</h4>
              <h3 className="ml-2">M.D</h3>
            </div> */}
            <div className="flex">
              <h2 className="font-bold">Mobile No.</h2>
              {/* <h2 className="ml-2">{data[0].doctormobile}</h2> */}
            </div>
          </div>
          <div className="m-2 ">
            <div>
              {/* <h1 className="font-bold">{data[0].hospital.name}</h1> */}
            </div>
            <div className="flex">
              {/* <h2>{data.hospital.address}</h2> */}
              {/* <h2 className="ml-2">425155</h2> */}
            </div>
            <div className="flex">
              <h2 className="font-bold">Phone no.</h2>
              {/* <h2 className="ml-2">{data[0].hospital.mobile}</h2> */}
            </div>
            {/* <div className="flex">
              <h2 className="font-bold">Closed :</h2>
              <h2 className="ml-2">sunday</h2>
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-3 mt-4">
          <div className="col-span-2">
            <div className="flex">
              <h1 className="font-bold">Health ID : </h1>
              <h4 className="ml-2">{props.healthID}</h4>
            </div>
            <div className="flex">
              <h1 className="font-bold">Patient Name : </h1>
              <div className="flex">
                <h2 className="pl-1">{patient.firstname}</h2>
                <h2 className="pl-1">{patient.lastname}</h2>
              </div>
            </div>
            <div className="flex">
              <h1 className="font-bold mr-2">Address: </h1>
              <h4>{`${patient?.area},  ${patient?.city},   ${patient?.district},  ${patient?.state}`}</h4>
            </div>
          </div>
          <div>
            <div className="flex">
              <h1 className="font-bold">Date : </h1>
              <h4 className="ml-2">{convertDatetoString(report?.date)}</h4>
            </div>
          </div>
        </div>
        {/* <div className="flex">
          <h1 className="font-bold">Referred by :</h1>
          <h4 className="ml-2">Dr.</h4>
          <h4>narayan rane</h4>
        </div> */}
        <div className="grid grid-rows-2 mt-4 ">
          <div className="grid grid-cols-2 justify-center border-t-2 border-b-2 border-black ">
            <h1 className="ml-2 font-bold">Chief complaints</h1>
            <h1 className="ml-2 font-bold">clinincal findings</h1>
          </div>
          {/* {.map((complaint) => {
            return ( */}
          <div className="grid grid-cols-2 justify-center ml-2 border-b-2 border-gray-400">
            <h1>{`${datap[0]?.chiefComplaints[0].complaint} (${datap[0]?.chiefComplaints[0].duration} days)`}</h1>
            <h1>{datap[0]?.chiefComplaints[0].finding}</h1>
          </div>
          );
          {/* })} */}
        </div>
        <div className="mt-2">
          <h1 className="font-bold">Notes </h1>
          <h4 className="ml-2">{datap[0]?.notes.note}</h4>
        </div>
        <div className="mt-2">
          <h1 className="font-bold">Diagnosis</h1>
          <h4 className="ml-2">{datap[0]?.diagnosis.diagno}</h4>
        </div>
        <div className="">
          <h1 className="font-bold">Procedure Conducted</h1>
          <h4 className="ml-2">{datap[0]?.procedureConducted.procedure}</h4>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-3 border-b-2 border-t-2 border-black">
            <h1 className="font-bold">medicine name</h1>
            <h1 className="font-bold">Dosages</h1>
            <h1 className="font-bold">Duration</h1>
          </div>
          {datap[0]?.medicines.map((medicine) => {
            return (
              <div className="grid grid-cols-3 border-b-2 border-gray-400">
                <div>
                  <h1>{medicine.medicineName}</h1>
                </div>
                <div>
                  <div className="flex">
                    <h2>morning :</h2>
                    <h2>{`${medicine.dosage.morning.quantity} (${medicine.dosage.morning.remark})`}</h2>
                  </div>
                  <div className="flex">
                    <h2>afternoon :</h2>
                    <h2>{`${medicine.dosage.afternoon.quantity} (${medicine.dosage.afternoon.remark})`}</h2>
                  </div>
                  <div className="flex">
                    <h2>night :</h2>
                    <h2>{`${medicine.dosage.evening.quantity} (${medicine.dosage.evening.remark})`}</h2>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <h1>days :</h1>
                    <h2>{medicine.duration}</h2>
                  </div>
                  <div className="flex">
                    <h1>Total Tab. :</h1>
                    <h2>{medicine.total}</h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <h1 className="font-bold">Insvestigations</h1>
          <div>
            {datap[0]?.investigations.map((investigation) => {
              return <h3>{investigation.investigation}</h3>;
            })}
          </div>
        </div>
        <div className="mb-2">
          <h1 className="font-bold">Advices</h1>
          <div>
            {datap[0]?.advices.map((advice) => {
              return <h3>{advice.advice}</h3>;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PreviewPrescriptionDoctorView;
