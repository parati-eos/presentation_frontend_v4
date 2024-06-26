import React from "react";

const Business = ({ formData, handleChange }) => {
  return (
    <>
      <div className="textInputQuestions">
        <label htmlFor="businessModel">
          What is your business model? Please describe your revenue streams.*
        </label>
        <textarea
          style={{ height: "310px" }}
          id="businessModel"
          name="businessModel"
          value={formData.businessModel}
          onChange={handleChange}
          rows={5}
          cols={50}
          required
        />
      </div>
      <br />
    </>
  );
};

export default Business;
