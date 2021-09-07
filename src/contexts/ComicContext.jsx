import { createContext, useState } from "react";

const ComicContext = createContext();

export function ComicContextProvider({ children }) {
  const [comicSelected, setComicSelected] = useState(false);
  const [addToFavorite, setAddToFavorite] = useState(false);

  return (
    <ComicContext.Provider
      value={{
        comicSelected,
        setComicSelected,
        addToFavorite,
        setAddToFavorite,
      }}
    >
      {children}
    </ComicContext.Provider>
  );
}

export const ComicConsumer = ComicContext.Consumer;

export default ComicContext;
