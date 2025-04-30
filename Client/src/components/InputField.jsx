import React from "react";

export default function InputField({
  label,
  type = "text",
  placeHolder,
  value,
  onChange,
  name,
  autoComplete = "off",
}) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeHolder}
        value={value}
        name={name}
        onChange={onChange}
        required
        autoComplete={autoComplete}
      />
    </>
  );
}
