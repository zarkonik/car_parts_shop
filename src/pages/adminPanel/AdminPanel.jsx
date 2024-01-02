import "./adminPanel.css";
import AdminUsers from "../../components/adminUsers/AdminUsers";
import AdminCategories from "../../components/adminCategories/AdminCategories";
import { useState } from "react";
import AdminSubcategories from "../../components/adminSubcategories/AdminSubcategories";
import AdminGroups from "../../components/adminGroups/AdminGroups";
import AdminEngine from "../../components/adminEngine/AdminEngine";
import AdminVehicle from "../../components/adminVehicle/AdminVehicle";
import AdminProduct from "../../components/adminProduct/AdminProduct";
import AdminType from "../../components/adminType/AdminType";
import AdminTransactions from "../../components/adminTransactions/AdminTransactions";

const AdminPanel = () => {
  const [current, setCurrent] = useState("Users");

  const tabs = [
    "Korisnici",
    "Kategorije",
    "Podkategorije",
    "Motori",
    "Grupe",
    "Vozila",
    "Proizvodi",
    "Tip",
    "Transakcije",
  ];

  return (
    <div className="admin-panel">
      <div className="admin-panel-asside">
        {tabs.map((tab, index) => {
          return (
            <div
              className="admin-panel-asside-item"
              key={index}
              onClick={(e) => setCurrent(tab)}
            >
              <span>{tab}</span>
            </div>
          );
        })}
      </div>
      <div className="admin-panel-main">
        {current === "Korisnici" ? (
          <AdminUsers />
        ) : current === "Kategorije" ? (
          <AdminCategories />
        ) : current === "Podkategorije" ? (
          <AdminSubcategories />
        ) : current === "Grupe" ? (
          <AdminGroups />
        ) : current === "Motori" ? (
          <AdminEngine name={current} />
        ) : current === "Vozila" ? (
          <AdminVehicle />
        ) : current === "Tip" ? (
          <AdminType />
        ) : current === "Transakcije" ? (
          <AdminTransactions />
        ) : (
          <AdminProduct />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
