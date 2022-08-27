import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { FC } from "react";

interface RankProps {
  rank: number;
}

const Rank: FC<RankProps> = ({ rank }) => {
  return rank < 0 ? (
    <Box sx={{ height: 20 }}></Box>
  ) : (
    <LinearProgress color="success" sx={{ height: 20 }} variant="determinate" value={rank / 10} />
  );
};

export default Rank;
