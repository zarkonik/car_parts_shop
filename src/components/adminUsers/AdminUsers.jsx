import { useEffect, useState } from "react";
import "./adminUsers.css";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const AdminUsers = () => {
  const emptyUser = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  let dataEntries = [
    {
      name: "IME:",
      value: "firstname",
    },
    {
      name: "PREZIME:",
      value: "lastname",
    },
    {
      name: "E-MAIL ADRESA:",
      value: "email",
    },
  ];

  let dataEntriesAdd = [
    ...dataEntries,
    {
      name: "LOZINKA:",
      value: "password",
    },
  ];

  const [newUser, setNewUser] = useState(emptyUser);
  const [users, setUsers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleAdd = async () => {
    console.log(newUser);
    const { data } = await axios.post(
      "http://lakilab-001-site2.ctempurl.com/User/Register",
      newUser
    );
    const newCreatedUser = { ...newUser, id: data };
    setUsers([...users, newCreatedUser]);
    setNewUser(emptyUser);
    setIsAdding(false);
  };

  const cancelUpdate = () => {
    setIsUpdate(false);
    setNewUser(emptyUser);
  };

  const openUpdate = (user) => {
    setIsUpdate(true);
    setNewUser(user);
  };

  const handleUpdate = async () => {
    const updatedUser = { ...newUser, password: "" };
    await axios.put(
      "http://lakilab-001-site2.ctempurl.com/User/UpdateUser",
      updatedUser
    );
    await axios.put(
      "http://lakilab-001-site2.ctempurl.com/User/UpdateAdminEmail",
      updatedUser
    );
    setUsers(() =>
      users.map((user) => {
        if (user.id === newUser.id) return newUser;
        else return user;
      })
    );
    setIsUpdate(false);
    setNewUser(emptyUser);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://lakilab-001-site2.ctempurl.com/User/DeleteUser/${id}`
    );
    setUsers(users.filter((user) => user.id !== id));
  };

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(
        "http://lakilab-001-site2.ctempurl.com/User/GetUsers"
      );
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <>
      <div className="admin-users-header">
        <h3 className="admin-users-title">Users list</h3>
        <button
          onClick={(e) => setIsAdding(!isAdding)}
          className="admin-users-add-btn"
        >
          Forma za dodavanje
        </button>
      </div>
      {isAdding && (
        <div className="admin-users-add">
          {/* informations about user */}
          {dataEntriesAdd.map((entry, index) => {
            const { name, value } = entry;
            return (
              <div className="admin-users-input" key={index}>
                <h5 className="admin-users-input-title">{name}</h5>
                <input
                  name={value}
                  type={
                    value === "password" || value === "confirm"
                      ? "password"
                      : "text"
                  }
                  className="admin-users-input-box"
                  onChange={(e) =>
                    setNewUser({ ...newUser, [value]: e.target.value })
                  }
                />
              </div>
            );
          })}
          <button className="admin-users-add-btn" onClick={handleAdd}>
            Dodaj korisnika
          </button>
        </div>
      )}
      <div className="admin-users-main-list">
        <div className="admin-users-main-header">
          <div className="admin-users-main-item">ID</div>
          <div className="admin-users-main-item">Ime</div>
          <div className="admin-users-main-item">Prezime</div>
          <div className="admin-users-main-item">E-mail</div>
        </div>
        {users.length !== 0 &&
          users.map((user) => {
            const { id, firstname, lastname, email } = user;
            return (
              <div className="admin-users-main-row" key={id}>
                <div className="admin-users-main-item">{id}</div>
                <div className="admin-users-main-item">{firstname}</div>
                <div className="admin-users-main-item">{lastname}</div>
                <div className="admin-users-main-item">{email}</div>
                <div className="admin-users-main-item-options">
                  <CreateIcon
                    onClick={(e) =>
                      openUpdate({
                        id,
                        firstname,
                        lastname,
                        email,
                      })
                    }
                    style={{ color: "#182f3f", cursor: "pointer" }}
                  />
                  <DeleteIcon
                    onClick={(e) => handleDelete(id)}
                    style={{ color: "#182f3f", cursor: "pointer" }}
                  />
                </div>
              </div>
            );
          })}
      </div>
      {isUpdate && (
        <div className="admin-users-update">
          <div className="admin-users-update-wrapper">
            <div className="admin-users-update-cancel" onClick={cancelUpdate}>
              X
            </div>
            {dataEntries.map((entry, index) => {
              const { name, value } = entry;
              return (
                <div className="admin-users-update-input" key={index}>
                  <h5 className="admin-users-input-title">{name}</h5>
                  <input
                    value={newUser[value]}
                    name={value}
                    type={
                      value === "password" || value === "confirm"
                        ? "password"
                        : "text"
                    }
                    className="admin-users-update-input-box"
                    onChange={(e) =>
                      setNewUser({ ...newUser, [value]: e.target.value })
                    }
                  />
                </div>
              );
            })}
            <button onClick={handleUpdate} className="admin-users-add-btn">
              Azuriraj
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsers;
