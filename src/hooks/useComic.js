import { useContext } from "react";
import ComicConsumer from "../contexts/ComicContext";

const useComic = () => useContext(ComicConsumer);

export { useComic };
