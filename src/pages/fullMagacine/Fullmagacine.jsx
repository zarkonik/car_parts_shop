import { useEffect, useState } from "react";
import PartsShow from "../../components/partsShow/PartsShow";
import "./fullMagacine.css";
import axios from "axios";
import HelpHero from "../../components/helpHero/HelpHero";

const FullMagacine = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  useEffect(() => {
    const getSubcategories = async () => {
      const { data } = await axios.get(
        `${baseURL}/SubCategory/GetSubCategoriesNotInCategory`
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
      const { data } = await axios.get(`${baseURL}/Category/GetCategories`);
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
  }, []);

  return (
    <>
      <HelpHero />
      <PartsShow subcategories={subcategories} categories={categories} />
    </>
  );
};

export default FullMagacine;
