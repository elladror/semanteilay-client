import Typography from "@mui/material/Typography";
import { FC } from "react";
import styles from "./title.module.css";

interface TitleProps {
  children: string;
}

const Title: FC<TitleProps> = (props) => (
  <Typography variant="h1" className={styles.title}>
    Welcome to <a>{props.children}</a>
  </Typography>
);

export default Title;
