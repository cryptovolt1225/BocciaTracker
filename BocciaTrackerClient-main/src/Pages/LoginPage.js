import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Overview.scss";

const LoginPage = (props) => {
  const [formInput, setLoginFormInput] = useState({
    email: "",
    password: "",
  });
  const [coach, setCoach] = useState();
  const navigate = useNavigate();

  const login = async () => {
    if( formInput.email == "" )
    {
      alert("Please input email address!");
      return;
    }else if( formInput.password == "" )
    {
      alert("Please input password!");
      return;
    }
    try {
      const loginResult = await axios.post(
        `http://localhost:5000/api/users/login`,
        formInput
      );
      console.log("loginResult.data.user", loginResult.data.user);
      setCoach(loginResult?.data.user);
      localStorage.setItem("coach", JSON.stringify(loginResult?.data.user));


      // localStorage.setItem("coach", loginResult?.data.user);

      // console.log("coach logged in" , coach);
      // console.log("loginResult" , loginResult)
      // console.log("form input" , formInput)

      if (loginResult.status === 200) {
        localStorage.setItem("login", "true");
        navigate("/overview");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("coach", coach);

  return (
    <div className="over-view-page">
      <div className="page-header">
        <h1 className="page-title">Log In </h1>
      </div>

      <div className="over-view-data">

      <div className="col-lg-5 col-md-7 mx-auto mb-30">
        <div className="card z-index-0">
          <div className="card-header text-center gray-bg pt-4">
            <h5>Login Now</h5>
          </div>

          <div className="card-body">
            <form action="post">
              <div className="mb-3 mt-10p"></div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  aria-label="Email"
                  onChange={(e) =>
                    setLoginFormInput({ ...formInput, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) =>
                    setLoginFormInput({
                      ...formInput,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => login()}
                >
                  Login
                </button>
              </div>
              <p className="text-sm mt-3 mb-0">
                Create New account?{" "}
                <NavLink to="/signup" className="text-dark font-weight-bolder">
                  Sign up
                </NavLink>
              </p>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
