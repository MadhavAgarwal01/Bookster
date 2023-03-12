import "./SearchItem.css"
import { Link } from "react-router-dom";

function SearchItem({ item }) {
    return (
        <div className="searchItem">
            <div className="imgFeatures">
                <img
                    src={item.photos[0]}
                    alt=""
                    className="siImg"
                />
                <span className="siFeatures">{item.desc}</span>
            </div>
            <div className="siDesc">
                <div className="hotelPerks">
                    <h1 className="siTitle">{item.name}</h1>
                    <span className="siDistance">{item.distance}m from center</span>
                    <span className="siTaxiOp">Free airport taxi</span>
                    <span className="siSubtitle">
                        Studio Apartment with Air conditioning
                    </span>
                </div>
                <div className="cancelPolicy">
                    <span className="siCancelOp">Free cancellation </span>
                    <span className="siCancelOpSubtitle">
                        You can cancel later, so lock in this great price today!
                    </span>
                </div>
            </div>
            <div className="siDetails">
                {item.rating || <div className="siRating">
                    <div className="ratingReviews">
                        <span>Excellent</span>
                        <p>66 reviews</p>
                    </div>
                    <button>{item.rating || 9.6}</button>
                </div>}
                <div className="siDetailTexts">
                    <div className="costCard">
                        <span className="siPrice">${item.cheapestPrice}</span><p>&nbsp;/night</p>
                    </div>
                    <span className="siTaxOp">Includes taxes & fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="siCheckButton">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;