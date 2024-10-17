import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function UserSendComplaint() {
  const { auth } = useAuth();
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [type, setType] = useState("");
  let [button, setButton] = useState(false);
  const [errors, setErrors] = useState({});

  const submitComplaint = async () => {
    setButton(true);
    const current = new Date();
    let hours = current.getHours();
    let minutes = current.getMinutes();
    let newformat = hours >= 12 ? 'مساءً' : 'صباحاً';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const validationErrors = {};
    if (title == "") {
      validationErrors.title = "برجاء ادخال عنوان الشكوى";
    } 
    if (body == "") {
      validationErrors.body = "برجاء ادخال نص الشكوى";
    }
    if (type == ""){
      validationErrors.type = "برجاء اختيار نوع الشكوى";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      await setDoc(doc(collection(db, "Complaints/")), {
        Complainer: auth.currentUser.uid,
        Title: title,
        Body: body,
        Date: `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()} - ${hours}:${minutes} ${newformat}`,
        Status: "لم يتم تفقدها بعد",
        Type: type
      });
      alert("تم ارسال الشكوى بنجاح ");
    }
    setButton(false);
  };
  return (
    <div className="Complaints mt-4">
      <h3>ارسال شكوى:</h3>
      <span>قم بادخال الشكوى الخاصة بكم في الكومبوند ليتم ارسالها للمسؤلين</span>
      <div className="form-group mt-4">
        <label>عنوان الشكوى:</label>
        <input
          type="text"
          className="form-control mt-1"
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="RegisterError">{errors.title}</span>}
      </div>
      <div className="form-group mt-1">
        <label> نص الشكوى:</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="5"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
         {errors.body && <span className="RegisterError">{errors.body}</span>}
      </div>
      <div className="form-group mt-1">
              <label> نوع الشكوى: </label>
              <br></br>
              <select
              className="mt-2"
                name="Buildings"
                id="buildings"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value=""> </option>
                <option value="Security">أمن</option>
                <option value="Maintenance">صيانة</option>
                
              </select>
              <br></br>
              {errors.type && <span className="RegisterError">{errors.type}</span>}
            </div>
      <div className="d-grid gap-2 mt-4">
        <button
          className="SubmitComplaint btn btn-primary"
          onClick={submitComplaint}
          disabled={button}
        >
          ارسال الشكوى
        </button>
      </div>
    </div>
  );
}

export default UserSendComplaint;
