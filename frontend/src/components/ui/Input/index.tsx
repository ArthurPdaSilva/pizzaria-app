import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./styles.module.scss";

// Posso receber todo o conteudo que é tipo input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Input({ ...rest }: InputProps) {
  return <input className={styles.input} type="text" {...rest} />;
}

export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea className={styles.input} {...rest}></textarea>;
}
