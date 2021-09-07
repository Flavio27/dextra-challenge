import { useEffect, useState } from "react";
import { StylesProvider } from "@material-ui/core/styles";
import { useComic } from "../../hooks/useComic";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ListIcon from "@material-ui/icons/List";
import "./styles.scss";

function CharacterModal({ character, open, setOpen }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const heroID = character?.id;
  const heroName = character?.name;
  const heroDescription = character?.description;
  const heroImg = `${character?.thumbnail?.path}.${character?.thumbnail?.extension}`;
  const URL_PATH = window.location.pathname;

  const { setAddToFavorite } = useComic();

  const handleClose = () => {
    setOpen(false);
  };

  const checkIsFavorite = () => {
    const favorites = localStorage.getItem("favorite-heroes");
    if (favorites === "[]" || !favorites) {
      setIsFavorite(false);
      return localStorage.setItem("favorite-heroes", "[]");
    }
    if (JSON.parse(favorites.includes(heroName))) {
      return setIsFavorite(true);
    }
    return setIsFavorite(false);
  };

  const addToFavorite = () => {
    let oldData = JSON.parse(localStorage.getItem("favorite-heroes"));
    const hero = {
      id: heroID,
      name: heroName,
      thumbnail: character?.thumbnail,
      description: heroDescription,
      img: heroImg,
      addAt: new Date(),
    };

    if (isFavorite) {
      let newData = oldData.filter((favorite) => favorite.name !== heroName);
      localStorage.setItem("favorite-heroes", JSON.stringify(newData));
      setAddToFavorite(newData);
    } else {
      let newData = [...oldData, hero];
      localStorage.setItem("favorite-heroes", JSON.stringify(newData));
      setAddToFavorite(newData);
    }
    checkIsFavorite();
  };

  useEffect(() => {
    checkIsFavorite();
  }, [open]);

  return (
    <StylesProvider injectFirst>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          className="modal"
          PaperProps={{ style: { borderRadius: 0, background: "#dddddd" } }}
        >
          <div className="hero-name">
            <span>{heroName}</span>
            {isFavorite && (
              <FavoriteIcon style={{ fontSize: "2.5rem", color: "red" }} />
            )}
          </div>
          <DialogContent className="hero-content">
            <img className="hero-img" src={heroImg} alt={heroName} />
            <DialogContentText
              id="alert-dialog-description"
              className="hero-text"
            >
              {character?.description ||
                "This hero doesn't have any description..."}
              <div
                className={`favorite ${isFavorite && "isFavorite"}`}
                onClick={addToFavorite}
              >
                <FavoriteIcon style={{ fontSize: "2.5rem" }} />
                <span>
                  {isFavorite ? "Remove favorite" : "Add to favorite"}
                </span>
              </div>
              {URL_PATH === "/" && (
                <div className="list">
                  <ListIcon style={{ fontSize: "2.5rem" }} />
                  <Link to="/comics/favorites">Your favorite list</Link>
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </StylesProvider>
  );
}

export { CharacterModal };
