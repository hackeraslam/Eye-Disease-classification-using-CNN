import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import Footer from "../landingPage/Footer";
const PreviewPrescription = (props) => {
  //   function printPrescription() {
  //     var mywindow = window.open("", "PRINT", "height=full,width=full");

  //     mywindow.document.write(
  //       "<html><head><title>" + document.title + "</title> "
  //     );
  //     mywindow.document.write("</head><body >");
  //     mywindow.document.write("<h1>" + document.title + "</h1>");
  //     mywindow.document.write(document.getElementById("prescription").innerHTML);
  //     mywindow.document.write("</body></html>");
  //     // necessary for IE >= 10*/

  //     mywindow.print();
  //     mywindow.close();

  //     return true;
  //   }

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
  const [patient, setPatient] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
    address: {
      building: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
  });
  useEffect(() => {
    async function fetchprescription() {
      // const res = await fetch(`/prescription/${props.prescriptionID}`);
      // const data = await res.json();
      // if (data.AuthError) {
      //   props.settoastCondition({
      //     status: "info",
      //     message: "Please Login to proceed!!!",
      //   });
      //   props.setToastShow(true);
      //   navigate("/");
      // } else if (data.error) {
      //   props.settoastCondition({
      //     status: "error",
      //     message: "Something went Wrong!!!",
      //   });
      //   props.setToastShow(true);
      //   navigate("/patient/dashboard");
      // } else {
      // setPrescription(data.prescription[0]);
      // }
    }
    async function fetchpatient() {
      // const res = await fetch("/getpatient");
      // const data = await res.json();
      // if (data.AuthError) {
      //   props.settoastCondition({
      //     status: "info",
      //     message: "Please Login to proceed!!!",
      //   });
      //   props.setToastShow(true);
      //   navigate("/");
      // } else {
      // setPatient(data.patient);
      // }
    }
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
              <h1 className="ml-2 ">{prescription.doctor}</h1>
            </div>
            <div className="flex">
              <h2 className="font-bold">Mobile No.</h2>
              <h2 className="ml-2">{prescription.doctormobile}</h2>
            </div>
          </div>
          <div className="m-2 ">
            <div>
              <h1 className="font-bold">{prescription.hospital.name}</h1>
            </div>
            <div className="flex">
              <h2>{prescription.hospital.address}</h2>
              {/* <h2 className="ml-2">425155</h2> */}
            </div>
            <div className="flex">
              <h2 className="font-bold">Phone no.</h2>
              <h2 className="ml-2">{prescription.hospital.mobile}</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-4">
          <div className="col-span-2">
            <div className="flex">
              <h1 className="font-bold">Health ID : </h1>
              <h4 className="ml-2">{patient.healthID}</h4>
            </div>
            <div className="flex">
              <h1 className="font-bold">Patient Name : </h1>
              <div className="flex">
                <h2 className="pl-1">{patient.name.firstName}</h2>
                <h2 className="pl-1">{patient.name.middleName}</h2>
                <h2 className="pl-1">{patient.name.surName}</h2>
              </div>
            </div>
            <div className="flex">
              <h1 className="font-bold mr-2">Address: </h1>
              <h4>{`${patient.address.building},  ${patient.address.city},  ${patient.address.taluka},  ${patient.address.district},  ${patient.address.state},  ${patient.address.pincode}`}</h4>
            </div>
          </div>
          <div>
            <div className="flex">
              <h1 className="font-bold">Date : </h1>
              <h4 className="ml-2">
                {convertDatetoString(prescription.createdAt)}
              </h4>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <h1 className="font-bold">Diagnosis</h1>
          <h4 className="ml-2">{prescription.diagnosis}</h4>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PreviewPrescription;
