import styles from './Button.module.css';

export interface IButton {
  text: string;
  onClick: () => void;
}

export const Button = ({
  text,
  onClick,
}: IButton) => {
  return (
    <button className={styles.button} onClick={onClick}>{text}</button>
  );
};
