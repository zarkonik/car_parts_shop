import axios from "axios";
import { useEffect, useState } from "react";
import "./adminTransactionsModal.css";
import Pdf from "../../utilities/Pdf";
import AccountInformation from "../../components/accountInformation/AccountInformation";
import { PDFDownloadLink } from "@react-pdf/renderer";

const AdminTransactionsModel = ({
  transaction,
  tUser,
  setTransaction,
  setOpen,
  setTransactions,
}) => {
  const [products, setProducts] = useState([]);
  const [productPdf, setProductPdf] = useState([]);
  let price = 0;

  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  const handleClose = () => {
    setTransaction(null);
    setOpen(false);
    document.body.style.overflow = "scroll";
  };

  const approveApiCall = async () => {
    try {
      await axios.put(`${baseURL}/Transaction/UpdateTransaction`, {
        Id: transaction.id,
        status: !transaction.status,
        Name: "",
        Phone: "",
        UserId: "",
        Address: "",
        DataTime: "",
        Lastname: "",
        NumberOfVehicle: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = () => {
    approveApiCall();
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === transaction.id)
          return { ...transaction, status: !t.status };
        else return t;
      })
    );
    handleClose();
  };

  const calculateSum = () => {
    let sum = 0;
    products.forEach((item, index) => {
      let count = transaction.productsData[index].count;
      const { price } = item;
      sum += count * price;
    });
    return sum;
  };

  useEffect(() => {
    const getProducts = async () => {
      const promises = transaction.productsData.map((p) =>
        axios.get(`${baseURL}/Product/GetSingleProduct/${p.productID}`)
      );
      const data = await Promise.all(promises);
      const newData = data.map((d) => d.data);
      setProducts(newData);
      setProductPdf(
        newData.map((product, index) => {
          return {
            name: product.name,
            id: product.id,
            price: product.price,
            selectedCount: transaction.productsData[index].count,
          };
        })
      );
    };
    getProducts();
  }, []);

  console.log(transaction);

  return (
    <div className="transaction-modal">
      <div className="transaction-modal-wrapper">
        <button className="modal-cancel" onClick={handleClose}>
          X
        </button>
        <div className="user-information">
          <div className="user-info">
            <h3>Ime</h3>
            <div>{transaction.name}</div>
          </div>
          <div className="user-info">
            <h3>Prezime</h3>
            <div>{transaction.lastname}</div>
          </div>
          <div className="user-info">
            <h3>Adresa</h3>
            <div>{transaction.address}</div>
          </div>
          <div className="user-info">
            <h3>Telefon</h3>
            <div>{transaction.phone}</div>
          </div>
          <div className="user-info">
            <h3>Broj sasije</h3>
            <div>{transaction.numberOfVehicle}</div>
          </div>
        </div>
        <div className="products-transaction">
          {products.map((product, index) => {
            price += transaction.productsData[index].count * product.price;
            return (
              <div className="product-transaction">
                <h3>Naziv proizvoda</h3>
                <div className="product-transaction-name">{product.name}</div>
                <img src={product.picture} alt="" />
                <h3>Kolicina </h3>
                <div>{transaction.productsData[index].count}</div>
                <h3>Cena</h3>
                <div>{product.price}</div>
                <h3>Ukupna cena</h3>
                <div>
                  {transaction.productsData[index].count * product.price}
                </div>
              </div>
            );
          })}
        </div>
        <div className="price-sum">
          <h3>Ukupna cena svih proizvoda</h3>
          <div>{price}</div>
        </div>
        <div className="button-price">
          <button className="button-transaction" onClick={handleApprove}>
            {`${transaction.status ? "Neodobriti" : "Odobriti"}`}
          </button>
          {productPdf.length !== 0 && (
            <PDFDownloadLink
              document={
                <Pdf calculateSum={calculateSum} products={productPdf} />
              }
              className="button-transaction"
            >
              Izvezite predracun
            </PDFDownloadLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTransactionsModel;
