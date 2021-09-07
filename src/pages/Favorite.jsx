import { useEffect, useState } from "react";
import { CharacterModal } from "../components/CharacterModal";
import { SearchBar } from "../components/SearchBar";
import { useComic } from "../hooks/useComic";
import { Header } from "../components/Header";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import EventNoteIcon from "@material-ui/icons/EventNote";
import DeleteIcon from "@material-ui/icons/Delete";
import deadPool from "../assets/imgs/deadpool-favorites.png";
import "../styles/Favorite.scss";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function Favorite() {
  const MAX_LENGTH_DESCRIPTION = 41;
  const [heroSelected, setHeroSelected] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [heroModal, setHeroModal] = useState(false);
  const { addToFavorite } = useComic();

  const selectHero = (hero) => {
    setHeroSelected(hero);
    setHeroModal(true);
  };

  const sortFavoriteByTitle = () => {
    const favorite = JSON.parse(localStorage.getItem("favorite-heroes"));
    const orderedList = favorite.sort((a, b) => {
      return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
    });
    return setFavoriteList(orderedList);
  };

  const sortFavoriteByDate = (gameList) => {
    const favorite = JSON.parse(localStorage.getItem("favorite-heroes"));
    const orderedList = favorite.sort(function (a, b) {
      return new Date(b.addAt) - new Date(a.addAt);
    });
    return setFavoriteList(orderedList);
  };

  const deleteConfirm = (deleteAll) => {
    if (deleteAll) {
      localStorage.setItem("favorite-heroes", "[]");
      setFavoriteList([]);
      setModalDelete(false);
    } else {
      setModalDelete(false);
    }
  };

  const heroDescription = (description) => {
    if (description.length > MAX_LENGTH_DESCRIPTION)
      return `${description.slice(0, 41)}...`;
    if (!description) return "This hero doesn't have any description...";
    return description;
  };

  useEffect(() => {
    const getFavoriteList = () => {
      const favorite = JSON.parse(localStorage.getItem("favorite-heroes"));
      setFavoriteList(favorite);
    };
    getFavoriteList();
  }, [heroModal, addToFavorite]);

  return (
    <div className="favorite-container" title="favorite-heroes">
      <Header />
      <div className="back-link-comics">
        <Link to="/">
          <ArrowBackIosIcon style={{ fontSize: "20px" }} />
          BACK TO THE COMICS
        </Link>
      </div>
      <SearchBar isDark />

      <div className="heroes-cards">
        <div className="list-options">
          <div className="list-options">
            <div className="option" onClick={sortFavoriteByTitle}>
              <SortByAlphaIcon style={{ fontSize: "2.0rem" }} />
              <span>SORT BY NAME</span>
            </div>
            <div className="option" onClick={sortFavoriteByDate}>
              <EventNoteIcon style={{ fontSize: "2.0rem" }} />
              <span>SORT BY ADDED DATE</span>
            </div>
          </div>
          <div className="option" onClick={() => setModalDelete(true)}>
            <DeleteIcon style={{ fontSize: "2.0rem" }} />
            <span>DELETE ALL FAVORITES</span>
          </div>
        </div>
        <hr />
        <div className="grid-heros">
          {favoriteList.map((hero) => (
            <div
              key={hero.id}
              className="card-container-hero"
              onClick={() => selectHero(hero)}
            >
              <img className="thumbnail" src={hero.img} alt={hero.name} />
              <div className="description">
                <div className="title">{hero.name || ""}</div>
                <div className="author">
                  {heroDescription(hero?.description)}
                </div>
              </div>
            </div>
          ))}
        </div>
        {favoriteList.length < 1 && (
          <img
            src={deadPool}
            className="deadpool-img"
            alt="deadpool"
            data-aos="fade-left"
          />
        )}
      </div>
      {heroModal && (
        <CharacterModal
          character={heroSelected}
          open={heroModal}
          setOpen={setHeroModal}
        />
      )}
      {modalDelete && (
        <>
          <div className="bg-confirm" />
          <div className="confirm-delete" data-aos="zoom-in">
            <div className="delete-title">
              Are you sure to delete all your favorites heroes?
            </div>
            <div className="options">
              <div onClick={() => deleteConfirm(true)}>YES</div>
              <div onClick={() => deleteConfirm(false)}>NO</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export { Favorite };
