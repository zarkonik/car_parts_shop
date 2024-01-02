import "./cart.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import SellIcon from "@mui/icons-material/Sell";
import { useGlobalContext } from "../../context/Context";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "../../utilities/Pdf";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useEffect, useRef } from "react";
import Toast from "../../components/toast/Toast";

const Cart = () => {
  const { cart, setCart, user, openToast, setOpenToast } = useGlobalContext();

  const delivery = 360;

  const numVehRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const nameRef = useRef();
  const lastnameRef = useRef();

  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  const smallWidth = useMediaQuery("(min-width:350px) and (max-width:750px)");

  const calculateSum = () => {
    let sum = 0;
    cart.forEach((item) => {
      const { selectedCount, price } = item;
      sum += selectedCount * price;
    });
    return sum;
  };

  const removeFromCart = async (id) => {
    await axios.delete(
      `${baseURL}/Cart/DeleteProductFromCart/${id}/${user.id}`
    );
    const newCart = cart.filter((cartItem) => cartItem.id !== id);
    setCart(newCart);
  };

  const handleCount = (e, quantity) => {
    if (e.target.value < 1) e.target.value = 1;
    else if (e.target.value > quantity) e.target.value = quantity;
  };

  const handleUpdate = () => {
    const inputs = document.querySelectorAll(".cart-list-item-quantity");
    setCart((prevCart) =>
      prevCart.map((cartItem, i) => {
        return { ...cartItem, selectedCount: inputs[i].value };
      })
    );
  };

  const handleAdd = async () => {
    const numberOfVehicle = numVehRef.current.value;
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;
    const lastName = lastnameRef.current.value;
    const { data } = await axios.post(
      `${baseURL}/Transaction/InputProductsInTransaction/${user.id}/${numberOfVehicle}/${name}/${lastName}/${address}/${phone}`
    );
    setOpenToast(true);
    setCart([]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="cart">
        <h3>Korpa</h3>
        <span>{cart.length} proizvod/a</span>
        <div className="cart-list">
          {cart.length !== 0 ? (
            cart.map((item, i) => {
              const { id, name, picture, quantity, price, selectedCount } =
                item;
              return (
                <article className="cart-list-item" key={i}>
                  <div className="cart-list-item-img-container">
                    <img src={picture} alt="" className="cart-list-item-img" />
                  </div>
                  <div className="cart-list-item-title">
                    <span>{name}</span>
                  </div>
                  {!smallWidth && (
                    <div className="cart-list-item-delivery">
                      <div className="cart-list-item-delivery-item">
                        <LocalShippingIcon />
                        <span>Besplatna dostava iznad 7.000 rsd</span>
                      </div>
                      <div className="cart-list-item-delivery-item">
                        <AssignmentTurnedInIcon />
                        <span>Isporuka narednog dana</span>
                      </div>
                      <div className="cart-list-item-delivery-item">
                        <SellIcon />
                        <span>Sjajne cene</span>
                      </div>
                    </div>
                  )}
                  <div className="cart-list-item-info">
                    <span>Cena:</span>
                    <h4>{price},00 sa PDV-om</h4>
                    <input
                      type="number"
                      defaultValue={selectedCount}
                      className="cart-list-item-quantity"
                      onChange={(e) => handleCount(e, quantity)}
                    />
                    <button
                      className="cart-list-item-remove"
                      onClick={(e) => removeFromCart(id)}
                    >
                      Uklonite
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <article className="car-list-item">Nemate artikle u korpi.</article>
          )}
        </div>
        {cart.length !== 0 && (
          <div className="cart-buttons">
            <PDFDownloadLink
              document={<Pdf cart={cart} calculateSum={calculateSum} />}
              className="cart-buttons-btn pdf"
            >
              izvezite korpu u pdf
            </PDFDownloadLink>
          </div>
        )}
        <hr className="cart-separator" />
        {cart.length !== 0 && (
          <div className="cart-checkout">
            <div className="cart-checkout-left">
              <div className="cart-checkout-left-container">
                <span>Broj sasije</span>
                <input
                  required
                  placeholder="Unesite broj sasije radi provere ispravnosti"
                  ref={numVehRef}
                />
              </div>
              <div className="cart-checkout-left-container">
                <span>Adresa</span>
                <input
                  required
                  placeholder="Unesite vasu adresu"
                  ref={addressRef}
                />
              </div>
              <div className="cart-checkout-left-container">
                <span>Broj telefona</span>
                <input
                  required
                  placeholder="Unesite broj telefona"
                  ref={phoneRef}
                />
              </div>
              <div className="cart-checkout-left-container">
                <span>Prezime</span>
                <input
                  required
                  placeholder="Unesite vase prezime"
                  ref={lastnameRef}
                />
              </div>
              <div className="cart-checkout-left-container">
                <span>Ime</span>
                <input required placeholder="Unesite vase ime" ref={nameRef} />
              </div>
            </div>
            <div className="cart-checkout-right">
              <div className="cart-checkout-right-check">
                <div className="cart-checkout-right-container">
                  <span>Iznos:</span>
                  <span>{calculateSum()} sa PDV-om</span>
                </div>
                <div className="cart-checkout-right-container">
                  <span>Isporuka:</span>
                  <span>{delivery} sa PDV-om</span>
                </div>
                <div className="cart-checkout-right-sum">
                  <h3>Ukupno:</h3>
                  <h3>
                    {calculateSum() + delivery} <span>sa PDV-om</span>
                  </h3>
                </div>
              </div>
              <hr />
              <div className="cart-checkout-right-buttons">
                <button
                  className="cart-checkout-right-button"
                  onClick={handleAdd}
                >
                  ZAVRSI PORUDZBINU
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toast
        severity="success"
        message="Izvrsena je transakcija"
        open={openToast}
      />
    </>
  );
};

export default Cart;
