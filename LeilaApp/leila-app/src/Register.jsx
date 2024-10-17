import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function Register() {
  let [name, setName] = useState("");
  let [phoneNum, setPhoneNum] = useState("");
  let [email, setEmail] = useState("");
  let [pass1, setPass1] = useState("");
  let [building, setBuilding] = useState("");
  let [apt, setApt] = useState("");
  let [button, setButton] = useState(false);
  const [errors, setErrors] = useState({});
  const { signup, auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton(true);
    const validationErrors = {};
    const authErrors = {};

    if (name == "") {
      validationErrors.name = "برجاء ادخال الاسم";
    }
    if (phoneNum == "" || (phoneNum.length != 11 ) ) {
      validationErrors.phoneNum = "برجاء ادخال رقم صحيح";
    }
    if (email == "") {
      validationErrors.email = "برجاء ادخال البريد الالكتروني";
    } 

    if (pass1 == "") {
      validationErrors.pass1 = "برجاء ادخال كلمة المرور";
    } else if (pass1.length < 6) {
      validationErrors.pass1 = "كلمة المرور اقل من 6 احرف";
    }

    if (building == "") {
      validationErrors.building = "برجاء اختيار المبنى";
    }
    if (apt == "") {
      validationErrors.apt = "برجاء اختيار الشقة";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (!/\S+@\S+\.\S+/.test(email)) {
          await signup(email+"@g.co", pass1);
        }
        else{
          await signup(email, pass1);
        }
        console.log(auth.currentUser.uid);
        await setDoc(doc(db, "Users", auth.currentUser.uid), {
          Email: auth.currentUser.email,
          Fullname: name,
          PhoneNumber: phoneNum,
          Building: building,
          Apartment: apt,
        });
        alert("تم انشاء الحساب بنجاح");
        window.location.href = "/";
      } catch (error) {
        console.log(error.message);
        {
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            authErrors.email = "البريد الإلكتروني/أسم المستخدم  تم استخدامه مسبقاً";
          }
        }
        setErrors(authErrors);
      }
      
    }
    setButton(false);
  };
  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">إنشاء حساب جديد</h3>
            <div className="form-group mt-3">
              <label>الأسم</label>
              <input
                type="text"
                className="form-control mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <span className="RegisterError">{errors.name}</span>
              )}
            </div>
            <div className="form-group mt-3">
              <label> رقم الهاتف</label>
              <input
                type="number"
                className="form-control mt-1"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
              />
              {errors.phoneNum && (
                <span className="RegisterError">{errors.phoneNum}</span>
              )}
            </div>
            <div className="form-group mt-3">
              <label> البريد الإلكتروني أو أسم المستخدم</label>
              <input
                type="text"
                className="form-control mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="RegisterError">{errors.email}</span>
              )}
            </div>
            <div className="form-group mt-3">
              <label>كلمة المرور</label>
              <input
                type="password"
                className="form-control mt-1"
                value={pass1}
                onChange={(e) => setPass1(e.target.value)}
              />
              {errors.pass1 && (
                <span className="RegisterError">{errors.pass1}</span>
              )}
            </div>
            <label className="mt-3">محل الإقامة:</label>
            <div className="form-group mt-2">
              <label> المبنى: </label>
              <select
                name="Buildings"
                id="buildings"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
              >
                <option value=""> </option>
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
              {errors.building && (
                <span className="RegisterError">{errors.building}</span>
              )}
            </div>
            <div className="form-group mt-2">
              <label> الشقة: </label>
              <select
                name="Apts"
                id="apts"
                value={apt}
                onChange={(e) => setApt(e.target.value)}
              >
                <option value=""> </option>
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
              {errors.apt && (
                <span className="RegisterError">{errors.apt}</span>
              )}
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="LoginButton btn btn-primary" disabled={button}>
                إنشاء حساب جديد
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              لديك حساب؟ قم ب<Link to="/">تسجيل الدخول</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
