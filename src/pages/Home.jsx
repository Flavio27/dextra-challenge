import { useEffect, useState } from "react";
import { BASE_URL_COMICS } from "../services/api";
import { SearchBar } from "../components/SearchBar";
import { Spinner } from "../components/Spinner";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import avengers from "../assets/imgs/avengers.png";
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
      <img
        src={avengers}
        alt="avengers"
        className="avengers-img"
        data-aos="fade-right"
      />
    </div>
  );
}

export { Home };
