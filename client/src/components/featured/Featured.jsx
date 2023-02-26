import useFetch from "../../hooks/useFetch";
import "./Featured.css"

function Featured() {

    const { data, loading, error } = useFetch("/hotels/countByCity?cities=dublin,austin,kyoto");

    return (
        <div className="featured">
            {
                loading ? ("Loading Please wait")
                    : <>
                        <div className="featuredItem">
                            <img src="https://bstatic.com/xdata/images/xphoto/1182x887/145842205.jpg?k=25d20b0cbc7a6931d8012e02f335e927fb40582b513a3e9e2c228201d4388051&o=?size=S" alt="" className="featuredImg" />
                            <div className="featuredTitles">
                                <h1>Dublin</h1>
                                <h2>{data[0]} properties</h2>
                            </div>
                        </div>
                        <div className="featuredItem">
                            <img src="https://cf.bstatic.com/xdata/images/xphoto/540x405/170335205.webp?k=d93f0fd679117580857507c964cdd3cea26571923cda7c21871f9bd9acc2b241&o=" alt="" className="featuredImg" />
                            <div className="featuredTitles">
                                <h1>Austin</h1>
                                <h2>{data[1]} properties</h2>
                            </div>
                        </div>
                        <div className="featuredItem">
                            <img src="https://bstatic.com/data/xphoto/1182x887/152/15284196.jpg?size=S" alt="" className="featuredImg" />
                            <div className="featuredTitles">
                                <h1>Kyoto</h1>
                                <h2>{data[2]} properties</h2>
                            </div>
                        </div>
                    </>}
        </div>
    );
}

export default Featured;