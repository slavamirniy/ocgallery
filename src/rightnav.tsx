import React from "react";
import SVG from "./svg";

const RightNav = React.memo(({ disabled, onClick } : {disabled: boolean, onClick: any}) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-right-nav"
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous Slide"
    >
      <SVG icon="right" viewBox="6 0 12 24" />
    </button>
  );
});

RightNav.displayName = "RightNav";

export default RightNav;