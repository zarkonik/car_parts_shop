import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MiniCart from "../miniCart/MiniCart";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context/Context";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = () => {
  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  let navigate = useNavigate();

  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isAccountDisplayed, setIsAccountDisplayed] = useState(false);
  const [searchCategories, setSearchCategories] = useState([]);
  const [searchSubcategories, setSearchSubcategories] = useState([]);
  const [searchGroups, setSearchGroups] = useState([]);

  const { user, setUser } = useGlobalContext();

  const searchInput = useRef();

  const smallWidth = useMediaQuery("(min-width:350px) and (max-width:750px)");

  const handleSearch = async (e) => {
    const searchParameter = e.target.value.trim();
    if (searchParameter !== "") {
      let response = await axios.get(
        `${baseURL}/Category/SearchCategory/${searchParameter}`
      );
      if (response.data != []) setSearchCategories(response.data);
      response = await axios.get(
        `${baseURL}/SubCategory/SearchSubCategory/${searchParameter}`
      );
      if (response.data != []) setSearchSubcategories(response.data);
      response = await axios.get(
        `${baseURL}/Group/SearchGroup/${searchParameter}`
      );
      if (response.data != []) setSearchGroups(response.data);
    } else {
      setSearchCategories([]);
      setSearchSubcategories([]);
      setSearchGroups([]);
    }
  };

  const handleNavigate = (id) => {
    let item = searchCategories.find((sc) => sc.id === id);
    searchInput.current.value = "";
    setSearchCategories([]);
    setSearchSubcategories([]);
    setSearchGroups([]);
    if (item !== undefined) {
      return navigate(`/choose-category/${item.id}`);
    }
    item = searchSubcategories.find((sc) => sc.id === id);
    if (item !== undefined) {
      return navigate(`/choose-subcategory/${item.id}`);
    }
    item = searchGroups.find((sc) => sc.id === id);
    if (item !== undefined) {
      return navigate(`/products/${item.id}`);
    }
  };

  const handleNavigateCart = () => {
    return navigate("/cart");
  };

  const handleAccountMenu = () => {
    setIsAccountDisplayed(!isAccountDisplayed);
  };

  const handleLogout = () => {
    setUser(null);
    return navigate("/login");
  };

  const redirectPanel = () => {
    if (user?.admin) navigate("/admin");
    else return;
  };

  console.log(user);

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link style={{ textDecoration: "none" }} to="/">
          PRODAJA DELOVA
        </Link>
        {smallWidth && (
          <div className="navbar-icons">
            {user === null ? (
              <Link to="/login" className="navbar-login">
                <PersonIcon />
              </Link>
            ) : (
              <div className="navbar-login" onClick={handleAccountMenu}>
                <PersonIcon />
                {isAccountDisplayed && (
                  <div className="navbar-account-menu">
                    <Link to="/account" className="navbar-account-menu-item">
                      Moj nalog
                    </Link>
                    <div
                      className="navbar-account-menu-item"
                      onClick={handleLogout}
                    >
                      Odjavite se
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="navbar-wishlist">
              <LocalShippingIcon
                style={{ color: "#182f3f" }}
                onClick={redirectPanel}
              />
            </div>
            {user !== null && (
              <div
                className="navbar-cart"
                onClick={(e) =>
                  !smallWidth
                    ? setIsDisplayed(!isDisplayed)
                    : handleNavigateCart()
                }
              >
                <ShoppingCartIcon style={{ color: "#182f3f" }} />
                {isDisplayed && <MiniCart />}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="navbar-options">
        <div className="navbar-search">
          <input
            className="navbar-search-input"
            placeholder="Pretraga artikala po nazivu"
            onChange={handleSearch}
            ref={searchInput}
          />
          <div className="navbar-search-icon">
            <SearchIcon
              style={{
                color: "#fff",
                fontSize: "20px",
              }}
            />
          </div>
          <div className="navbar-search-items">
            {searchCategories.length !== 0 &&
              searchCategories.map((si) => {
                return (
                  <div
                    className="navbar-search-item"
                    key={si.id}
                    onClick={(e) => handleNavigate(si.id)}
                  >
                    {si.name}
                  </div>
                );
              })}
            {searchSubcategories.length !== 0 &&
              searchSubcategories.map((si) => {
                return (
                  <div
                    className="navbar-search-item"
                    key={si.id}
                    onClick={(e) => handleNavigate(si.id)}
                  >
                    {si.name}
                  </div>
                );
              })}
            {searchGroups.length !== 0 &&
              searchGroups.map((si) => {
                return (
                  <div
                    className="navbar-search-item"
                    key={si.id}
                    onClick={(e) => handleNavigate(si.id)}
                  >
                    {si.name}
                  </div>
                );
              })}
          </div>
        </div>
        {!smallWidth && (
          <div className="navbar-phonenumber">
            <LocalPhoneIcon />
            <span>060-444-222</span>
          </div>
        )}
        {!smallWidth && (
          <>
            {user === null ? (
              <Link to="/login" className="navbar-login">
                <span>PRIJAVITE SE</span>
              </Link>
            ) : (
              <div className="navbar-login" onClick={handleAccountMenu}>
                <PersonIcon />
                {isAccountDisplayed && (
                  <div className="navbar-account-menu">
                    <Link
                      to="/account/Informacije o korisniku"
                      className="navbar-account-menu-item"
                    >
                      Moj nalog
                    </Link>
                    <div
                      className="navbar-account-menu-item"
                      onClick={handleLogout}
                    >
                      Odjavite se
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
        {!smallWidth && (
          <>
            <div className="navbar-wishlist">
              <LocalShippingIcon
                style={{ color: "#182f3f" }}
                onClick={redirectPanel}
              />
            </div>
            {user !== null && (
              <div
                className="navbar-cart"
                onClick={(e) => setIsDisplayed(!isDisplayed)}
              >
                <ShoppingCartIcon style={{ color: "#182f3f" }} />
                <span>KORPA</span>
                {isDisplayed && <MiniCart />}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
