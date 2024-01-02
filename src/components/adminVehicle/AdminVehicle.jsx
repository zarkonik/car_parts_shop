import { useEffect, useRef, useState } from "react";
import "./adminVehicle.css";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const AdminVehicle = () => {
  const emptyVehicle = {
    brand: "",
    model: "",
    series: "",
    picture: "",
    pictureModel: "",
    dateOf: new Date(),
    dateUntil: new Date(),
  };

  let dataEntries = [
    {
      name: "BREND:",
      value: "brand",
    },
    {
      name: "MODEL:",
      value: "model",
    },
    {
      name: "SERIJA:",
      value: "series",
    },
  ];

  const [newVehicle, setNewVehicle] = useState(emptyVehicle);
  const [vehicles, setVehicles] = useState([]);
  const [engines, setEngines] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const engineRef = useRef();

  const handleAdd = async () => {
    const { data } = await axios.post(
      "http://lakilab-001-site2.ctempurl.com/Vehicle/InputVehicle",
      newVehicle
    );
    const engineId = engineRef.current.value;
    await axios.post(
      `http://lakilab-001-site2.ctempurl.com/VehicleContainEngine/InputEngine/${data}/${engineId}`
    );
    const newCreatedVehicle = { ...newVehicle, id: data };
    setVehicles([...vehicles, newCreatedVehicle]);
    setNewVehicle(emptyVehicle);
    setIsAdding(false);
  };

  const cancelUpdate = () => {
    setIsUpdate(false);
    setNewVehicle(emptyVehicle);
  };

  const openUpdate = (user) => {
    setIsUpdate(true);
    setNewVehicle(user);
  };

  const handleUpdate = async () => {
    const updatedUser = { ...newVehicle, password: "" };
    await axios.put(
      "http://lakilab-001-site2.ctempurl.com/User/UpdateUser",
      updatedUser
    );
    await axios.put(
      "http://lakilab-001-site2.ctempurl.com/User/UpdateAdminEmail",
      updatedUser
    );
    setVehicles(() =>
      vehicles.map((user) => {
        if (user.id === newVehicle.id) return newVehicle;
        else return user;
      })
    );
    setIsUpdate(false);
    setNewVehicle(emptyVehicle);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `http://lakilab-001-site2.ctempurl.com/User/DeleteUser/${id}`
    );
    setVehicles(vehicles.filter((user) => user.id !== id));
  };

  useEffect(() => {
    const getVehicles = async () => {
      const { data } = await axios.get(
        "http://lakilab-001-site2.ctempurl.com/Vehicle/GetVehicles"
      );
      setVehicles(data);
    };
    const getEngines = async () => {
      const { data } = await axios.get(
        "http://lakilab-001-site2.ctempurl.com/Engine/GetEngines"
      );
      setEngines(data);
    };
    getVehicles();
    getEngines();
  }, []);

  return (
    <>
      <div className="admin-users-header">
        <h3 className="admin-users-title">Vehicles list</h3>
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
                  type={
                    value === "password" || value === "confirm"
                      ? "password"
                      : "text"
                  }
                  className="admin-users-input-box"
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, [value]: e.target.value })
                  }
                />
              </div>
            );
          })}
          <select className="admin-users-add-select-box" ref={engineRef}>
            {engines.length !== 0 &&
              engines.map((engine, index) => {
                return (
                  <option
                    className="admin-users-add-select-box-item"
                    key={index}
                    value={engine.id}
                  >
                    {`${engine?.name} ${engine.volume} ${
                      engine.power
                    }KW ${Math.round(engine.power * 1.34102)}HP`}
                  </option>
                );
              })}
          </select>
          <button className="admin-users-add-btn" onClick={handleAdd}>
            Dodaj vozilo
          </button>
        </div>
      )}
      <div className="admin-users-main-list">
        <div className="admin-users-main-header">
          <div className="admin-users-main-item">ID</div>
          <div className="admin-users-main-item">Brend</div>
          <div className="admin-users-main-item">Model</div>
          <div className="admin-users-main-item">Serija</div>
        </div>
        {vehicles.length !== 0 &&
          vehicles.map((vehicle) => {
            const { id, brand, model, series } = vehicle;
            return (
              <div className="admin-users-main-row" key={id}>
                <div className="admin-users-main-item">{id}</div>
                <div className="admin-users-main-item">{brand}</div>
                <div className="admin-users-main-item">{model}</div>
                <div className="admin-users-main-item">{series}</div>
                <div className="admin-users-main-item-options">
                  <CreateIcon
                    onClick={(e) =>
                      openUpdate({
                        id,
                        brand,
                        model,
                        series,
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
                    value={newVehicle[value]}
                    name={value}
                    type={
                      value === "password" || value === "confirm"
                        ? "password"
                        : "text"
                    }
                    className="admin-users-update-input-box"
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, [value]: e.target.value })
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

export default AdminVehicle;
