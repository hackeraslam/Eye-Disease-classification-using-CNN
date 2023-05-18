import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import delete_btn from "../../assets/img/dashboard/delete.png";
import { getDatabase, get, ref, remove } from "firebase/database";

const DoctorListCompo = (props) => {
  const navigate = useNavigate();
  const database = getDatabase();
  const deleteDoctor = async () => {
    try {
      const patientsRef = ref(database, "doctors");
      const snapshot = await get(patientsRef);
      const patientsData = snapshot.val();

      // Find the patient with matching email
      const patientId = Object.keys(patientsData).find(
        (key) => patientsData[key].emails === props.doctor.emails
      );

      if (patientId) {
        const patientRef = ref(database, `doctors/${patientId}`);
        await remove(patientRef);
        console.log("Doctor deleted successfully");
        alert("Record Deleted Sucessfully");
        window.location.reload();
      } else {
        console.log("Record not found");
        alert("Record Not Found");
      }
    } catch (error) {
      console.error("Error deleting Doctor:", error);
      alert("Error deleting Doctor:", error);
    }
  };

  return (
    <div className="grid grid-cols-9">
      <h1 className="col-start-1">{props.index + 1}</h1>
      <div className="col-span-2 flex">
        <h1>Dr.</h1>
        <h1 className="ml-1">{`${props.doctor.firstName}  ${props.doctor.lastname}`}</h1>
      </div>
      <h1 className="col-span-2">{props.doctor.org}</h1>
      <h1 className="col-span-1">{props.doctor.specialization[0].special}</h1>
      <div className="col-span-2 pr-2">
        <h1 className="text-lg ">{props.doctor.mobile}</h1>
        {/* <h1 className="text-sm"> {props.doctor.emails} </h1> */}
      </div>

      <button
        data-bs-toggle="modal"
        data-bs-target="#deleteDoctor"
        className="flex items-center bg-primary w-24 h-8 rounded font-bold shadow hover:bg-bgsecondary"
        onClick={deleteDoctor}
      >
        <img src={delete_btn} className="h-4 mx-2"></img>Delete
      </button>
    </div>
  );
};

export default DoctorListCompo;
