import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientListCompo from "./PatientListCompo";
import { getDatabase, ref, set, get } from "firebase/database";
const PatientList = (props) => {
  const navigate = useNavigate();
  // const [patientList, setPatientList] = useState([]);
  const database = getDatabase();

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch all patients once
    const fetchPatients = async () => {
      try {
        const patientsRef = ref(database, "patients");
        const snapshot = await get(patientsRef);
        const patientsData = snapshot.val();
        if (patientsData) {
          const patientsArray = Object.values(patientsData);
          setPatients(patientsArray);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);
  return (
    <div className="m-4 mt-4 font-poppins col-span-10">
      <div>
        <h1 className="font-bold text-xl ml-16 mt-16">Patient List</h1>
      </div>
      <div className="grid grid-rows-2 mt-8 m-14 mr-12  bg-white rounded shadow p-6 gap-4">
        <div className="grid grid-cols-9 font-bold">
          <h1>Sr.No.</h1>
          <h1 className="col-span-2">Email</h1>
          <h1 className="col-span-2">Patient Name</h1>
          <h1 className="col-span-0">Birth Date</h1>
          <h1 className="col-span-2">Contact</h1>
          <h1>Action</h1>
        </div>
        <hr></hr>
        {patients.length > 0 ? (
          patients.map((patient, index) => {
            return (
              <PatientListCompo
                key={patient.cnic}
                patient={patient}
                index={index}
                healthID={patient.emails}
                // settoastCondition={props.settoastCondition}
                // setToastShow={props.setToastShow}
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center">
            No Patients are Found on System
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
