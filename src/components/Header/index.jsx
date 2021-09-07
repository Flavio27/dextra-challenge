import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import marvel_logo from "../../assets/imgs/marvel-logo.png";
import spider_man from "../../assets/imgs/spiderman.png";
import "./styles.scss";
import "aos/dist/aos.css";
import Aos from "aos";

function Header() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const URL_PATH = window.location.pathname;
  useEffect(() => {
    Aos.init({});
  }, []);

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
        <Link to="/">COMICS</Link>
        <Link to="/comics/favorites">FAVORITE HEROES</Link>
        <MenuIcon
          style={{ fontSize: "50px" }}
          onClick={() => setOpenSideBar((e) => !e)}
          className="menu-burger"
        />
      </div>
      {URL_PATH === "/" && (
        <img src={spider_man} alt="marvel-comics" className="spider-top-left" />
      )}
      {openSideBar && (
        <div className="side-bar" data-aos="fade-left">
          <div>
            <Link to="/">COMICS</Link>
            <Link to="/comics/favorites">FAVORITE HEROES</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export { Header };
