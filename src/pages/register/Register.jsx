import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  let dataEntries = [
    {
      name: "IME:",
      value: "firstName",
    },
    {
      name: "PREZIME:",
      value: "lastName",
    },
    {
      name: "E-MAIL ADRESA:",
      value: "email",
    },
    {
      name: "LOZINKA:",
      value: "password",
    },
    {
      name: "POTVRDITE LOZINKU:",
      value: "confirm",
    },
  ];

  let navigate = useNavigate();

  const handleRegister = async () => {
    const confirmPassword = document.getElementsByName("confirm")[0].value;
    if (confirmPassword === newUser.password) {
      await axios.post(
        "http://lakilab-001-site2.ctempurl.com/User/Register",
        newUser
      );
      return navigate("/login");
    }
  };

  return (
    <div className="register">
      <div className="register-wrapper">
        <h3>UNESITE PODATKE VASEG NALOGA</h3>
        <div className="register-form">
          {/* informations about user */}
          {dataEntries.map((entry, index) => {
            const { name, value } = entry;
            return (
              <div className="register-input" key={index}>
                <h5 className="register-input-title">{name}</h5>
                <input
                  name={value}
                  type={
                    value === "password" || value === "confirm"
                      ? "password"
                      : "text"
                  }
                  className="register-input-box"
                  onChange={(e) =>
                    setNewUser({ ...newUser, [value]: e.target.value })
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="register-terms">
          <input type="checkbox" />
          <span>Prihvatam uslove zastite privatnosti</span>
        </div>
        <div className="login-link">
          Vec imate nalog?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Prijavite se
          </Link>
        </div>
        <button className="register-btn" onClick={handleRegister}>
          Registrujte se
        </button>
      </div>
    </div>
  );
};

export default Register;
