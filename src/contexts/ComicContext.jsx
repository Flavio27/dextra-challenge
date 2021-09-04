import { createContext, useState } from "react";

const ComicContext = createContext();

export function ComicContextProvider({ children }) {
  const [comicSelected, setComicSelected] = useState(false);


  return (
    <ComicContext.Provider
      value={{
        comicSelected,
        setComicSelected,
      }}
    >
      {children}
    </ComicContext.Provider>
  );
}

export const ComicConsumer = ComicContext.Consumer;

export default ComicContext;
