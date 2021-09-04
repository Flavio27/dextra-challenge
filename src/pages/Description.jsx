import { DescriptionBox } from "../components/DescriptionBox";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useComic } from "../hooks/useComic";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Aos from "aos";
import "../styles/Description.scss";
import "aos/dist/aos.css";

function Description() {
  const { comicSelected } = useComic();
  const history = useHistory();

  const thumbnail =
    `${comicSelected?.thumbnail?.path}.${comicSelected?.thumbnail?.extension}` ||
    "";
  const title = comicSelected?.title || "";
  const prices = comicSelected?.prices || "";
  const characters = comicSelected?.characters?.items || [];
  const format = comicSelected?.format || "";
  const creators = comicSelected?.creators?.items || [];

  useEffect(() => {
    Aos.init({});
    if (!comicSelected) return history.push("/");
  }, [comicSelected, history]);

  if (!comicSelected) return "";

  return (
    <div className="main-description">
      <Header />
      <div className="back-link">
        <Link to="/">
          <ArrowBackIosIcon style={{ fontSize: "20px" }} />
          BACK TO THE COMICS
        </Link>
      </div>
      <div className="grid-description">
        <div></div>
        <div className="body-description">
          <img className="comic-img" src={thumbnail} alt={title} />
          <div className="about">
            <div className="comic-title">{title}</div>
            <div className="info">
              <DescriptionBox title="Format" subtitle={format} />
              <DescriptionBox />
              <DescriptionBox title="Price" subtitle={prices[0]?.price} />
              <DescriptionBox />
            </div>
            <div className="description-box">
              <div>Pages number:</div>
              <span>{comicSelected.pageCount}</span>
            </div>
            {characters.length > 0 && (
              <div className="description-box">
                <div>Characters:</div>
                {characters.map((character, index) => (
                  <span key={character.name}>
                    {character.name}
                    {index + 1 < characters.length && ", "}
                  </span>
                ))}
              </div>
            )}
            <div className="description-box">
              <div className="title">Creators:</div>
              {creators.map((creator, index) => (
                <span key={creator.name}>
                  {creator.name}: {creator.role}
                  {index + 1 < creators.length && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export { Description };
