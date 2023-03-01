import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./FeaturedProperties.css";
import "./FeaturedProperties_res.css";

function FeaturedProperties() {

  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");
  const navigate = useNavigate();

  const { dispatch, ...others } = useContext(SearchContext);
  // React.useEffect(() => {
  //   console.log("Home page:", others);
  // }, [others]);

  const handleClick = async (id) => {
    console.log("Featured Property for: ", id);
    // await dispatch({ type: "RESET_SEARCH" });
    navigate(`/hotels/${id}`);
  };

  return (loading ? "Loading" :
    <div className="fp">
      {data.map((item) => (
        <div className="fpItem" key={item._id} onClick={() => handleClick(item._id)}>
          <img
            src={item.photos[0]}
            alt=""
            className="fpImg"
          />
          <span className="fpName">{item.name}</span>
          <span className="fpCity">{item.city}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
          {item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>}
        </div>
      ))}
    </div>
  );
};
export default FeaturedProperties;