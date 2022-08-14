import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useRoom } from "../../hooks/useRoom";
import Guesses from "../../components/guesses";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Teams from "../../components/teams";
import Box from "@mui/material/Box";

const Room: FC = () => {
  const router = useRouter();
  const { room, isLoading, isError, leaveRoom } = useRoom((router.query.id as string) ?? "-");
  const participantCount = useMemo(
    () =>
      room?.teams.reduce((participantCount, team) => {
        return participantCount + (team._count?.members ?? 0);
      }, 0) ?? 0,
    [room?.teams]
  );

  if (isLoading || isError) return <h1></h1>;
  // TODO: add proper handling

  return (
    <>
      <IconButton color="secondary" onClick={leaveRoom} sx={{ alignSelf: "flex-start" }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h3">
        <span key={participantCount} className="flip-animate">
          {room.name} With <span data-hover={participantCount}>{participantCount}</span> Players
        </span>
      </Typography>
      <hr />
      <Guesses />
      <Box sx={{ my: 4 }}></Box>
      <Teams room={room} />
    </>
  );
};

export default Room;
