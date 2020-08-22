import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";
import styles from "../../config/styles";

function SubmitButton({ title, style, size }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button title={title} style={style} size={size} onPress={handleSubmit} />
  );
}

export default SubmitButton;
