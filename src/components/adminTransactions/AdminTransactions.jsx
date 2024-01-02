import axios from "axios";
import { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import AdminTransactionsModel from "../adminTransactionsModal/AdminTransactionsModal";
import "./adminTransactions.css";

const AdminTransactions = () => {
  const dataEntries = [
    {
      name: "Id_korisnika",
      value: "userId",
    },
    {
      name: "Status transakcije",
      value: "status",
    },
    {
      name: "Datum transakcije",
      value: "dataTime",
    },
    {
      name: "",
      value: "",
    },
  ];

  const check = (entry) => {
    let exists = false;
    Object.entries(dataEntries).map((de) => {
      if (de[1].value === entry[0]) exists = true;
    });
    return exists;
  };

  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedTUser, setSelectedTUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  const merge = (transactions, products) => {
    return transactions.map((t) => {
      let productsData = [];
      products.forEach((p) => {
        if (p.id === t.id) {
          const { productID, count } = p;
          productsData.push({ productID, count });
        }
      });
      return { ...t, productsData };
    });
  };

  const handleOpenDetails = (selectedT) => {
    setSelectedTransaction(selectedT);
  };

  useEffect(() => {
    const getTransactions = async () => {
      const { data } = await axios.get(
        `${baseURL}/Transaction/GetTransactions`
      );
      const setData = [...new Set(data.map((d) => d.userId))];
      const promises = setData.map((d) =>
        axios.get(`${baseURL}/Transaction/GetProductsFromTransaction/${d}`)
      );
      const responses = await Promise.all(promises);
      const dataFromResponses = responses.map((r) => r.data);
      const fullData = merge(data, dataFromResponses[0]);
      setTransactions(fullData);
    };
    getTransactions();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(
        `${baseURL}/User/GetUser/${selectedTransaction.userId}`
      );
      //console.log(data);
      setSelectedTUser(data);
      setOpenModal(true);
    };
    if (selectedTransaction !== null) {
      getUser();
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    }
  }, [selectedTransaction]);

  return (
    <>
      <div className="admin-users-main-list">
        <div className="admin-users-main-header">
          {dataEntries.map((de, i) => {
            if (de.name !== "Slika")
              return (
                <div className="admin-users-main-item" key={i}>
                  {de.name}
                </div>
              );
          })}
        </div>
        {transactions.length !== 0 &&
          transactions.map((obj) => {
            return (
              <div className="admin-users-main-row" key={obj.id}>
                {Object.entries(obj).map((entry) => {
                  if (check(entry)) {
                    if (entry[0] === "status") {
                      return (
                        <div className="admin-users-main-item">
                          {entry[1] ? "odobren" : "neodobren"}
                        </div>
                      );
                    } else {
                      return (
                        <div className="admin-users-main-item">{entry[1]}</div>
                      );
                    }
                  }
                })}
                <div className="admin-users-main-item-options">
                  <InfoIcon
                    style={{ color: "#182f3f", cursor: "pointer" }}
                    onClick={() => handleOpenDetails(obj)}
                  />
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
      {openModal && (
        <AdminTransactionsModel
          transaction={selectedTransaction}
          tUser={selectedTUser}
          setTransaction={setSelectedTransaction}
          setOpen={setOpenModal}
          setTransactions={setTransactions}
        />
      )}
    </>
  );
};

export default AdminTransactions;
