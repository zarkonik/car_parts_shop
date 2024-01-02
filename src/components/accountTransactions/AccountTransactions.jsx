import "./accountTransactions.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const AccountTransactions = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [current, setCurrent] = useState(null);

  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  useEffect(() => {
    const get = async () => {
      let newTransactions = [];
      const { data } = await axios.get(
        `${baseURL}/Transaction/GetTransactions/${user.id}`
      );
      const { data: products } = await axios.get(
        `${baseURL}/Transaction/GetProductsFromTransaction/${user.id}`
      );
      let allProducts = [];
      newTransactions = data.map((item) => {
        allProducts = products.filter((p) => item.id === p.id);
        return { ...item, products: allProducts };
      });
      setTransactions(newTransactions);
    };
    get();
  }, [user.id]);

  useEffect(() => {
    const getProducts = async () => {
      if (current !== null) {
        const response = await Promise.all(
          transactions[current].products.map((p) => {
            return axios.get(
              `${baseURL}/Product/GetSingleProduct/${p.productID}`
            );
          })
        );
        const newProducts = transactions[current].products.map((p, i) => {
          const { name, picture, price } = response[i].data;
          return { ...p, name, picture, price };
        });
        const newTransactions = transactions.map((t) => {
          if (t.id === newProducts[0].id) {
            return { ...t, products: newProducts };
          } else return t;
        });
        setTransactions(newTransactions);
      }
    };
    getProducts();
  }, [current]);

  const handleCurrent = (i) => {
    if (current === null) setCurrent(i);
    else setCurrent(null);
  };

  return (
    <div className="account-main">
      <h3 className="account-main-title">Porudzbine</h3>
      <hr className="account-separator" />
      <div className="account-transactions">
        {transactions.length !== 0 &&
          transactions.map((t, i) => {
            const { id, products } = t;
            return (
              <div className="account-transactions-item" key={id}>
                <div className="account-transaction-item-header">
                  <span>Transaction {i + 1}</span>
                  <ArrowDropDownIcon
                    style={{ cursor: "pointer" }}
                    onClick={(e) => handleCurrent(i)}
                  />
                </div>
                {current === i && (
                  <div className="account-transaction">
                    {products[0].name !== undefined &&
                      products.map((p, index) => {
                        const { count, name, price } = p;
                        return (
                          <div
                            className="account-transaction-product"
                            key={index}
                          >
                            <div className="account-transaction-product-item">
                              <span>Naziv:</span>
                              <span>
                                {name.length > 13
                                  ? `${name.slice(0, 13)}...`
                                  : name}
                              </span>
                            </div>
                            <div className="account-transaction-product-item">
                              <span>Cena:</span>
                              <span>{price}</span>
                            </div>
                            <div className="account-transaction-product-item">
                              <span>Izabrana kolicina:</span>
                              <span>{count}</span>
                            </div>
                            <div className="account-transaction-product-item">
                              <span>Ukupna cena:</span>
                              <span>{price * count}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AccountTransactions;
