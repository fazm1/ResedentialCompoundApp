import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "Users"));

  const Udata = [];
  querySnapshot.forEach((doc) => {
    Udata.push({ id: doc.id, ...doc.data() });
  });
  return Udata;
};

function Complaints() {
  const { id } = useParams();
  let [counter, setCounter] = useState(0);
  let [compDetails, setCompDetails] = useState([]);
  let [userSnapshot, setUserSnapshot] = useState([]);

  let [radio, setRadio] = useState(null);

  let [radio1, setRadio1] = useState(null);
  let [radio2, setRadio2] = useState(null);

  const fetchComplaint = async () => {
    const docRef = doc(db, "Complaints", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCompDetails(docSnap.data());
      if (compDetails.Status === "تم حل المشكلة") {
        setRadio1(true);
        setRadio2(false);
      } else if (compDetails.Status === "جاري التفقد") {
        setRadio1(false);
        setRadio2(true);
      } else {
        setRadio1(false);
        setRadio2(false);
      }
    } else {
    }
    setCounter(1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(radio);
    if (radio === "Solved") {
      await updateDoc(doc(db, `Complaints/`, id), {
        Status: "تم حل المشكلة",
      });
      alert("تم تحديد حالة الشكوى");
    } else if (radio == "Pending") {
      await updateDoc(doc(db, `Complaints/`, id), {
        Status: "جاري التفقد",
      });
      alert("تم تحديد حالة الشكوى");
    }
  };

  useEffect(() => {
    fetchComplaint();
    async function fetchAllData() {
       
      const users = await fetchUsers();
      setUserSnapshot(users);
    }
    fetchAllData();
  }, [counter]);
  return (
    <div className="Complaints">
      <h5 className="mt-4">عنوان الشكوى:</h5>
      <p>{compDetails.Title}</p>

      <h5 className="mt-4">نص الشكوى:</h5>
      <p className="text-break">{compDetails.Body}</p>

      <h5 className="mt-4">نوع الشكوى:</h5>
      <p className="text-break">{compDetails.Type === "Security"? "أمن" : "صيانة"}</p>

      <h5 className="mt-4">تاريخ ووقت الشكوى:</h5>
      <p>{compDetails.Date} </p>

      <h5 className="mt-4">حالة الشكوى:  </h5>
      
      <div className="Status">
        <form role="form" onSubmit={handleSubmit}>
          <label className="radio-inline" htmlFor="id1">
            تم حل المشكلة
          </label>
          <input
            className="Solved"
            type="radio"
            name="flexRadioDefault"
            id="id1"
            value="Solved"
            defaultChecked={radio1}
            onChange={(e) => setRadio(e.target.value)}
          />
          <br></br>
          <label className="radio-inline" htmlFor="id2">
            جاري التفقد
          </label>

          <input
            className="Pending"
            type="radio"
            name="flexRadioDefault"
            id="id2"
            value="Pending"
            defaultChecked={radio2}
            onChange={(e) => setRadio(e.target.value)}
          />
          <br></br>
          <input type="submit" className="mt-2" value="حفظ"></input>
        </form>
      </div>

      <div className="UserInfo">
        <h2 className="mt-4"> التواصل مع صاحب الشكوى: </h2>
        {userSnapshot.map((item, index) => {
          if (compDetails.Complainer === item.id) {
            return (
              <div key={index}>
                <h5 className="mt-3">الأسم :</h5>
                <p>{item.Fullname}</p>
                <h5 className="mt-2">رقم الهاتف :</h5>
                <p>{item.PhoneNumber}</p>
                <h5 className="mt-2"> محل السكن :</h5>
                <p>المبني: {item.Building}</p>
                <p>الشقة: {item.Apartment}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Complaints;
