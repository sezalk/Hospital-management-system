import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Handling login with email:", email, "and password:", password);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password, confirmPassword, role: "Patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("API response:", response);

      toast.success(response.data.message);
      setIsAuthenticated(true);
      console.log("isAuthenticated set to true");
      navigateTo("/");
      console.log("Navigating to '/'");
      
      // Reset form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.log("Error during login:", error);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    console.log("User is authenticated, redirecting to '/'");
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat culpa
        voluptas expedita itaque ex, totam ad quod error?
      </p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>
          <p style={{ marginBottom: 0 }}>Not Registered?</p>
          <Link to={"/register"} style={{ textDecoration: "none", color: "#271776ca" }}>
            Register Now
          </Link>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
