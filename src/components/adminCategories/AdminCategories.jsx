import { useEffect, useState } from "react";
import "./adminCategories.css";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const AdminCategories = () => {
  const emptyCategory = {
    name: "",
    picture: "",
    details: "",
    type: {},
  };

  let dataEntries = [
    {
      name: "IME:",
      value: "name",
    },
    {
      name: "SLIKA:",
      value: "picture",
    },
    {
      name: "OPIS:",
      value: "details",
    },
  ];

  const [newCategory, setNewCategory] = useState(emptyCategory);
  const [categories, setCategories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [types, setTypes] = useState([]);

  const handleAdd = async () => {
    const { data } = await axios.post(
      " http://lakilab-001-site2.ctempurl.com/Category/InputCategory",
      newCategory
    );
    const { dataType } = await axios.post(
      ` http://lakilab-001-site2.ctempurl.com/CategoryBelongType/InputType/${newCategory.type.id}/${data}`
    );

    const newCreatedCategory = { ...newCategory, id: data };
    setCategories([...categories, newCreatedCategory]);
    setNewCategory(emptyCategory);
    setIsAdding(false);
  };

  const handleChangeType = (e) => {
    if (e.target.value === "") return;
    const selectedId = parseInt(e.target.value);
    const selectedType = types.find((type) => selectedId === type.id);
    setNewCategory({ ...newCategory, type: selectedType });
  };

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
      setNewCategory({ ...newCategory, picture: data });
    });
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

  useEffect(() => {
    const getTypes = async () => {
      const { data } = await axios.get(
        "http://lakilab-001-site2.ctempurl.com/GetTypes"
      );
      setTypes(data);
    };
    const getCategories = async () => {
      const { data } = await axios.get(
        "http://lakilab-001-site2.ctempurl.com/Category/GetCategories"
      );
      setCategories(data);
    };
    getCategories();
    getTypes();
  }, []);

  console.log(categories);

  return (
    <>
      <div className="admin-users-header">
        <h3 className="admin-users-title">Categories list</h3>
        <button
          onClick={(e) => setIsAdding(!isAdding)}
          className="admin-users-add-btn"
        >
          Forma za dodavanje
        </button>
      </div>
      {isAdding && (
        <div className="admin-users-add">
          {types.length !== 0 && (
            <div className="admin-users-input">
              <h5 className="admin-users-input-title">Tip:</h5>
              <select
                className="admin-users-input-box"
                onChange={handleChangeType}
              >
                <option value="tip"></option>
                {types.map((type) => {
                  const { id, name } = type;
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
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
                    setNewCategory(
                      value === "picture"
                        ? handleUploadFile(e)
                        : { ...newCategory, [value]: e.target.value }
                    )
                  }
                />
              </div>
            );
          })}
          <button className="admin-users-add-btn" onClick={handleAdd}>
            Dodaj Kategoriju
          </button>
        </div>
      )}
      <div className="admin-users-main-list">
        <div className="admin-users-main-header">
          <div className="admin-users-main-item">ID</div>
          <div className="admin-users-main-item">Ime</div>
          {/*<div className="admin-users-main-item">Slika</div>*/}
          <div className="admin-users-main-item">Detalji</div>
          <div className="admin-users-main-item">Tip</div>
        </div>
        {categories.length !== 0 &&
          categories.map((user) => {
            const { id, name, details, picture, type } = user;
            return (
              <div className="admin-users-main-row" key={id}>
                <div className="admin-users-main-item">{id}</div>
                <div className="admin-users-main-item">{name}</div>
                <div className="admin-users-main-item">{details}</div>
                <div className="admin-users-main-item">{type.name}</div>
                {/*<div className="admin-users-main-item">{picture}</div>*/}
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
                    value={newCategory[value]}
                    name={value}
                    type={
                      value === "password" || value === "confirm"
                        ? "password"
                        : "text"
                    }
                    className="admin-users-update-input-box"
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
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

export default AdminCategories;
