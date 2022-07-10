import React, {ReactChild} from "react";
import styles from "./Button.module.css";
import classNames from "classnames";

type ButtonPros = {
  style?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: ReactChild;
};

const Button: React.FC<ButtonPros> = ({style, type, onClick, children}) => {
  return (
    <button
      className={classNames(styles.button, style)}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
