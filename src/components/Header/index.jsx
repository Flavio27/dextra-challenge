import { useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import marvel_logo from "../../assets/imgs/marvel-logo.png";
import spider_man from "../../assets/imgs/spiderman.png";
import "./styles.scss";
import "aos/dist/aos.css";

import Aos from "aos";

function Header() {

  useEffect(() => {
    Aos.init({});
  }, [])
  return (
    <div
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className="header-container"
    >
      <div className="marvel-logo-div">
        <Link to="/">
          <img src={marvel_logo} alt="marvel-logo" className="marvel-logo" />
        </Link>
      </div>
      <div className="links-div">
        <span>COMICS</span>
        <span>VIDEOS</span>
        <span>CHARACTERS</span>
        <span>NEWS</span>
        <span>ABOUT</span>

        <MenuIcon className="menu-burger" style={{ fontSize: "50px" }} />
      </div>

      <img src={spider_man} alt="marvel-comics" className="spider-top-left" />
    </div>
  );
}

export { Header };
