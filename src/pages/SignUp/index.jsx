//import axios from "axios";
import { useEffect, useState } from "react";
import { signUp } from "./api";
import { Input } from "./components/Input";

export function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();


  useEffect(() => {
    setErrors(function(lastErrors){
      return {
        ...lastErrors,
        username: undefined
      }
    });
  }, [username])

  const onSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage();
    setGeneralError();
    setApiProgress(true);
    try {
      const response = await signUp({
        username,
        email,
        password,
      })
      setSuccessMessage(response.data.message);
    }catch (axiosError) {
      if (axiosError.response?.data && axiosError.response.data.status === 400) {
        setErrors(axiosError.response.data.validationErrors);
      }else {
        setGeneralError('Unexpected error occured. Please try again.');
      }
    }
     finally {
      setApiProgress(false);
    }
    
    /*
    axios
      .post("/api/v1/users", {
        username,
        email,
        password
      })
      .then((response) => {
        setSuccessMessage(response.data.message);
      })
      .finally(() => setApiProgress(false));
      */
  };

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>Sign Up</h1>
          </div>
          <div className="card-body">
            <Input id="username" label="Username" error={errors.username} onChange={(event) => setUsername(event.target.value)}/>
            <Input id="email" label="E-mail" error={errors.email} onChange={(event) => setEmail(event.target.value)}/>
            
            {/* <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                id="username"
                onChange={(event) => setUsername(event.target.value)}
                className={errors.username ? "form-control is-invalid" : "form-control"}
              />
              <div className="invalid-feedback">
                {errors.username}
              </div>
            </div> */}
            {/* <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                className="form-control"
              />
            </div> */}
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                onChange={(event) => setPassword(event.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordRepeat" className="form-label">
                Password Repeat
              </label>
              <input
                id="passwordRepeat"
                type="password"
                onChange={(event) => setPasswordRepeat(event.target.value)}
                className="form-control"
              />
            </div>
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              {generalError && (
                <div className="alert alert-danger" role="alert">
                  {generalError}
                </div>
             )}
            <div className="text-center">
              <button
                className="btn btn-primary"
                disabled={
                  apiProgress || !password || password !== passwordRepeat
                }
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                )}
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
