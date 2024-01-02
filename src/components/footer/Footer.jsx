import "./footer.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SendIcon from "@mui/icons-material/Send";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";

const Footer = () => {
  const iconStyles = {
    color: "#182f3f",
    cursor: "pointer",
  };

  const { user } = useGlobalContext();

  const smallWidth = useMediaQuery("(min-width:350px) and (max-width:750px)");

  return (
    <div className="footer">
      <div className="footer-main">
        <div className="footer-container">
          <h3 className="footer-title">KONTAKT</h3>
          <div className="footer-contact-item">
            <LocationOnOutlinedIcon style={iconStyles} />
            <span className="footer-span">Adresa</span>
          </div>
          <div className="footer-contact-item">
            <EmailOutlinedIcon style={iconStyles} />
            <span className="footer-span">Mail</span>
          </div>
          <div className="footer-contact-item">
            <LocalPhoneIcon style={iconStyles} />
            <span className="footer-span">Broj</span>
          </div>
        </div>
        <div className="footer-container">
          <h3 className="footer-title">INFORMACIJA</h3>
          <span className="footer-span">Uslovi poslovanja</span>
          <span className="footer-span">Politika privatnosti</span>
          <span className="footer-span">Politika kolačića</span>
          <span className="footer-span">Saobraznost i reklamacija</span>
          <span className="footer-span">Ugovor o kupoprodaji na daljinu</span>
          <span className="footer-span">Obrazac za odustanak od ugovora</span>
          <span className="footer-span">Obrazac reklamacionog lista</span>
          <span className="footer-span">Obrazac za zamenu</span>
          <span className="footer-span">Blog</span>
        </div>
        <div className="footer-container">
          <h3 className="footer-title">MOJ NALOG</h3>
          <Link to="/account/Informacije o korisniku" className="footer-span">
            Moj nalog
          </Link>
          <Link to={`/account/Porudzbine`} className="footer-span">
            Porudžbine
          </Link>
          <Link to="/cart" className="footer-span">
            Korpa
          </Link>
        </div>
        <div className="footer-bilten">
          <h3 className="footer-title">BILTEN</h3>
          <span className="footer-span">
            Budite prvi koji će čuti za naše najnovije ponude, proširenje
            asortimana i posebne popuste za pretplatnike.
          </span>
          <div className="footer-input">
            <input placeholder="Unesite Vasu e-mail adresu ovde..." />
            <div className="footer-input-icon-container">
              <SendIcon
                style={{ height: "24px", width: "24px", color: "#fff" }}
                className="footer-input-icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-line" />
      <div className="footer-links">
        <PlayCircleFilledOutlinedIcon style={iconStyles} />
        <FacebookOutlinedIcon style={iconStyles} />
        <CameraAltRoundedIcon style={iconStyles} />
      </div>
    </div>
  );
};

export default Footer;
