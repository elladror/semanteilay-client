import { useRouter } from "next/router";
import { FC } from "react";
import { useRoom } from "../../hooks/useRoom";
import Skeleton from "react-loading-skeleton";
import Guesses from "../../components/guesses";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Teams from "../../components/teams";

const Room: FC = () => {
  const router = useRouter();
  const { room, isLoading, isError, leaveRoom } = useRoom(
    (router.query.id as string) ?? "-"
  );

  if (isLoading || isError)
    return (
      <h1>
        <Skeleton />
      </h1>
    );
  // TODO: add proper handling

  return (
    <>
      <IconButton
        color="secondary"
        onClick={leaveRoom}
        sx={{ alignSelf: "flex-start" }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h3">
        <span key={room.participantCount} className="flip-animate">
          {room.name} With{" "}
          <span data-hover={room.participantCount}>
            {room.participantCount}
          </span>{" "}
          Players
        </span>
      </Typography>
      <hr />
      <Teams room={room} />
      {/* {room.teams.map((team) => {
        return (
          <Typography variant="h5" key={team.id} onClick={() => switchTeam(team.id)}>
            {team.name}
          </Typography>
        );
      })} */}
      <Guesses />
    </>
  );
};

export default Room;
