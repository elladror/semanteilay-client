import { Box, LinearProgress } from "@mui/material";
import { FC } from "react";

interface RankProps {
  rank: number;
}

const Rank: FC<RankProps> = ({ rank }) => {
  return ( rank < 0 ? <></> :
    <LinearProgress color="success" sx={{height: 20}} variant="determinate" value={rank / 10} />
  );
};

export default Rank;
