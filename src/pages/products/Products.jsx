import { useEffect, useState } from "react";
import "./products.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import ProductInformation from "../../components/productInformation/ProductInformation";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useGlobalContext } from "../../context/Context";

const Products = () => {
  const { gid, gname } = useParams();

  const [isClicked, setIsClicked] = useState({
    index: "",
    value: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteringProducts, setFilteringProducts] = useState([]);
  const [groupInformation, setGroupInformation] = useState([]);
  //const [productInformation, setProductInformation] = useState([]);
  const [gidCount, setGidCount] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [prodPerPage, setProdPerPage] = useState(3);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState("Podrazumevano");

  const { selectedVehicle, setSelectedVehicle } = useGlobalContext();

  const smallWidth = useMediaQuery("(min-width:350px) and (max-width:750px)");

  const iconStyles = {
    height: "25px",
    width: "25px",
    paddingRight: "5px",
    cursor: "pointer",
  };

  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
    fullReset();
  };

  const handleChangeType = (e) => {
    setProdPerPage(e.target.value);
    setCurrentPage(1);
  };

  const createPagination = () => {
    let pages = [];
    for (let i = 0; i < count; i++) {
      pages.push(
        <div
          className={`pagination-item ${
            i + 1 === currentPage ? "selected" : ""
          }`}
          onClick={() => handleChangePage(i + 1)}
        >
          {i + 1}
        </div>
      );
    }
    return pages;
  };

  useEffect(() => {
    const getProducts = async () => {
      let countProducts;
      let newGid = gid;
      let currentGroup = {};
      let response = await axios.get(
        `${baseURL}/Product/GetCountProducts/${newGid}`
      );
      countProducts = parseInt(response.data / prodPerPage);
      if (response.data % prodPerPage !== 0) countProducts++;
      setCount(countProducts);
      response = await axios.get(`${baseURL}/Group/GetGroup/${newGid}`);
      currentGroup = response.data;
      if (currentGroup.hasVehicle) {
        //// DODAJ OVDE KOD ZA HAS VEHICLE TRUE
        /*const engine = {
          power: selectedVehicle.engine.power,
          volume: selectedVehicle.engine.volume
        }*/
        const { engine, ...allElse } = selectedVehicle;
        const { power, volume } = engine;
        const { brand, model, series } = allElse;
        console.log("Zove se za vozilo");
        console.log(sort);
        const { data } = await axios.post(
          `${baseURL}/Product/GetProductVehicle/`,
          {
            group: parseInt(newGid),
            sort: sort,
            power,
            volume,
            brand,
            model,
            series,
            ppp: prodPerPage,
            currentPage: currentPage,
          }
        );
        if (data.length !== 0) {
          const response = await Promise.all(
            data.map((p) => {
              return axios.get(
                `${baseURL}/GroupInformationData/GetGroupInformationData/${newGid}/${p.id}`
              );
            })
          );
          // creating groupInformation state
          let gInfo = [];
          response[0].data.map((item) => {
            gInfo.push({
              name: item.name,
              id: item.id,
            });
            return item;
          });
          setGroupInformation(gInfo);
          const newResponse = response.map((r, i) => {
            return { ...data[i], gi: r.data };
          });
          setProducts(newResponse);
        }
      } else {
        if (gid === undefined) {
          const response = await axios.get(
            `${baseURL}/Group/GetGroupName/${gname}`
          );

          newGid = response.data.id;
        }

        const { data } = await axios.get(
          `${baseURL}/Product/GetProduct/${newGid}/${sort}/${prodPerPage}/${
            currentPage - 1
          }`
        );
        if (data.length !== 0) {
          const response = await Promise.all(
            data.map((p) => {
              return axios.get(
                `${baseURL}/GroupInformationData/GetGroupInformationData/${newGid}/${p.id}`
              );
            })
          );
          // creating groupInformation state
          let gInfo = [];
          response[0].data.map((item) => {
            gInfo.push({
              name: item.name,
              id: item.id,
            });
            return item;
          });
          setGroupInformation(gInfo);
          const newResponse = response.map((r, i) => {
            return { ...data[i], gi: r.data };
          });
          setProducts(newResponse);
        }
      }
    };
    getProducts();
  }, [gid, gname, currentPage, prodPerPage]);

  useEffect(() => {
    const getGidCount = async () => {
      if (products.length !== 0) {
        let newGid = gid;
        if (gid === undefined) {
          const { data } = await axios.get(
            `${baseURL}/Group/GetGroupName/${gname}`
          );
          newGid = data.id;
        }
        const responses = await Promise.all(
          groupInformation.map((groupInfo) => {
            return axios.get(
              `${baseURL}/GroupInformationData/GetGroupInformationDataCount/${newGid}/${groupInfo.id}`
            );
          })
        );
        const newGidCount = responses.map((r) => {
          return r.data;
        });
        setGidCount(newGidCount);
      }
    };
    getGidCount();
    setFilteringProducts(products);
  }, [products, gid]);

  const handleSort = async (e) => {
    setSort(e.target.value);
    const sortElement = e.target.value;
    console.log(sortElement);
    let newGid = gid;
    if (gid === undefined) {
      const response = await axios.get(
        `${baseURL}/Group/GetGroupName/${gname}`
      );
      newGid = response.data.id;
    }
    console.log(prodPerPage);
    console.log(currentPage);
    const { data } = await axios.get(
      `${baseURL}/Product/GetProduct/${newGid}/${sortElement}/${prodPerPage}/${
        currentPage - 1
      } `
    );
    console.log(data);
    if (data.length !== 0) {
      const response = await Promise.all(
        data.map((p) => {
          return axios.get(
            `${baseURL}/GroupInformationData/GetGroupInformationData/${newGid}/${p.id}`
          );
        })
      );
      // creating groupInformation state
      let gInfo = [];
      response[0].data.map((item) => {
        gInfo.push({
          name: item.name,
          id: item.id,
        });
        return item;
      });
      setGroupInformation(gInfo);
      const newResponse = response.map((r, i) => {
        return { ...data[i], gi: r.data };
      });
      setProducts(newResponse);
    }
  };

  const handleFilter = (bool) => {
    let newProducts = [];
    if (bool) {
      newProducts = products.filter((p) => p.quantity >= 1);
    } else {
      newProducts = products.filter((p) => p.quantity < 1);
    }
    smallWidth && handleFilterToggle();
    setFilteringProducts(newProducts);
  };

  const fullReset = () => {
    setFilteringProducts(products);
    const radioButtons = document.querySelectorAll("input[type=radio]");
    radioButtons.forEach((rb) => (rb.checked = false));
    smallWidth && handleFilterToggle();
  };

  const handleChangeGi = (e) => {
    const title = e.target.parentNode.parentNode.querySelector(
      ".products-search-info-title"
    );
    title.innerHTML = e.target.innerHTML;
    setIsClicked(false);
  };

  const handleSearchGi = async () => {
    const gis = document.querySelectorAll(".products-search-info-title");
    let names = [];
    let data = [];
    groupInformation.map((g, i) => {
      let newData = "";
      let currentData = gis[i].innerHTML;
      if (currentData !== groupInformation[i].name) {
        newData = [...currentData].reverse().join("").split("( ")[1];
        newData = [...newData].reverse().join("");
      }
      names[i] = g.name;
      data[i] = gis[i].innerHTML === g.name ? "" : newData;
      return g;
    });
    const response = await axios.post(`${baseURL}/Product/GetDataProducts`, {
      names,
      data,
    });
    let newGid = gid;
    if (gid === undefined) {
      const { data } = await axios.get(
        `${baseURL}/Group/GetGroupName/${gname}`
      );
      newGid = data.id;
    }
    if (response.data.length !== 0) {
      const responses = await Promise.all(
        response.data.map((p) => {
          return axios.get(
            `${baseURL}/GroupInformationData/GetGroupInformationData/${newGid}/${p.id}`
          );
        })
      );
      const newResponse = responses.map((r, i) => {
        return { ...response.data[i], gi: r.data };
      });
      setProducts(newResponse);
    } else setProducts([]);
    //setProducts(response.data);
  };

  const handleFilterToggle = () => {
    setIsFiltering(!isFiltering);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="products">
      <div
        className={
          isFiltering
            ? "products-filter-submenu show-menu"
            : "products-filter-submenu"
        }
      >
        <button
          onClick={handleFilterToggle}
          className="products-filter-submenu-exit"
        >
          x
        </button>
        <div className="products-filter-content">
          <h2 className="products-filter-title">Dostupnost</h2>
          <div className="products-filter-separator" />
          <div className="products-filter-item">
            <input
              type="radio"
              name="filter"
              onChange={(e) => handleFilter(false)}
            />
            <label htmlFor="filter">NEDOSTUPNO</label>
          </div>
          <div className="products-filter-item">
            <input
              type="radio"
              name="filter"
              onChange={(e) => handleFilter(true)}
            />
            <label htmlFor="filter">DOSTUPNO</label>
          </div>
        </div>
        <button className="reset-filter-vehicle" onClick={fullReset}>
          <AutorenewRoundedIcon />
          <h3>Resetujte filtere</h3>
        </button>
      </div>
      <div className="products-search">
        <h3 className="products-search-title">
          URADITE PRETRAGU PREKO KARAKTERISTIKA
        </h3>
        <div className="products-search-container">
          {groupInformation.length !== 0 &&
            groupInformation.map((item, index) => {
              return (
                <div className="products-search-info" key={item.id}>
                  <div
                    className={
                      isClicked.value && index === isClicked.index
                        ? "products-search-info-number clicked"
                        : "products-search-info-number"
                    }
                  >
                    {index + 1}
                  </div>
                  <span
                    className={
                      isClicked.value && index === isClicked.index
                        ? "products-search-info-title clicked"
                        : "products-search-info-title"
                    }
                  >
                    {item.name}
                  </span>
                  <KeyboardArrowDownIcon
                    onClick={(e) => {
                      setIsClicked({
                        index,
                        value: !isClicked.value,
                      });
                    }}
                    style={
                      isClicked.value && index === isClicked.index
                        ? { ...iconStyles, color: "#f37122" }
                        : iconStyles
                    }
                    className="products-search-arrow"
                  />
                  {isClicked.value && index === isClicked.index && (
                    <div className="products-search-info-select">
                      <input className="products-search-info-select-input" />
                      {gidCount.length !== 0 &&
                        gidCount[index].map((gc) => {
                          return (
                            <div
                              className="products-search-info-select-text"
                              key={`${gc.data} ${gc.count}`}
                              onClick={(e) => handleChangeGi(e, item.name)}
                            >
                              {gc.data} ({gc.count})
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        <button className="products-search-btn" onClick={handleSearchGi}>
          PRETRAGA
        </button>
      </div>
      <div className="products-separator" />
      <div className="products-filter">
        {!smallWidth ? (
          <div className="products-filter-left">
            <div className="products-filter-content">
              <h2 className="products-filter-title">Dostupnost</h2>
              <div className="products-filter-separator" />
              <div className="products-filter-item">
                {" "}
                <input
                  type="radio"
                  name="filter"
                  onChange={(e) => handleFilter(false)}
                />
                <label htmlFor="filter">NEDOSTUPNO</label>
              </div>
              <div className="products-filter-item">
                {" "}
                <input
                  type="radio"
                  name="filter"
                  onChange={(e) => handleFilter(true)}
                />
                <label htmlFor="filter">DOSTUPNO</label>
              </div>
            </div>
            <button className="reset-filter-vehicle" onClick={fullReset}>
              <AutorenewRoundedIcon />
              <h3>Resetujte filtere</h3>
            </button>
          </div>
        ) : (
          <button
            className="products-filter-submenu-btn"
            onClick={handleFilterToggle}
          >
            FILTERI <FilterAltIcon style={{ marginTop: "2px" }} />
          </button>
        )}
        <div className="products-filter-right">
          <div className="products-filter-title right">
            {!smallWidth && <span>Sortiraj prema</span>}
            <select
              className="products-filter-select sort"
              onChange={handleSort}
            >
              <option value="Podrazumevano">Podrazumevano</option>
              <option value="Cena rastuce">Cena rastuce</option>
              <option value="Cena opadajuce">Cena opadajuce</option>
              <option value="Naziv rastuce">Naziv rastuce</option>
              <option value="Naziv opadajuce">Naziv opadajuce</option>
            </select>
            {!smallWidth && <span>Prikazite</span>}
            <select
              className="products-filter-select page"
              onChange={handleChangeType}
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
            </select>
            {!smallWidth && <span>po stranici</span>}
          </div>
          <div className="products-filter-separator" />
          {filteringProducts.length !== 0 && (
            <div className="products-filter-list">
              {filteringProducts.map((p, ind) => {
                const { id, picture, name, gi, price, quantity } = p;
                return (
                  <article
                    className={`${
                      isChecked
                        ? "products-filter-list-item clicked"
                        : "products-filter-list-item"
                    }`}
                    key={id}
                  >
                    <img
                      src={picture}
                      alt=""
                      className={`${
                        isChecked
                          ? "products-filter-list-item-image clicked"
                          : "products-filter-list-item-image"
                      }`}
                    />
                    <div className="products-filter-list-item-desc">
                      <Link
                        to={`/product/${id}`}
                        className="products-filter-list-item-desc-title"
                      >
                        {name}
                      </Link>
                      {groupInformation.length !== 0 && (
                        <div
                          className={`${
                            isChecked
                              ? "products-filter-list-item-desc-information clicked"
                              : "products-filter-list-item-desc-information"
                          }`}
                        >
                          {gi !== undefined &&
                            gi.length !== 0 &&
                            gi.map((i) => {
                              return (
                                <span
                                  key={i.id}
                                  className="products-filter-list-item-desc-information-text odd"
                                >
                                  {i.name}: {i.data}
                                </span>
                              );
                            })}
                          {/* OVDE UBACI PRODUCT INFORMATION */}
                        </div>
                      )}
                      <div className="products-filter-list-item-desc-separator">
                        <div className="products-filter-list-item-desc-line"></div>
                        <div
                          className="products-filter-list-item-desc-circle"
                          onClick={(e) => setIsChecked(!isChecked)}
                        >
                          {`${isChecked ? "-" : "+"}`}
                        </div>
                      </div>
                      <Link
                        to={`/product/${id}`}
                        className="products-filter-list-item-desc-button"
                      >
                        Detalji
                      </Link>
                    </div>
                    <ProductInformation product={p} />
                  </article>
                );
              })}
            </div>
          )}
          <div className="pagination">{createPagination()}</div>
        </div>
      </div>
    </div>
  );
};

export default Products;
