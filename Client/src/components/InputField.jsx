import React from "react";

export default function InputField({
  label,
  type = "text",
  placeHolder,
  value,
  onChange,
  name,
}) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        placeHolder={placeHolder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </>
  );
}
