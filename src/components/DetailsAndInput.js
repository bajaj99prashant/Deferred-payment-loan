import React from "react";
import "../css/detailsInput.css";
import MainContent from "./MainContent";
import OutputScreen from "./OutputScreen";

const DetailsAndInput = () => {
  return (
    <div className="details-area">
      <MainContent />
      <OutputScreen />
    </div>
  );
};

export default DetailsAndInput;
