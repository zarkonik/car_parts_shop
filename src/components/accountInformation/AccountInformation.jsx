import { useState } from "react";
import "./accountInformation.css";

const AccountInformation = ({ user }) => {
  const [newUser, setNewUser] = useState(user);

  //console.log(user);

  const handleUpdate = async () => {
    console.log(newUser);
  };

  return (
    <div className="account-main">
      <h3 className="account-main-title">Informacije o korisniku</h3>
      <hr className="account-separator" />
      <h3 className="account-information-title">VASI LICNI PODACI</h3>
      <div className="account-information-input-container">
        <span>IME:</span>
        <input
          defaultValue={user.firstname}
          className="account-information-input"
          onChange={(e) =>
            setNewUser({ ...newUser, firstname: e.target.value })
          }
        />
      </div>
      <div className="account-information-input-container">
        <span>PREZIME:</span>
        <input
          defaultValue={user.lastname}
          className="account-information-input"
          onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
        />
      </div>
      <div className="account-information-input-container">
        <span>E-MAIL ADRESA:</span>
        <input
          defaultValue={user.email}
          className="account-information-input"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </div>
      <hr className="account-information-separator" />
      <button className="account-btn" onClick={handleUpdate}>
        SACUVAJTE
      </button>
    </div>
  );
};

export default AccountInformation;
