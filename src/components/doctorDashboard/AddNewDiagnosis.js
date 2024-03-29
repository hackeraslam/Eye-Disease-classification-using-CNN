import Footer from "../landingPage/Footer";
import plus_logo from "../../assets/img/dashboard/add2_pbl.png";
import minus_logo from "../../assets/img/dashboard/minus2_pbl.png";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import {
  getDatabase,
  set,
  ref,
  push,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
const AddNewDiagnosis = (props) => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState({});
  const [MedicineList, setMedicineList] = useState([
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
  ]);

  const [chiefComplaints, setChiefComplaints] = useState([
    { complaint: "", duration: "", finding: "" },
  ]);
  // // const [clinicalFindings, setClinicalFindings] = useState([{ finding: "" }]);
  const [investigations, setInvestigations] = useState([{ investigation: "" }]);
  const [advices, setAdvices] = useState([{ advice: "" }]);
  useEffect(() => {
    console.log(props.healthID);
  });
  const [prescription, setPrescription] = useState({
    doctor: "",
    email: props.healthID,
    doctormobile: "",
    hospital: {
      name: "",
      address: "",
      mobile: "",
    },
    chiefComplaints: chiefComplaints,
    notes: { note: "" },
    diagnosis: { diagno: "" },
    procedureConducted: { procedure: "" },
    medicines: MedicineList,
    investigations: investigations,
    advices: advices,
  });
  const database = getDatabase();
  const handleAddPrescription = async (e) => {
    e.preventDefault();
    try {
      const prescriptionRef = ref(database, "Prescriptions");

      // Generate a new unique key for the prescription
      const newPrescriptionRef = push(prescriptionRef);
      set(newPrescriptionRef, prescription);
      setMedicineList([
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
      ]);
      setChiefComplaints([{ complaint: "", duration: "", finding: "" }]);
      setInvestigations([{ investigation: "" }]);
      setAdvices([{ advice: "" }]);
      setPrescription({
        doctor: "",
        doctormobile: "",
        hospital: { name: "", address: "", mobile: "" },
        chiefComplaints: [{ complaint: "", duration: "", finding: "" }],
        notes: { note: "" },
        diagnosis: { diagno: "" },
        procedureConducted: { procedure: "" },
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
      alert("Added Sucessfully");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="font-poppins col-span-10 overflow-y-scroll">
      <div className=" lg:min-h-screen lg:grid grid-cols-6  ">
        <div className=" col-start-1 col-span-6 ml-8">
          <h1 className="font-bold lg:text-2xl my-6 ml-6  ">
            Add a new diagnosis
          </h1>

          <form
            className="bg-white shadow p-6 m-2 ml-2 mt-8 lg:font-bold  "
            onSubmit={handleAddPrescription}
          >
            <div className="mt-3">
              {chiefComplaints.map((chiefComplaint, index) => (
                <div className="grid grid-cols-6 mt-2">
                  <h1 className="col-span-1">Chief Complaints </h1>

                  <input
                    placeholder="complaint "
                    value={chiefComplaint.complaint}
                    onChange={(e) => {
                      let tempChiefComplaint = [...chiefComplaints];
                      tempChiefComplaint[index].complaint = e.target.value;
                      setChiefComplaints(tempChiefComplaint);
                      let tempprescription = { ...prescription };
                      tempprescription.chiefComplaints = chiefComplaints;
                      setPrescription(tempprescription);
                    }}
                    className=" bg-blue-100  rounded mx-2 px-2 py-1.5 outline-none col-span-1"
                  ></input>
                  <input
                    placeholder=" duration "
                    className=" bg-blue-100 rounded mx-2 px-2 py-1.5 outline-none col-span-1"
                    value={chiefComplaint.duration}
                    onChange={(e) => {
                      let tempChiefComplaint = [...chiefComplaints];
                      tempChiefComplaint[index].duration = e.target.value;
                      setChiefComplaints(tempChiefComplaint);

                      let tempprescription = { ...prescription };
                      tempprescription.chiefComplaints = chiefComplaints;
                      setPrescription(tempprescription);
                    }}
                  ></input>
                  <input
                    placeholder="Clinical Finding"
                    className=" bg-blue-100  rounded mx-2 px-2 py-1.5 outline-none col-span-1"
                    value={chiefComplaints.finding}
                    onChange={(e) => {
                      let tempChiefComplaint = [...chiefComplaints];
                      tempChiefComplaint[index].finding = e.target.value;
                      setChiefComplaints(tempChiefComplaint);

                      let tempprescription = { ...prescription };
                      tempprescription.chiefComplaints = chiefComplaints;
                      setPrescription(tempprescription);
                    }}
                  ></input>
                  <div className="flex ml-3">
                    <div
                      className=" m-2 h-8 w-16 mt-0  font-poppins font-semibold cursor-pointer "
                      // onClick={handleAddChiefComplaint}
                    >
                      <img
                        src={plus_logo}
                        className="w-8 h-8"
                        alt="plus-logo"
                      ></img>
                    </div>
                    {chiefComplaints.length > 1 && (
                      <div
                        className=" m-2 h-8 w-20 mt-0 font-poppins font-semibold cursor-pointer "
                        onClick={() => {
                          let tempChiefComplaint = [...chiefComplaints];
                          tempChiefComplaint.splice(index, 1);

                          let tempprescription = { ...prescription };
                          tempprescription.chiefComplaints = tempChiefComplaint;
                          setPrescription(tempprescription);
                          setChiefComplaints(tempChiefComplaint);
                        }}
                      >
                        <img
                          src={minus_logo}
                          className="w-8 h-8"
                          alt="minus-logo"
                        ></img>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-6 mt-3  ">
              <h1 className="">Notes </h1>

              <input
                placeholder=" Note "
                className=" bg-blue-100 rounded mx-2 px-2 py-1.5 outline-none col-span-2"
                value={prescription.notes.note}
                onChange={(e) => {
                  let tempprescription = { ...prescription };
                  tempprescription.notes.note = e.target.value;
                  setPrescription(tempprescription);
                }}
              ></input>
            </div>
            <div className="grid grid-cols-6 mt-3  ">
              <h1 className="">Diagnosis</h1>

              <input
                placeholder="Diagnosis"
                required
                className=" bg-blue-100 rounded mx-2 px-2 py-1.5 outline-none col-span-2"
                value={prescription.diagnosis.diagno}
                onChange={(e) => {
                  let tempprescription = { ...prescription };
                  tempprescription.diagnosis.diagno = e.target.value;
                  setPrescription(tempprescription);
                }}
              ></input>
            </div>
            <div className="grid grid-cols-6 mt-3  ">
              <h1 className="col-span-1">Procedure Conducted</h1>

              <input
                placeholder="Procedure"
                className=" bg-blue-100 rounded mx-2 px-2 py-1.5 outline-none col-span-2"
                value={prescription.procedureConducted.procedure}
                onChange={(e) => {
                  let tempprescription = { ...prescription };
                  tempprescription.procedureConducted.procedure =
                    e.target.value;
                  setPrescription(tempprescription);
                }}
              ></input>
            </div>
            <h1 className="font-bold text-xl mt-4 ">Medicines</h1>

            <div className="mt-4">
              {MedicineList.map((medicine, index) => (
                <div>
                  <div className="grid grid-cols-8">
                    <div className="col-span-3">
                      <div className="grid grid-cols-6 mt-2  ">
                        <h1 className="col-span-2">Medicine Name </h1>

                        <input
                          placeholder="Medicine Name"
                          required
                          className=" bg-blue-100 rounded mx-2 px-2 py-1.5 outline-none col-span-4 ml-14"
                          value={medicine.medicineName}
                          onChange={(e) => {
                            let tempmedicinelist = [...MedicineList];
                            tempmedicinelist[index].medicineName =
                              e.target.value;
                            setMedicineList(tempmedicinelist);

                            let tempprescription = { ...prescription };
                            tempprescription.medicines = MedicineList;
                            setPrescription(tempprescription);
                          }}
                        ></input>
                      </div>
                      <div className="grid grid-cols-6 mt-3  ">
                        <h1 className="col-span-2">Type</h1>

                        <input
                          placeholder="Type of Medicine "
                          className=" bg-blue-100 rounded mx-2 px-2 py-1.5 outline-none ml-14 col-span-4"
                          value={medicine.type}
                          onChange={(e) => {
                            let tempmedicinelist = [...MedicineList];
                            tempmedicinelist[index].type = e.target.value;
                            setMedicineList(tempmedicinelist);
                            let tempprescription = { ...prescription };
                            tempprescription.medicines = MedicineList;
                            setPrescription(tempprescription);
                          }}
                        ></input>
                      </div>
                      <div className="grid grid-cols-6 mt-3  ">
                        <h1 className="col-span-2">Duration (days)</h1>

                        <input
                          required
                          className=" bg-blue-100 rounded mx-2 px-2 py-1.5 outline-none col-span-4 ml-14"
                          value={medicine.duration}
                          onChange={(e) => {
                            let tempmedicinelist = [...MedicineList];
                            tempmedicinelist[index].duration = e.target.value;
                            setMedicineList(tempmedicinelist);
                            let tempprescription = { ...prescription };
                            tempprescription.medicines = MedicineList;
                            setPrescription(tempprescription);
                          }}
                        ></input>
                      </div>
                      <div className="grid grid-cols-6 mt-3  ">
                        <h1 className="col-span-2">Total Tablets</h1>

                        <input
                          required
                          className=" bg-blue-100 rounded mx-2 px-2 py-1.5 outline-none col-span-4 ml-14"
                          type="number"
                          value={medicine.total}
                          onChange={(e) => {
                            let tempmedicinelist = [...MedicineList];
                            tempmedicinelist[index].total = e.target.value;
                            setMedicineList(tempmedicinelist);
                            let tempprescription = { ...prescription };
                            tempprescription.medicines = MedicineList;
                            setPrescription(tempprescription);
                          }}
                        ></input>
                      </div>
                    </div>
                    <div className="col-span-3 ml-6">
                      <h1>Dosages</h1>
                      <div className="grid grid-cols-6 mt-3  ">
                        <h1 className=" col-span-2">Morning</h1>

                        <input
                          placeholder="Quantity"
                          required
                          className=" bg-blue-100  rounded mx-2 px-2 py-1.5 outline-none col-span-2"
                          value={medicine.dosage.morning.quantity}
                          onChange={(e) => {
                            let tempmedicinelist = [...MedicineList];
                            tempmedicinelist[index].dosage.morning.quantity =
                              e.target.value;
                            setMedicineList(tempmedicinelist);
                            let tempprescription = { ...prescription };
                            tempprescription.medicines = MedicineList;
                            setPrescription(tempprescription);
                          }}
                        ></input>
                        <select
                          className="col-span-2"
                          id="morning"
                          placeholder="-"
                          value={medicine.dosage.morning.remark}
                          onChange={(e) => {
                            let tempmedicinelist = [...MedicineList];
                            tempmedicinelist[index].dosage.morning.remark =
                              e.target.value;
                            setMedicineList(tempmedicinelist);
                            let tempprescription = { ...prescription };
                            tempprescription.medicines = MedicineList;
                            setPrescription(tempprescription);
                          }}
                        >
                          <option>select</option>
                          <option>After Food</option>
                          <option>Before food</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-6 mt-2  ">
                        <h1 className="col-span-2">Afternoon</h1>

                        <input
                          placeholder="Quantity"
                          required
                          className=" bg-blue-100 rounded mx-2 px-2 py-1.5 outline-none col-span-2"
                          value={medicine.dosage.afternoon.quantity}
                          onChange={(e) => {
                            let tempmedicinelist = [...MedicineList];
                            tempmedicinelist[index].dosage.afternoon.quantity =
                              e.target.value;
                            setMedicineList(tempmedicinelist);
                            let tempprescription = { ...prescription };
                            tempprescription.medicines = MedicineList;
                            setPrescription(tempprescription);
                          }}
                        ></input>
                        <select
                          className="col-span-2"
                          id="afternoon"
                          placeholder="-"
                          value={medicine.dosage.afternoon.remark}
                          onChange={(e) => {
                            let tempmedicinelist = [...MedicineList];
                            tempmedicinelist[index].dosage.afternoon.remark =
                              e.target.value;
                            setMedicineList(tempmedicinelist);
                            let tempprescription = { ...prescription };
                            tempprescription.medicines = MedicineList;
                            setPrescription(tempprescription);
                          }}
                        >
                          <option>select</option>
                          <option>After Food</option>
                          <option>Before food</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-6 mt-2  ">
                        <h1 className="col-span-2">Night</h1>

                        <input
                          placeholder="Quantity "
                          required
                          className=" bg-blue-100  rounded mx-2 px-2 py-1.5 outline-none col-span-2"
                          value={medicine.dosage.evening.quantity}
                          onChange={(e) => {
                            let tempmedicinelist = [...MedicineList];
                            tempmedicinelist[index].dosage.evening.quantity =
                              e.target.value;
                            setMedicineList(tempmedicinelist);
                            let tempprescription = { ...prescription };
                            tempprescription.medicines = MedicineList;
                            setPrescription(tempprescription);
                          }}
                        ></input>
                        <select
                          className="col-span-2"
                          id="night"
                          placeholder="-"
                          value={medicine.dosage.evening.remark}
                          onChange={(e) => {
                            let tempmedicinelist = [...MedicineList];
                            tempmedicinelist[index].dosage.evening.remark =
                              e.target.value;
                            setMedicineList(tempmedicinelist);
                            let tempprescription = { ...prescription };
                            tempprescription.medicines = MedicineList;
                            setPrescription(tempprescription);
                          }}
                        >
                          <option>select</option>
                          <option>Before Food</option>
                          <option>After food</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className=" m-2 h-10 w-16 mt-0  font-poppins font-semibold cursor-pointer "
                        // onClick={handleAddMedicine}
                      >
                        <img
                          src={plus_logo}
                          className="w-8 h-8"
                          alt="plus-logo"
                        ></img>
                      </div>
                      {MedicineList.length > 1 && (
                        <div
                          className=" m-2 h-10 w-20 mt-0   font-poppins font-semibold cursor-pointer "
                          onClick={() => {
                            let tempmedicinelist = [...MedicineList];
                            setMedicineList(tempmedicinelist);
                            let tempprescription = { ...prescription };
                            tempprescription.medicines = tempmedicinelist;
                            setPrescription(tempprescription);
                            tempmedicinelist.splice(index, 1);
                          }}
                        >
                          <img
                            src={minus_logo}
                            className="w-8 h-8"
                            alt="minus-logo"
                          ></img>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              {investigations.map((Investigation, index) => (
                <div className="grid grid-cols-6 mt-6">
                  <h1 className="col-span-1">Investigations </h1>

                  <input
                    placeholder="e.g demo "
                    className=" bg-blue-100  rounded mx-2 px-2 py-1.5 outline-none col-span-2"
                    value={Investigation.investigation}
                    onChange={(e) => {
                      const tempinvestigations = [...investigations];
                      tempinvestigations[index].investigation = e.target.value;
                      setInvestigations(tempinvestigations);
                      let tempprescription = { ...prescription };
                      tempprescription.investigations = investigations;
                      setPrescription(tempprescription);
                    }}
                  ></input>

                  <div className="flex ml-3">
                    <div
                      className=" m-2 h-8 w-16 mt-0  font-poppins font-semibold cursor-pointer "
                      // onClick={handleAddInvestigation}
                    >
                      <img
                        src={plus_logo}
                        className="w-8 h-8"
                        alt="plus-logo"
                      ></img>
                    </div>
                    {investigations.length > 1 && (
                      <div
                        className=" m-2 h-8 w-20 mt-0   font-poppins font-semibold cursor-pointer "
                        onClick={() => {
                          let tempinvestigations = [...investigations];
                          tempinvestigations.splice(index, 1);
                          let tempprescription = { ...prescription };
                          tempprescription.investigations = tempinvestigations;
                          setPrescription(tempprescription);
                          setInvestigations(tempinvestigations);
                        }}
                      >
                        <img
                          src={minus_logo}
                          className="w-8 h-8"
                          alt="minus-logo"
                        ></img>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {advices.map((Advice, index) => (
                <div className="grid grid-cols-6 mt-2">
                  <h1 className="col-span-1">Advices </h1>

                  <input
                    placeholder="e.g drink more water "
                    className=" bg-blue-100  rounded mx-2 px-2 py-1.5 outline-none col-span-2"
                    value={Advice.advice}
                    onChange={(e) => {
                      const tempadvices = [...advices];
                      tempadvices[index].advice = e.target.value;
                      setAdvices(tempadvices);

                      let tempprescription = { ...prescription };
                      tempprescription.advices = advices;
                      setPrescription(tempprescription);
                    }}
                  ></input>

                  <div className="flex ml-3">
                    <div
                      className=" m-2 h-8 w-16 mt-0  font-poppins font-semibold cursor-pointer "
                      // onClick={handleAddAdvices}
                    >
                      <img
                        src={plus_logo}
                        className="w-8 h-8"
                        alt="plus-logo"
                      ></img>
                    </div>
                    {advices.length > 1 && (
                      <div
                        className=" m-2 h-8 w-20 mt-0   font-poppins font-semibold cursor-pointer "
                        onClick={() => {
                          const tempadvices = [...advices];
                          tempadvices.splice(index, 1);

                          let tempprescription = { ...prescription };
                          tempprescription.advices = tempadvices;
                          setPrescription(tempprescription);
                          setAdvices(tempadvices);
                        }}
                      >
                        <img
                          src={minus_logo}
                          className="w-8 h-8"
                          alt="minus-logo"
                        ></img>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              {Loading ? (
                <ReactLoading
                  type={"bubbles"}
                  color={""}
                  height={"5%"}
                  width={"5%"}
                />
              ) : (
                <button className="bg-primary rounded p-2 px-8 font-bold text-xl hover:bg-bgsecondary mb-4 ">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AddNewDiagnosis;
