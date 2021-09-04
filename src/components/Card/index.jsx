import { useHistory } from "react-router";
import { useComic } from "../../hooks/useComic";
import "./styles.scss";

function Card({ props }) {
  const { setComicSelected } = useComic();
  const history = useHistory();
  const { title, thumbnail, creators: { items }} = props;

  const authors = items || [];
  const cardImg = `${thumbnail?.path}.${thumbnail?.extension}` || ""

  const getAuthors = () => {
    if (authors.length >= 2) return `${authors[0].name}, ${authors[1].name}`;
    if (authors.length === 0) return "";
    return authors[0].name;
  };

  const selectComic = () => {
    setComicSelected(props)
    history.push("/description")
  }

  return (
    <div className="card-container" onClick={selectComic}>
      <img
        className="thumbnail"
        src={cardImg}
        alt={props?.title}
      />
      <div className="description">
        <div className="title">{title || "Title"}</div>
        <div className="author">{getAuthors()}</div>
      </div>
    </div>
  );
}

export { Card };
