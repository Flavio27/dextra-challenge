import { useEffect, useState } from "react";
import { API_AUTHENTICATION } from "../../services/api";
import { CharacterModal } from "../CharacterModal";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Aos from "aos";
import "./styles.scss";
import "aos/dist/aos.css";

function SearchBar() {
  const [herosFound, setHerosFound] = useState([]);
  const [heroName, setHeroName] = useState([]);
  const [heroSelected, setHeroSelected] = useState("test");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Aos.init({});
  }, []);

  const onSelectHeroFound = (hero) => {
    setHeroSelected(hero);
    setHerosFound(0);
    setOpen(true);
  };

  useEffect(() => {
    const getCharacter = async () => {
      const result = await axios(
        `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${heroName}&${API_AUTHENTICATION}`
      );
      setHerosFound(result.data.data.results);
    };
    if (heroName.length > 0) return getCharacter();
  }, [heroName]);

  return (
    <div className="searchBar-container">
      <SearchIcon className="search-icon" style={{ fontSize: "35px" }} />
      <input
        className="search-input"
        type="text"
        placeholder="SEARCH A HERO NAME ..."
        onChange={(e) => setHeroName(e.target.value)}
      />
      {herosFound.length > 0 && heroName.length > 0 && (
        <div className="foundHeros">
          {herosFound.map((hero) => (
            <div key={hero?.name} onClick={() => onSelectHeroFound(hero)} oncli>
              {hero.name}
            </div>
          ))}
        </div>
      )}
      <CharacterModal character={heroSelected} open={open} setOpen={setOpen} />
    </div>
  );
}

export default SearchBar;
