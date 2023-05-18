import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import delete_btn from "../../assets/img/dashboard/delete.png";
import { getDatabase, get, ref, remove } from "firebase/database";

const PatientListCompo = (props) => {
  const navigate = useNavigate();
  const [dob, setDob] = useState("");
  const database = getDatabase();
  const deletePatient = async () => {
    try {
      const patientsRef = ref(database, "patients");
      const snapshot = await get(patientsRef);
      const patientsData = snapshot.val();

      // Find the patient with matching email
      const patientId = Object.keys(patientsData).find(
        (key) => patientsData[key].emails === props.patient.emails
      );

      if (patientId) {
        const patientRef = ref(database, `patients/${patientId}`);
        await remove(patientRef);
        console.log("Patient deleted successfully");
        alert("Record Deleted Sucessfully");
        window.location.reload();
      } else {
        console.log("Patient not found");
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <div className="grid grid-cols-9">
      <h1 className="col-start-1">{props.index + 1}</h1>
      <h1 className="col-span-2">{props.patient.emails}</h1>
      <h1 className="col-span-2">{`${props.patient.firstname} ${props.patient.lastname}`}</h1>
      <h1 className="col-span-1">{props.patient.dob}</h1>
      <div className="col-span-2 pr-2">
        <h1 className="text-lg ">{props.patient.mobile}</h1>
        {/* <h1 className="text-sm"> {props.patient.emails}</h1> */}
      </div>
      <div>
        <button
          className="flex items-center bg-primary w-24 h-8 rounded font-bold shadow hover:bg-bgsecondary"
          onClick={deletePatient}
        >
          <img src={delete_btn} className="h-4 mx-2"></img>Delete
        </button>
      </div>
    </div>
  );
};

export default PatientListCompo;
