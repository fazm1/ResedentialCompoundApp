import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";


function UserSettings() {
  let [name, setName] = useState("");
  let [phoneNum, setPhoneNum] = useState("");
  let [email, setEmail] = useState("");
  let [building, setBuilding] = useState("");
  let [apt, setApt] = useState("");
  let [counter, setCounter] = useState(0);
  const { auth } = useAuth();

  let [userDetails, setUserDetails] = useState(null);

  const editUserData = async () => {
    
      await setDoc(doc(db, `Users/${auth.currentUser.uid}`), {
        Fullname: name,
        PhoneNumber: phoneNum,
        Email: auth.currentUser.email,
        Building: building,
        Apartment: apt,
      });
      alert("تم تعديل البيانات بنجاح");
    
  };
  
  const fetchUserData = async () => {
    const dbRef = doc(db, "Users", auth.currentUser.uid);
    const docSnap = await getDoc(dbRef);
    if (docSnap.exists()) {
      setUserDetails(docSnap.data());

      if (userDetails != null) {
        setName(userDetails.Fullname);
        setPhoneNum(userDetails.PhoneNumber);
        setBuilding(userDetails.Building);
        setApt(userDetails.Apartment);
      }
    } else {
      
    }
    setCounter(1);
  };

  useEffect(() => {
    fetchUserData();
    return () => {};
  }, [counter]);

  return (
    <div className="Profile">
      <div className="SettingsTitle mt-4">
        <h3>اعدادات المستخدم:</h3>
      </div>
      <div className="form-group mt-3">
        <label>تعديل الاسم</label>
        <input
          type="text"
          className="form-control mt-1"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
       
      </div>

      <div className="form-group mt-5">
        <label>تعديل رقم الهاتف</label>
        <input
          type="number"
          className="form-control mt-1"
          onChange={(e) => setPhoneNum(e.target.value)}
          value={phoneNum}
        />
      
      </div>

      

    

      <div className="form-group mt-5">
        <label> المبنى: </label>
        <select
          name="Buildings"
          id="buildings"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
        >
          <option value="C1">C1</option>
          <option value="C2">C2</option>
          <option value="C3">C3</option>
          <option value="4A">4A</option>
          <option value="4B">4B</option>
          <option value="5A">5A</option>
          <option value="5B">5B</option>
          <option value="6A">6A</option>
          <option value="6B">6B</option>
          <option value="7A">7A</option>
          <option value="7B">7B</option>
          <option value="8A">8A</option>
          <option value="9A">9A</option>
          <option value="10A">10A</option>
          <option value="11A">11A</option>
          <option value="12A">12A</option>
          <option value="13A">13A</option>
          <option value="15A">15A</option>
          <option value="16A">16A</option>
          <option value="16B">16B</option>
        </select>
        <br></br>
      </div>
      <div className="form-group mt-2">
        <label> الشقة: </label>
        <select
          name="Apts"
          id="apts"
          value={apt}
          onChange={(e) => setApt(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="31">31</option>
          <option value="32">32</option>
          <option value="33">33</option>
          <option value="34">34</option>
          <option value="41">41</option>
          <option value="42">42</option>
          <option value="43">43</option>
          <option value="44">44</option>
        </select>
        <br></br>
      </div>
      <div className="form-group mt-2">
        <button className="btn btn-primary mt-3" onClick={editUserData}>تعديل </button>
      </div>
    </div>
  );
}

export default UserSettings;
