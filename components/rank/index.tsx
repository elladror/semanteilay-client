import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface RankProps {
  rank: number;
}

const Rank: FC<RankProps> = ({ rank }) => {
  return rank < 0 ? (
    <Box sx={{ height: 20 }}>(קר)</Box>
  ) : (
    <Box sx={{ position: "relative", display: "inline-flex", width: "100%" }}>
      <LinearProgress
        color="success"
        sx={{ height: 20, width: "100%" }}
        variant="determinate"
        value={rank / 10}
      />
      <Box
        sx={{
          left: 0,
          right: 0,
          top: "50%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          alignContent={"center"}
          variant="caption"
          component="div"
          color="#f8ebeb"
          sx={{ lineHeight: 0 }}
        >{`${rank} / 1000`}</Typography>
      </Box>
    </Box>
  );
};

export default Rank;
