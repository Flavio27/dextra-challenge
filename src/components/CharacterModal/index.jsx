import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { StylesProvider } from "@material-ui/core/styles";
import "./styles.scss";


function CharacterModal({ character, open, setOpen }) {
  const heroImg =
    `${character?.thumbnail?.path}.${character?.thumbnail?.extension}` || "";

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StylesProvider injectFirst>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          className="modal"
          PaperProps={{ style: { borderRadius: 0, background: "#dddddd" } }}
        >
          <div className="hero-name">{character?.name}</div>
          <DialogContent className="hero-content">
            <img className="hero-img" src={heroImg} alt={character?.name} />
            <DialogContentText
              id="alert-dialog-description"
              className="hero-text"
            >
              {character?.description ||
                "This hero doesn't have any description..."}
              <div className="favorite">
                <FavoriteIcon style={{ fontSize: "40px" }} />
                Add to favorite heros
              </div>
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
