import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { BASE_URL_COMICS } from "../services/api";
import { Spinner } from "../components/Spinner";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchBar from "../components/SearchBar";
import comicLogo from "../assets/imgs/comic-logo.png";
import axios from "axios";
import Aos from "aos";
import "../styles/App.scss";
import "aos/dist/aos.css";

function Home() {
  const START_AT = 110;
  const MAX_COMIC_GRID = 10;
  const MIN_COMIC_TO_BACK_PAGE = 20;

  const [offset, setOffset] = useState(START_AT);
  const [isLoading, setIsLoading] = useState(true);
  const [comicList, setComicList] = useState([]);

  useEffect(() => {
    const getComics = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL_COMICS}&offset=${offset}&limit=10`
        );
        const apiData = await response.data.data.results;
        setComicList(await apiData);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    getComics();
    Aos.init({});
  }, [offset]);

  return (
    <div className="main-container" title="comics">
      <Header />
      <SearchBar />
      <img src={comicLogo} alt="marvel-comics" className="comic-logo" t />
      <div className="cards">
        <div className="grid-cards">
          {!isLoading &&
            comicList.map((comic) => <Card key={comic.id} props={comic} />)}
        </div>
        {isLoading && <Spinner />}
      </div>
      <ArrowBackIosIcon
        className="previous-arrow"
        title="previous-arrow"
        style={{ fontSize: 50 }}
        onClick={() =>
          offset >= MIN_COMIC_TO_BACK_PAGE && setOffset(offset - MAX_COMIC_GRID)
        }
      />
      <ArrowForwardIosIcon
        className="next-arrow"
        title="next-arrow"
        style={{ fontSize: 50 }}
        onClick={() => setOffset(offset + MAX_COMIC_GRID)}
      />
    </div>
  );
}

export { Home };
