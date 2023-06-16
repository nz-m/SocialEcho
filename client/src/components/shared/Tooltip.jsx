const Tooltip = ({ text, children }) => {
  return (
    <span className="tooltip">
      {children}
      <span className="tooltiptext">{text}</span>
    </span>
  );
};

export default Tooltip;
