import React, { useState } from "react";
import "./LR.css";
import { TbUserHexagon } from "react-icons/tb";
import { FaUserLock } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { useFormik } from "formik";
import { signupSchema } from "../schemas";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

const initialValues = {
  UserName: "",
  Password: "",
  Email: "",
};
const LoginRegister = () => {
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    dirty,
    isValid,
  } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values, actions) => {
      console.log(values);
      actions.resetForm();
    },
  });
  console.log(touched);

  const [action, setAction] = useState("");

  const registerLink = () => {
    setAction(" active");
  };
  const loginLink = () => {
    setAction(" ");
  };
  //const [color , setcolor] = useState(true)
  const [profile, setprofile] = useState(null);
  /*const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };*/
  const [error, setError] = useState(null);
    //chech Type
  const validateImage = (image) => {
    setError(null);

    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      const error = "Wrong file type";
      setError(error);
      return;
    }

    //check Image Size
    if(image.size> 5000000){
      const error = "file is too large to upload please select file under 5 MB";
      setError(error);
      return;
    }

    setError(null);
  };
  return (
    <div className={`wrapper${action}`}>
      <div className="form-box login">
        <form action="" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              name="UserName"
              placeholder="UserName"
              value={values.UserName}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <br />
            <TbUserHexagon className="icon" />{" "}
          </div>
          <div className="error_container">
            {errors.UserName && touched.UserName && (
              <p className="form_error">{errors.UserName}</p>
            )}
          </div>
          <div className="input-box">
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={values.Email}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <MdMarkEmailUnread className="icon" />
          </div>
          <div className="error_container">
            {errors.Email && touched.Email && (
              <p className="form_error">{errors.Email}</p>
            )}
          </div>
          <div className="input-box">
            <input
              type="Password"
              name="Password"
              placeholder="Password"
              value={values.Password}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <br />
            <FaUserLock className="icon" />
          </div>
          <div className="error_container">
            {errors.Password && touched.Password && (
              <p className="form_error">{errors.Password}</p>
            )}
          </div>
          <br />
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <a href="#">Forgot Password</a>
          </div>
          <div className="G-Login">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse?.credential);
                console.log(decoded);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <br />
          <div className="F-Login">
            {!profile ? (
              <LoginSocialFacebook
                appId="1008349444078943"
                onResolve={(response) => {
                  console.log(response);
                  setprofile(response.data);
                }}
                onReject={(error) => {
                  console.log(error);
                }}
              >
                <FacebookLoginButton />
              </LoginSocialFacebook>
            ) : (
              ""
            )}

            {profile ? (
              <div>
                <h1>{profile.name}</h1>
                <img src={profile.picture.data.url}  alt=""/>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="Image-Uploader">
            <input
              type="file"
              onChange={(event) => {
                validateImage(event.target.files[0]);
              }}
            />
            {error && <p>{error}</p>}
          </div>
          <br />
          <button type="submit" disabled={!isValid || !dirty}>
            Login
          </button>
          <div className="register-link">
            <p>
              don't have any account?
              <a href="#" onClick={registerLink}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="form-box register">
        <form action="" onSubmit={handleSubmit}>
          <h1>Registration</h1>
          <div className="input-box">
            <input
              type="text"
              name="UserName"
              placeholder="UserName"
              value={values.UserName}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <TbUserHexagon className="icon" />
          </div>

          <div className="error_container">
            {errors.UserName && touched.UserName && (
              <p className="form_error">{errors.UserName}</p>
            )}
          </div>
          <div className="input-box">
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={values.Email}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <MdMarkEmailUnread className="icon" />
          </div>
          <div className="error_container">
            {errors.Email && touched.Email && (
              <p className="form_error">{errors.Email}</p>
            )}
          </div>
          <div className="input-box">
            <input
              type="Password"
              name="Password"
              placeholder="Password"
              value={values.Password}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <br />
            <FaUserLock className="icon" />
          </div>
          <div className="error_container">
            {errors.Password && touched.Password && (
              <p className="form_error">{errors.Password}</p>
            )}
          </div>
          <br />
          <div className="remember-forgot">
            <label>
              <input type="checkbox" required />I agree to the Terms &
              Conditions
            </label>
          </div>

          <button type="submit" disabled={!isValid || !dirty}>
            Register
          </button>
          <div className="register-link">
            <p>
              Already have any account?
              <a href="#" onClick={loginLink}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
