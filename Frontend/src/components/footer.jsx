import React from "react";
import "../componentCSS/footer.css";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="footer " id="footer">
        <div className="f-content">
          <div className="content-left">
            <img src={assets.logo} alt="Cuisinia" />
            <p>
              Order your favorite meals from our restaurants and enjoy delicious
              flavors delivered to your door!
            </p>
            <div className="social-icons">
              <img src={assets.facebook_icon} alt="facebook" />
              <img src={assets.twitter_icon} alt="twitter" />
              <img src={assets.linkedin_icon} alt="linkedIn" />
              <br />
              kitchencuisinia23@gmail.com
            </div>
          </div>
        </div>
        <hr />
        <p className="copyright">
          Copyright 2025 @ Kitchen Cuisinia - All Rights Reserved
        </p>
      </div>
    </>
  );
};

export default Footer;