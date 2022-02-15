import { forwardRef } from "react";

const AutoExpandTextArea = forwardRef((props, ref) => {
  const areaProps = { ...props };
  return (
    <textarea
      ref={ref}
      {...areaProps}
      style={{ overflow: "hidden" }}
      onChange={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }}
    ></textarea>
  );
});

export default AutoExpandTextArea;
