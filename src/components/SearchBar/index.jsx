import { useEffect, useState } from "react";
import { API_AUTHENTICATION } from "../../services/api";
import { CharacterModal } from "../CharacterModal";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Aos from "aos";
import "./styles.scss";
import "aos/dist/aos.css";

function SearchBar({ isDark }) {
  const [herosFound, setHerosFound] = useState([]);
  const [heroName, setHeroName] = useState([]);
  const [heroSelected, setHeroSelected] = useState("");
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <SearchIcon className="search-icon" style={{ fontSize: "35px" }} />
        <input
          className={`search-input ${isDark && "dark"}`}
          type="text"
          placeholder="SEARCH A HERO NAME ..."
          onChange={(e) => setHeroName(e.target.value)}
        />
      </div>
      {herosFound.length > 0 && heroName.length > 0 && (
        <div className={`foundHeros ${isDark && "dark"}`}>
          {herosFound.map((hero) => (
            <div key={hero?.name} onClick={() => onSelectHeroFound(hero)}>
              {hero.name}
            </div>
          ))}
        </div>
      )}
      <CharacterModal character={heroSelected} open={open} setOpen={setOpen} />
    </div>
  );
}

export {SearchBar};
