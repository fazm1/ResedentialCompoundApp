import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "Users"));

  const Udata = [];
  querySnapshot.forEach((doc) => {
    Udata.push({ id: doc.id, ...doc.data() });
  });
  return Udata;
};

const fetchComplaints = async () => {
  const querySnapshot = await getDocs(collection(db, "Complaints"));

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

function MaintenanceComplaints() {
  const { auth } = useAuth();
  let [snapshot1, setSnapshot1] = useState([]);
  let [userSnapshot, setUserSnapshot] = useState([]);
  let [counter, setCounter] = useState(1);

  console.log(userSnapshot);
  console.log(snapshot1);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchComplaints();
      const name = await fetchUsers();
      setSnapshot1(data);
      setUserSnapshot(name);
    }
    fetchData();
  }, []);

  return (
    <div className="ComplaintsTable">
      <h3>سجل الشكاوي</h3>
      <span>الشكاوي المتبقية</span>
      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">عنوان الشكوى</th>
            <th scope="col">تاريخ ووقت الشكوى</th>
            <th scope="col">حالة الشكوى</th>
            <th scope="col">صاحب الشكوى</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {snapshot1.map((item, index) => {
            if (item.Type === "Maintenance") {
              return (
                <tr key={index}>
                  <th scope="row">{counter++}</th>
                  <td className="text-break">{item.Title}</td>
                  <td className="text-break ">{item.Date}</td>
                  <td
                    className="text-break"
                    style={
                      item.Status === "تم حل المشكلة"
                        ? { color: "green" }
                        : item.Status === "جاري التفقد"
                        ? { color: "orange" }
                        : {}
                    }
                  >
                    {item.Status}
                  </td>
                  <td className="text-break">
                    {userSnapshot.map((item2) => {
                      if (item.Complainer === item2.id) {
                        return item2.Fullname;
                      }
                    })}
                  </td>
                  <td className="text-break">
                    <Link
                      to={"/maintenance/complaints/" + item.id}
                      className="btn btn-success btn-sm"
                    >
                      تفقد
                    </Link>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MaintenanceComplaints;
