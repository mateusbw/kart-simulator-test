import React from "react";
import "./Page.scss";
import PropTypes from "prop-types";
import ErrorBar from "../components/errorBar/ErrorBar";
import HookWraper from "../../state/hooks";

const Page = ({ children }) => {
  const hookWraper = new HookWraper();
  const error = hookWraper.useRacingErrorReatriver();
  const retryCallback = () => {
    hookWraper.useRetryErrorDispatch();
  };
  return (
    <div className="page">
      <ErrorBar
        errorMessage={error}
        showError={!!error}
        retryCallback={retryCallback}
      />
      <h1 className="title">Kart Racing Simulator</h1>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;
