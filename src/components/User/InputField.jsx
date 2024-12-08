import { useState } from "react";

const InputField = ({ type, placeholder, icon }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={isPasswordShown ? "text" : type}
        placeholder={placeholder}
        className="input-field"
        required
      />
      <i className={`fa ${icon}`}></i>
      {type === "password" && (
        <i
          onClick={() => setIsPasswordShown((prevState) => !prevState)}
          className="material-symbols-rounded eye-icon"
        >
          {isPasswordShown ? (
            <i className={`fa fa-eye`}></i>
          ) : (
            <i className={`fa fa-eye-slash`}></i>
          )}
        </i>
      )}
    </div>
  );
};

export default InputField;
