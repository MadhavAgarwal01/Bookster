import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./Featured.css";
import "./Featured_res.css";

function Featured() {
    const { data, loading, error } = useFetch(
        "/hotels/countByCity?cities=dublin,austin,kyoto",
    );
    const navigate = useNavigate();
    const { dispatch, ...others } = useContext(SearchContext);

    const handleClick = async (dest) => {
        console.log("Featured clicked for: ", dest);
        await dispatch({ type: "NEW_SEARCH", payload: { ...others, destination: dest } });
        navigate("/hotels");
    };

    React.useEffect(() => {
        console.log("Featured Context:", others);
    }, [others]);

    return (loading ? "Loading Please wait" :
        <div className="featured">
            <div className="featuredItem" onClick={() => handleClick("dublin")}>
                <img
                    src="https://bstatic.com/xdata/images/xphoto/1182x887/145842205.jpg?k=25d20b0cbc7a6931d8012e02f335e927fb40582b513a3e9e2c228201d4388051&o=?size=S"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Dublin</h1>
                    <h2>{data[0]} properties</h2>
                </div>
            </div>
            <div className="featuredItem" onClick={() => handleClick("austin")}>
                <img
                    src="https://cf.bstatic.com/xdata/images/xphoto/540x405/170335205.webp?k=d93f0fd679117580857507c964cdd3cea26571923cda7c21871f9bd9acc2b241&o="
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Austin</h1>
                    <h2>{data[1]} properties</h2>
                </div>
            </div>
            <div className="featuredItem" onClick={() => handleClick("kyoto")}>
                <img
                    src="https://bstatic.com/data/xphoto/1182x887/152/15284196.jpg?size=S"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Kyoto</h1>
                    <h2>{data[2]} properties</h2>
                </div>
            </div>
        </div>
    );
}

export default Featured;
