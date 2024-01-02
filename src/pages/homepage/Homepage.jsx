import { useEffect, useState } from "react";
import PartsShow from "../../components/partsShow/PartsShow";
import "./homepage.css";
import axios from "axios";
import HelpHero from "../../components/helpHero/HelpHero";
import Vehicle from "../../components/vehicle/Vehicle";
import { useOutletContext } from "react-router-dom";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [selectedType, setSelectedType] = useOutletContext();
  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  useEffect(() => {
    const getSubcategories = async () => {
      const { data } = await axios.get(
        `${baseURL}/SubCategory/GetSubCategoriesNotInCategory/${selectedType}`
      );
      const array = data.map((sc) => {
        const response = axios.get(
          `${baseURL}/Group/GetGroupsFromSubCategory/${sc.id}`
        );
        return response;
      });
      const newSubcategories = await Promise.all(array).then((promises) => {
        return promises.map((p, i) => {
          return { ...data[i], groups: p.data };
        });
      });
      setSubcategories(newSubcategories);
    };
    const getCategories = async () => {
      const { data } = await axios.get(
        `${baseURL}/Category/GetCategories/${selectedType}`
      );
      const array = data.map((sc) => {
        const response = axios.get(
          `${baseURL}/SubCategory/GetSubCategoriesFromCategory/${sc.id}`
        );
        return response;
      });
      const newSubcategories = await Promise.all(array).then((promises) => {
        return promises.map((p, i) => {
          return { ...data[i], groups: p.data };
        });
      });
      setCategories(newSubcategories);
    };
    getCategories();
    getSubcategories();
    if (selectedType !== null) {
      window.scrollTo(0, 1000);
    } else {
      window.scrollTo(0, 0);
    }
  }, [selectedType]);

  return (
    <>
      <Vehicle
        setCategories={setCategories}
        setSubCategories={setSubcategories}
      />
      <HelpHero />
      <PartsShow
        subcategories={subcategories}
        categories={categories}
        title={selectedType}
      />
    </>
  );
};

export default Homepage;
