import React from "react";
import PropTypes from "prop-types";

const Input = ({
  placeholder,
  errorMessage,
  hasError,
  onChange,
  type,
  name,
  inputRef,
  label,
  id
}) => {
  return (
    <>
      <label htmlFor={id} className="label">{label} </label>
      <input
        id={id}
        className="input"
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        name={name}
      />
      {hasError ? (
        <span className="error-message" data-test-id="error-input-message">
          {errorMessage}
        </span>
      ) : (
        ""
      )}
    </>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Input.defaultProps = {
  placeholder: "",
  errorMessage: "",
  label: "",
  hasError: false,
  onChange: () => {},
  type: "text",
};

export default Input;
