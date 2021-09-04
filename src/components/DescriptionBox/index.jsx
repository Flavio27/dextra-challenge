import "./styles.scss"

function DescriptionBox({ title, subtitle }) {
  return (
    <div className="box-description">
      <div className="box-title">{title}</div>
      <div className="box-subtitle">
        {title === "Price" && "$"}{subtitle}
        </div>
    </div>
  );
}

export { DescriptionBox };
