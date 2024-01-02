import { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const AdminComponent = ({ emptyObject, dataEntries, urls, name }) => {
  const [state, setState] = useState([]);
  const [newObject, setNewObject] = useState(emptyObject);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleAdd = async () => {
    const { data } = await axios.post(urls[0], newObject);
    const newCreatedObject = { id: data, ...newObject };
    setState([...state, newCreatedObject]);
    setNewObject(emptyObject);
    setIsAdding(false);
  };

  /*const cancelUpdate = () => {
    setIsUpdate(false);
    setNewUser(emptyUser);
  };*/

  /*const openUpdate = (user) => {
    setIsUpdate(true);
    setNewUser(user);
  };*/

  /*const handleUpdate = async () => {
    const updatedUser = { ...newUser, password: "" };
    await axios.put("https://localhost:7236/User/UpdateUser", updatedUser);
    await axios.put(
      "https://localhost:7236/User/UpdateAdminEmail",
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
  };*/

  /*const handleDelete = async (id) => {
    await axios.delete(`https://localhost:7236/User/DeleteUser/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };*/

  const readFileDataAsBase64 = (e) => {
    const file = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleUploadFile = (e) => {
    readFileDataAsBase64(e).then((data) => {
      console.log(data);
      setNewObject({ ...newObject, picture: data });
    });
  };

  useEffect(() => {
    const getMethod = async () => {
      const { data } = await axios.get(urls[1]);
      setState(data);
    };
    getMethod();
  }, []);

  //console.log(Object.entries(emptyObject));

  return (
    <>
      <div className="admin-users-header">
        <h3 className="admin-users-title">{name} List</h3>
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
          {dataEntries.map((entry, index) => {
            const { name, value } = entry;
            return (
              <div className="admin-users-input" key={index}>
                <h5 className="admin-users-input-title">{name}</h5>
                <input
                  name={value}
                  type={value === "picture" ? "file" : "text"}
                  className="admin-users-input-box"
                  onChange={(e) =>
                    value === "picture"
                      ? handleUploadFile(e)
                      : setNewObject({
                          ...newObject,
                          [value]: e.target.value,
                        })
                  }
                />
              </div>
            );
          })}
          <button className="admin-users-add-btn" onClick={handleAdd}>
            Dodaj
          </button>
        </div>
      )}
      <div className="admin-users-main-list">
        <div className="admin-users-main-header">
          <div className="admin-users-main-item">ID</div>
          {dataEntries.map((de, i) => {
            return (
              <div className="admin-users-main-item" key={i}>
                {de.name}
              </div>
            );
          })}
        </div>
        {state.length !== 0 &&
          state.map((obj) => {
            return (
              <div className="admin-users-main-row" key={obj.id}>
                {Object.entries(obj).map((entry) => {
                  console.log(entry[0]);
                  console.log(entry[0] !== "picture");
                  return entry[0] !== "picture" ? (
                    <div className="admin-users-main-item">{entry[1]}</div>
                  ) : (
                    <div className="admin-users-main-item">
                      <img
                        src={entry[1]}
                        style={{
                          width: "50px",
                          height: "50px",
                          alignSelf: "center",
                        }}
                      />
                    </div>
                  );
                })}
                <div className="admin-users-main-item-options">
                  <CreateIcon
                    /*onClick={(e) =>
                      openUpdate({
                        id,
                        name,
                        details,
                        picture,
                      })
                    }*/
                    style={{ color: "#182f3f", cursor: "pointer" }}
                  />
                  <DeleteIcon
                    /*onClick={(e) => handleDelete(id)}*/
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
            <div
              className="admin-users-update-cancel" /*onClick={cancelUpdate}*/
            >
              X
            </div>
            {dataEntries.map((entry, index) => {
              const { name, value } = entry;
              return (
                <div className="admin-users-update-input" key={index}>
                  <h5 className="admin-users-input-title">{name}</h5>
                  <input
                    value={newObject[value]}
                    name={value}
                    type={
                      value === "password" || value === "confirm"
                        ? "password"
                        : "text"
                    }
                    className="admin-users-update-input-box"
                    onChange={(e) =>
                      value === "picture"
                        ? handleUploadFile(e)
                        : setNewObject({
                            ...newObject,
                            [value]: e.target.value,
                          })
                    }
                  />
                </div>
              );
            })}
            <button /*onClick={handleUpdate}*/ className="admin-users-add-btn">
              Azuriraj
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminComponent;
