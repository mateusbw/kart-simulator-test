import React from "react";
import PropTypes from "prop-types";
import "./ErrorBar.scss";

const ErrorBar = ({ errorMessage, showError, retryCallback }) => {
  return (
    <div className={`error-bar ${showError ? "enter" : "leave"}`}>
      <span>
        {errorMessage}{" "}
        <button className="retry" type="button" onClick={() => retryCallback()}>
          Try Again
        </button>
      </span>
    </div>
  );
};

ErrorBar.propTypes = {
  errorMessage: PropTypes.string,
  showError: PropTypes.bool,
  retryCallback: PropTypes.func.isRequired,
};

ErrorBar.defaultProps = {
  errorMessage: "",
  showError: false,
};

export default ErrorBar;
