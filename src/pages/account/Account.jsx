import { useEffect, useState } from "react";
import "./account.css";
import axios from "axios";
import AccountInformation from "../../components/accountInformation/AccountInformation";
import { useGlobalContext } from "../../context/Context";
import AccountTransactions from "../../components/accountTransactions/AccountTransactions";
import { useParams } from "react-router-dom";

const Account = () => {
  const { tab } = useParams();

  const [current, setCurrent] = useState(tab);

  const { user } = useGlobalContext();

  const tabs = ["Informacije o korisniku", "Porudzbine", "Promena sifre"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tab]);

  return (
    <div className="account">
      <div className="account-asside">
        <h3 className="account-main-title">Moj nalog</h3>
        <hr className="account-separator" />
        {tabs.map((tab, i) => {
          return (
            <div
              className="account-asside-item"
              key={i}
              onClick={(e) => setCurrent(tab)}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <>
        {current === "Informacije o korisniku" ? (
          <AccountInformation user={user} />
        ) : (
          <AccountTransactions user={user} />
        )}
      </>
    </div>
  );
};

export default Account;
