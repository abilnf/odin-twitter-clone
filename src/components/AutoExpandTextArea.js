function AutoExpandTextArea(props) {
  const areaProps = { ...props };
  return (
    <textarea
      {...areaProps}
      style={{ overflowY: "hidden" }}
      onChange={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }}
    ></textarea>
  );
}

export default AutoExpandTextArea;
