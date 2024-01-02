import "./productInformation.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useGlobalContext } from "../../context/Context";
import axios from "axios";

const ProductInformation = ({ product, count }) => {
  const { cart, setCart, user } = useGlobalContext();

  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  const handleAddToCart = async () => {
    const newCount = count === undefined ? 1 : count;
    const found = cart.find((cartItem) => cartItem.id === product.id);
    if (found === undefined) {
      await axios.post(
        `${baseURL}/Cart/InputProductInCart/${product.id}/${user.id}/${newCount}`
      );
      const newProduct = {
        ...product,
        selectedCount: newCount,
      };
      setCart((prevCart) => [...prevCart, newProduct]);
    }
  };

  return (
    <div className="product-information">
      <h4 className="product-information-title">
        Konsultujte se i poručite telefonom
      </h4>
      <div className="product-information-contact phone">
        <LocalPhoneIcon />
        <span>060-444-222</span>
      </div>
      {product.quantity > 0 ? (
        <div className="product-information-contact available">
          <CheckCircleIcon />
          <span> "Dostupno" </span>
        </div>
      ) : (
        <div className="product-information-contact unavailable">
          <CheckCircleIcon />
          <span>"Nedostupno" </span>
        </div>
      )}
      <div className="product-information-price">
        <span className="text">Cena:</span>
        <h3 className="price">
          <h4>{product.price},</h4>
          <span>00</span> sa PDV-om
        </h3>
      </div>
      {product.quantity > 0 ? (
        <button
          className="product-information-btn cart-btn"
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon
            style={{ height: "20px", width: "20px" }}
            className="product-information-icon"
          />
          <span>DODAJTE U KORPU</span>
        </button>
      ) : (
        <button className="product-information-btn cart-btn unavailable">
          <ShoppingCartIcon
            style={{ height: "20px", width: "20px" }}
            className="product-information-icon"
          />
          <span>DODAJTE U KORPU</span>
        </button>
      )}
    </div>
  );
};

export default ProductInformation;
