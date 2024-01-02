import "./helpHero.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ListAltIcon from "@mui/icons-material/ListAlt";
import useMediaQuery from "@mui/material/useMediaQuery";
import picture9 from "../../../src/picture/9.jpg";

const HelpHero = () => {
  const smallWidth = useMediaQuery("(min-width:350px) and (max-width:750px)");

  return (
    <div className="help-hero">
      <div className="help-hero-header">
        <h3>Potrebna Vam je pomoc, preporuka ili savet?</h3>
      </div>
      {!smallWidth ? (
        <div className="help-hero-main">
          <div className="information-servis">
            <img src={picture9} className="help-hero-img" alt="" />
            <div className="help-hero-consult">
              <span>Konsultujte se ili porucite telefonom</span>
              <div className="help-hero-consult-phone">
                <LocalPhoneIcon />
                <span>060-555-333</span>
              </div>
              <div className="help-hero-consult-offer">
                <ListAltIcon />
                <span>Zatrazite personalizovanu ponudu</span>
              </div>
            </div>
          </div>
          <div className="help-hero-description">
            <span>
              Tim stručnih konsultanata će vam vrlo rado pomoći da napravite
              pravi izbor za svoje vozilo. Naše dugogodišnje iskustvo u prodaji
              auto delova pomoći će vam da rešite sve dileme. Pozovite nas
              svakog radnog dana <b>od 8 do 18h, i subotom od 8 do 16h.</b>{" "}
            </span>
            <span>
              Svi auto delovi na jednom mestu: amortizeri, filteri, plivajući
              zamajac, motorna ulja, set kvačila, letva volana, alternator i
              drugi rezervni delovi za vaš automobil.{" "}
              <b>Savremena online prodavnica</b> auto delova, alata i opreme
              nudi najširi dijapazon delova i cena kroz efikasnu pretragu
              najboljih rezervnih delova za vašeg četvorotočkaša, po
              pristupačnim cenama, uz besplatnu isporuku. Na pravom ste mestu!
            </span>
          </div>
        </div>
      ) : (
        <>
          <img src={picture9} className="help-hero-img" alt="" />
          <div className="help-hero-consult">
            <span>Konsultujte se ili porucite telefonom</span>
            <div className="help-hero-consult-phone">
              <LocalPhoneIcon />
              <span>060-555-333</span>
            </div>
            <div className="help-hero-consult-offer">
              <ListAltIcon />
              <span>Zatrazite personalizovanu ponudu</span>
            </div>
          </div>
          <div className="help-hero-description">
            <span>
              Tim stručnih konsultanata će vam vrlo rado pomoći da napravite
              pravi izbor za svoje vozilo. Naše dugogodišnje iskustvo u prodaji
              auto delova pomoći će vam da rešite sve dileme. Pozovite nas
              svakog radnog dana <b>od 8 do 18h, i subotom od 8 do 16h.</b>{" "}
            </span>
            <span>
              Svi auto delovi na jednom mestu: amortizeri, filteri, plivajući
              zamajac, motorna ulja, set kvačila, letva volana, alternator i
              drugi rezervni delovi za vaš automobil.{" "}
              <b>Savremena online prodavnica</b> auto delova, alata i opreme
              nudi najširi dijapazon delova i cena kroz efikasnu pretragu
              najboljih rezervnih delova za vašeg četvorotočkaša, po
              pristupačnim cenama, uz besplatnu isporuku. Na pravom ste mestu!
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default HelpHero;
