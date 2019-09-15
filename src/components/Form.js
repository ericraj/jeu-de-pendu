import React from "react";

function Form({ currentWord, currentUser, handleChangeInput, formErrors }) {
  return (
    <div className="form">
      {currentWord === null && (
        <input
          className={formErrors.username !== "" ? "hasError" : null}
          type="text"
          name="username"
          value={currentUser.usename}
          onChange={handleChangeInput}
          placeholder="Pseudo"
        />
      )}
      <br />
      {formErrors.username !== "" && <span className="errorMessage">{formErrors.username}</span>}
    </div>
  );
}

export default Form;
