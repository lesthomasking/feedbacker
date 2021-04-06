// SurveyField contains logic to render a single labl and text input
import React from "react";

//redux form contains a lot of event handlers by default
//we're passing those to this input object and wiring them up with ...input
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input style={{ marginBottom: "5px" }} {...input} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
