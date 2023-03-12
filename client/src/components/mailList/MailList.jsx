import "./MailList.css";
import "./MailList_res.css";

function MailList() {
  return (
    <div className="mail">
      <div className="mailContainer">
        <h1 className="mailTitle">Save time, save money!</h1>
        <span className="mailDesc">Sign up and we'll send the best deals to you</span>
        <form>
          <div className="mailInputContainer">
            <input type="email" required placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailList;