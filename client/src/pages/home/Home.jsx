import "./Home.css"
import "./Home_res.css"
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PorpertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { SearchContext } from "../../context/SearchContext";
import React, { useContext } from "react";

const Home = () => {

    try {
        return (
            <div>
                <Navbar />
                <Header />
                <div className="homeContainer">
                    <Featured />

                    <div className="homeItem" id="firstItem">
                        <h1 className="homeTitle">Browse by property</h1>
                        <PropertyList />
                    </div>

                    <div className="homeItem">
                        <h1 className="homeTitle">Homes guests love</h1>
                        <FeaturedProperties />
                    </div>
                </div>
                <div className="mailFooter">
                    <MailList />
                    <Footer />
                </div>
            </div>
        )

    } catch (err) {
        console.log(err);
    }
}


export default Home;