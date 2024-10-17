import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import app from "./firebase";
import { useAuth } from "./context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"
import { Navigate } from 'react-router-dom';

function Login() {
  let [email, setEmail] = useState("");
  let [pass1, setPass1] = useState("");
  let [button, setButton] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton(true);
    const validationErrors = {};
    const authErrors = {};
    if (email == "") {
      validationErrors.email = "برجاء ادخال البريد الالكتروني";
    }
    if (pass1 == "") {
      validationErrors.pass1 = "برجاء ادخال كلمة المرور";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (!/\S+@\S+\.\S+/.test(email)) {
          await login(email+"@g.co", pass1);
        }
        else{
          await login(email, pass1);
        }
        
        if((email === "admin@g.co" )|| (email === "Sherif-badr")){
          window.location.href = "/admin";
        }
        else if(email === "ashraf@g.co"){
          window.location.href = "/maintenance";
        }
        else if(email === "security@g.co"){
          window.location.href = "/security";
        }
        else{
          window.location.href = "/user";
        }
        
      } catch (error) {
        console.log(error.message);
        if (error.message === "Firebase: Error (auth/invalid-credential).") {
          authErrors.email = "البريد الإلكتروني/أسم المستخدم أو كلمة المرور غير صحيحة";
          authErrors.pass1 = "البريد الإلكتروني/أسم المستخدم  أو كلمة المرور غير صحيحة";
        }
        else{
          authErrors.email = "محاولة فاشلة : أعد تسجيل الدخول في وقت لاحق";
          authErrors.pass1 = "محاولة فاشلة : أعد تسجيل الدخول في وقت لاحق";
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
            <h3 className="Auth-form-title">تسجيل الدخول لإدارة الأمن والصيانة لكمبوند ليلة</h3>

            <div className="form-group mt-3">
              <label > البريد الإلكتروني أو أسم المستخدم</label>
              <input
                type="text"
                className="form-control mt-1"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="RegisterError">{errors.email}</span>
              )}
            </div>
            {/*Email*/}

            <div className="form-group mt-3">
              <label>كلمة المرور</label>
              <input
                type="password"
                className="form-control mt-1"
                onChange={(e) => setPass1(e.target.value)}
              />
              {errors.pass1 && (
                <span className="RegisterError">{errors.pass1}</span>
              )}
            </div>
            {/*Password*/}

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="LoginButton btn btn-primary" disabled={button}>
                دخول
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              ليس لديك حساب؟ <Link to="/register">إنشاء حساب جديد</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
