import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formInput, setSignupFormInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signup = async () => {
    if( formInput.username == "" )
    {
      alert("Please input username!");
      return;
    }else if( formInput.email == "" )
    {
      alert("Please input email address!");
      return;
    }else if( formInput.password == "" )
    {
      alert("Please input password!");
    }
    try {
      const signupResult = await axios.post(`http://localhost:5000/api/users/register`, formInput);
      console.log(signupResult, "result")
      if (signupResult.data !== null) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="col-lg-5 col-md-7 mx-auto mb-30">
      <div className="card z-index-0">
        <div className="card-header text-center gray-bg pt-4">
          <h5>Sign Up</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Name" aria-label="Name" onChange={(e) =>
                setSignupFormInput({ ...formInput, username: e.target.value })
              } />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" aria-label="Email" onChange={(e) =>
                setSignupFormInput({ ...formInput, email: e.target.value })
              } />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" onChange={(e) =>
                setSignupFormInput({ ...formInput, password: e.target.value })
              } />
            </div>
            <div className="text-center">
              <button type="button" className="btn bg-gradient-dark w-100 my-4 mb-2" onClick={() => signup()}>Sign up</button>
            </div>
            <p className="text-sm mt-3 mb-0">Already have an account? <NavLink to="/login" className="text-dark font-weight-bolder">Log in</NavLink></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;