import React from "react";
import "./Page.scss";
import PropTypes from "prop-types";

const Page = ({ children }) => {
  return (
    <div className="page">
      <h1 className="title">Kart Racing Simulator</h1>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
