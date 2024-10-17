import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

const fetchComplaints = async () => {
  const querySnapshot = await getDocs(collection(db, "Complaints"));

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

function UserComplaints() {
  const { auth } = useAuth();
  let [counter, setCounter] = useState(1);
  let [snapshot1, setSnapshot1] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchComplaints();
      setSnapshot1(data);
    }
    fetchData();
  }, []);

  return (
    <div className="ComplaintsTable">
      <h3>الشكاوي المرسلة</h3>
      <span>الشكاوي الخاصة بكم التي تم ارسالها</span>
      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">عنوان الشكوى</th>
            <th scope="col">تاريخ ووقت الشكوى</th>  
            <th scope="col">حالة الشكوى</th>
          </tr>
        </thead>
        <tbody>
          {snapshot1.map((item, index) => {
            if (item.Complainer === auth.currentUser.uid) {
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
                  
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserComplaints;
