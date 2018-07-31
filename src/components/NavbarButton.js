import React from "react";
import "../styles/StreamsGallery/StreamsGallery.scss";

const NavbarButton = props => {
  return (
    <button tabIndex="0" onClick={props.handler} className={props.className}>
      {props.buttonText}
    </button>
  );
};

export default NavbarButton;
