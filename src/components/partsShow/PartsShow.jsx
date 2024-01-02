import { useGlobalContext } from "../../context/Context";
import "./partsShow.css";
import { Link } from "react-router-dom";

const PartsShow = ({ subcategories, categories, title }) => {
  const { selectedVehicle } = useGlobalContext();

  const createUrl = (g) => {
    if (g.hasVehicle) {
      if (selectedVehicle !== null) {
        return `/products/${g.id}`;
      } else {
        return ``; // komponenta za odabir vozila
      }
    } else {
      return `/products/${g.id}`;
    }
  };

  return (
    <>
      <div className="parts-show" id="parts">
        <div className="parts-show-wrapper">
          <h3>{title}</h3>
          <div className="parts-show-list">
            {subcategories.length !== 0 &&
              subcategories.map((sc, i) => {
                const { groups, id, name, picture } = sc;
                return (
                  <article className="parts-show-item" key={id}>
                    <Link
                      to={`/choose-subcategory/${id}`}
                      className="parts-show-item-title"
                    >
                      {name}
                    </Link>
                    <div className="parts-show-item-container">
                      <div className="parts-show-item-description">
                        {groups.length !== 0 &&
                          groups.map((g) => {
                            return (
                              <Link
                                to={createUrl(g)}
                                key={g.id}
                                className="parts-show-item-description-link"
                              >
                                {g.name}
                              </Link>
                            );
                          })}
                      </div>
                      <img
                        src={picture}
                        className="parts-show-item-image"
                        alt=""
                      />
                    </div>
                    <div className="parts-show-item-separator" />
                    <Link
                      to={`/choose-subcategory/${id}`}
                      className="parts-show-item-btn"
                    >
                      Detalji
                    </Link>
                  </article>
                );
              })}
            {categories.length !== 0 &&
              categories.map((sc, i) => {
                const { groups, id, name, picture } = sc;
                return (
                  <article className="parts-show-item" key={id}>
                    <Link
                      to={`/choose-category/${id}`}
                      className="parts-show-item-title"
                    >
                      {name}
                    </Link>
                    <div className="parts-show-item-container">
                      <div className="parts-show-item-description">
                        {groups.length !== 0 &&
                          groups.map((g) => {
                            return (
                              <Link
                                to={`/choose-subcategory/${g.id}`}
                                key={g.id}
                                className="parts-show-item-description-link"
                              >
                                {g.name}
                              </Link>
                            );
                          })}
                      </div>
                      <img
                        src={picture}
                        className="parts-show-item-image"
                        alt=""
                      />
                    </div>
                    <div className="parts-show-item-separator" />
                    <Link
                      to={`/choose-category/${id}`}
                      className="parts-show-item-btn"
                    >
                      Detalji
                    </Link>
                  </article>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PartsShow;
