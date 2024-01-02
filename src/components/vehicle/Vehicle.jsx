import "./vehicle.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import picture1 from "../../../src/picture/1.jpg";
import picture2 from "../../../src/picture/2.jpg";
import picture3 from "../../../src/picture/3.jpg";
import picture4 from "../../../src/picture/4.jpg";
import picture5 from "../../../src/picture/5.jpg";
import picture6 from "../../../src/picture/6.jpg";
import picture7 from "../../../src/picture/7.jpg";
import picture8 from "../../../src/picture/8.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context/Context";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

const images = [
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
  picture7,
  picture8,
];

console.log(images);

const Vehicle = ({ setCategories, setSubCategories }) => {
  const [currentImg, setCurrentImg] = useState(null);

  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [series, setSeries] = useState([]);
  const [engineTypes, setEngineTypes] = useState([]);

  const { setSelectedVehicle, selectedVehicle } = useGlobalContext();

  const [selectedType, setSelectedType] = useState(
    selectedVehicle?.type || null
  );
  const [selectedBrand, setSelectedBrand] = useState(
    selectedVehicle?.brand || null
  );
  const [selectedModel, setSelectedModel] = useState(
    selectedVehicle?.model || null
  );
  const [selectedSerie, setSelectedSerie] = useState(
    selectedVehicle?.series || null
  );
  const [selectedEngine, setSelectedEngine] = useState(
    selectedVehicle?.engine || null
  );

  const choose = [
    {
      title: "Izaberite vas tip vozila",
      name: "type",
    },
    {
      title: "Izaberite marku vozila",
      name: "brand",
    },
    {
      title: "Izaberite model",
      name: "model",
    },
    {
      title: "Izaberite seriju vozila",
      name: "series",
    },
    {
      title: "Izaberite tip motora",
      name: "engine",
    },
  ];

  const baseURL = "http://lakilab-001-site2.ctempurl.com";

  const [isClicked, setIsClicked] = useState({
    index: "",
    value: false,
  });

  const iconStyles = {
    height: "25px",
    width: "25px",
    paddingRight: "5px",
    cursor: "pointer",
  };

  const handleChangeImage = (levo) => {
    const wrapperContainer = document.querySelector(".image-wrapper");
    currentImg - 1 === -1
      ? (wrapperContainer.style.transition = "none")
      : (wrapperContainer.style.transition = "1s ease");
    if (levo) {
      let newCurrentImg = currentImg - 1 === -1 ? 7 : currentImg - 1;
      wrapperContainer.style.transform = `translateX(${
        newCurrentImg *
        -wrapperContainer.parentNode.getBoundingClientRect().width
      }px)`;
      setCurrentImg(newCurrentImg);
    } else {
      currentImg + 1 === 8
        ? (wrapperContainer.style.transition = "none")
        : (wrapperContainer.style.transition = "1s ease");

      let newCurrentImg = currentImg + 1 === 8 ? 0 : currentImg + 1;
      wrapperContainer.style.transform = `translateX(${
        newCurrentImg *
        -wrapperContainer.parentNode.getBoundingClientRect().width
      }px)`;
      setCurrentImg(newCurrentImg);
    }
  };

  const handleChangeType = (type) => {
    const selectedText = document.querySelectorAll(
      ".vehicle-search-info-title"
    )[isClicked.index];
    selectedText.innerHTML = type.name;
    const getBrand = async () => {
      const { data } = await axios.get(
        "http://lakilab-001-site2.ctempurl.com/Vehicle/GetBrands"
      );
      //console.log(data);
      setIsClicked({
        index: "",
        value: false,
      });
      setSelectedType(type.name);
      setBrands(data);
    };
    getBrand();
  };

  const handleChangeBrand = (brand) => {
    const selectedText = document.querySelectorAll(
      ".vehicle-search-info-title"
    )[isClicked.index];
    selectedText.innerHTML = brand;
    const getModels = async () => {
      const { data } = await axios.get(
        `http://lakilab-001-site2.ctempurl.com/Vehicle/GetModel/${brand}`
      );
      setIsClicked({
        index: "",
        value: false,
      });
      setSelectedBrand(brand);
      setModels(data);
    };
    getModels();
  };

  const handleChangeModel = (model) => {
    const selectedText = document.querySelectorAll(
      ".vehicle-search-info-title"
    )[isClicked.index];
    selectedText.innerHTML = model;
    const getSeries = async () => {
      const { data } = await axios.get(
        `http://lakilab-001-site2.ctempurl.com/Vehicle/GetSeries/${selectedBrand}/${model}`
      );
      console.log(data);
      setIsClicked({
        index: "",
        value: false,
      });
      setSelectedModel(model);
      setSeries(data);
    };
    getSeries();
  };

  const handleChangeSerie = (serie) => {
    const selectedText = document.querySelectorAll(
      ".vehicle-search-info-title"
    )[isClicked.index];
    selectedText.innerHTML = serie;
    const getEngineTypes = async () => {
      const { data } = await axios.get(
        `http://lakilab-001-site2.ctempurl.com/Vehicle/GetEngine/${selectedBrand}/${selectedModel}/${serie}`
      );

      setIsClicked({
        index: "",
        value: false,
      });
      setSelectedSerie(serie);
      setEngineTypes(data);
    };
    getEngineTypes();
  };

  const handleChangeEngine = (engine) => {
    const selectedText = document.querySelectorAll(
      ".vehicle-search-info-title"
    )[isClicked.index];
    selectedText.innerHTML = `${engine.power}HP ${engine.volume}cm3`;
    setIsClicked({
      index: "",
      value: false,
    });
    setSelectedEngine(engine);
  };

  const fullReset = () => {
    // reset span texts
    const texts = document.querySelectorAll(".vehicle-search-info-title");
    texts.forEach((text, i) => (text.innerHTML = choose[i].title));

    // reset selected states
    setSelectedModel(null);
    setSelectedSerie(null);
    setSelectedEngine(null);

    //reset all retrieved states
    setModels([]);
    setSeries([]);
    setEngineTypes([]);

    // context setting
    setSelectedVehicle(null);
  };

  const handleChooseVehicle = async () => {
    console.log("Usao");
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
      setSubCategories(newSubcategories);
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
    const newVehicle = {
      brand: selectedBrand,
      model: selectedModel,
      series: selectedSerie,
      engine: selectedEngine,
      type: selectedType,
    };
    setSelectedVehicle(newVehicle);
    window.scrollTo(0, 1000);
  };

  useEffect(() => {
    const changeImage = setInterval(() => {
      handleChangeImage(false);
    }, 4000);
    return () => clearInterval(changeImage);
  }, [currentImg]);

  useEffect(() => {
    const getTypes = async () => {
      const { data } = await axios.get(
        "http://lakilab-001-site2.ctempurl.com/Type/GetTypes"
      );
      setTypes(data);
    };
    getTypes();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="vehicle-container">
      <div className="vehicle-form">
        <h3 className="chose_vehicle">Odaberite vaše vozilo:</h3>
        {choose.map((item, index) => {
          return (
            <div className="vehicle-search-info" key={index}>
              <div
                className={
                  isClicked.value && index === isClicked.index
                    ? "vehicle-search-info-number clicked"
                    : "vehicle-search-info-number"
                }
              >
                {index + 1}
              </div>
              <span
                className={
                  isClicked.value && index === isClicked.index
                    ? "vehicle-search-info-title clicked"
                    : "vehicle-search-info-title"
                }
              >
                {selectedVehicle !== null
                  ? item.name !== "engine"
                    ? selectedVehicle[`${item.name}`]
                    : `${selectedVehicle[`${item.name}`]?.power}HP 
                    ${selectedVehicle[`${item.name}`]?.volume}cm3`
                  : item.title}
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
                className="vehicle-search-arrow"
              />
              {isClicked.value && index === isClicked.index && index === 0 && (
                <div className="vehicle-search-info-select">
                  <input className="vehicle-search-info-select-input" />
                  {types.length !== 0 &&
                    types.map((type) => {
                      return (
                        <div
                          className="vehicle-search-info-select-text"
                          key={`${type.name}`}
                          onClick={() => handleChangeType(type)}
                        >
                          {type.name}
                        </div>
                      );
                    })}
                </div>
              )}
              {isClicked.value && index === isClicked.index && index === 1 && (
                <div className="vehicle-search-info-select">
                  <input className="vehicle-search-info-select-input" />
                  {brands.length > 0 &&
                    brands.map((brand) => {
                      return (
                        <div
                          className="vehicle-search-info-select-text"
                          key={`${brand}`}
                          onClick={() => handleChangeBrand(brand)}
                        >
                          {brand}
                        </div>
                      );
                    })}
                </div>
              )}
              {isClicked.value && index === isClicked.index && index === 2 && (
                <div className="vehicle-search-info-select">
                  <input className="vehicle-search-info-select-input" />
                  {models.length > 0 &&
                    models.map((model) => {
                      return (
                        <div
                          className="vehicle-search-info-select-text"
                          key={`${model}`}
                          onClick={() => handleChangeModel(model)}
                        >
                          {model}
                        </div>
                      );
                    })}
                </div>
              )}
              {isClicked.value && index === isClicked.index && index === 3 && (
                <div className="vehicle-search-info-select">
                  <input className="vehicle-search-info-select-input" />
                  {series.length > 0 &&
                    series.map((serie) => {
                      return (
                        <div
                          className="vehicle-search-info-select-text"
                          key={`${serie}`}
                          onClick={() => handleChangeSerie(serie)}
                        >
                          {serie}
                        </div>
                      );
                    })}
                </div>
              )}
              {isClicked.value && index === isClicked.index && index === 4 && (
                <div className="vehicle-search-info-select">
                  <input className="vehicle-search-info-select-input" />
                  {engineTypes.length > 0 &&
                    engineTypes.map((engine) => {
                      return (
                        <div
                          className="vehicle-search-info-select-text"
                          key={`${engine.id}`}
                          onClick={() => handleChangeEngine(engine)}
                        >
                          {`${engine.power}HP ${engine.volume}cm3`}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
        <button className="find-part-vehicle" onClick={handleChooseVehicle}>
          PRONAĐITE DELOVE ZA SVOJE VOZILO
        </button>
        <button className="reset-filter-vehicle" onClick={fullReset}>
          <AutorenewRoundedIcon />
          <h3>Resetujte filtere</h3>
        </button>
      </div>
      <div className="vehicles">
        <button className="arrow left" onClick={(e) => handleChangeImage(true)}>
          <ArrowBackIosNewIcon />
        </button>
        <article className="image-wrapper">
          {images.map((image, i) => {
            return <img key={i} src={image} alt="img" />;
          })}
        </article>
        <button
          className="arrow right"
          onClick={(e) => handleChangeImage(false)}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default Vehicle;
