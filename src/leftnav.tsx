import React from "react";
import SVG from "./svg";

const LeftNav = React.memo(({ disabled, onClick } : {disabled: boolean, onClick: any}) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-left-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <SVG icon="left" viewBox="6 0 12 24" />
    </button>
  );
});

LeftNav.displayName = "LeftNav";

export default LeftNav;