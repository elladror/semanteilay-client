import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/socket";
import { Team, User } from "../../models";
import PlayersPopover from "../playersPopover";
import Rank from "../rank";

interface Props {
  team: Team;
  joinTeam: () => void;
  currentUser: User;
  disabled: boolean;
  leaveTeam: () => void;
  show: boolean;
}

const countToWord = ["st", "nd", "rd"];

const TeamComponent: FC<Props> = ({ team, joinTeam, currentUser, disabled, leaveTeam, show }) => {
  const isCurrentTeam = currentUser.teamId === team.id;
  const { name, topGuess, _count } = team;
  const counter = useRef<HTMLElement>(null);
  const socket = useContext(SocketContext);
  const [guessCount, setGuessCount] = useState(_count.guesses);

  useEffect(() => {
    const incrementGuessCount = ({ teamId, count }: { teamId: string; count: number }) => {
      if (team.id === teamId) setGuessCount((value) => (count > value ? count : value));
    };

    socket.on("guessCountUpdate", incrementGuessCount);

    return () => {
      socket.off("guessCountUpdate", incrementGuessCount);
    };
  }, [socket, team.id]);

  return (
    <Card raised={true} hidden={!show} sx={{ width: "12.5rem" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", pb: "1rem" }}>
          <Typography
            fontWeight="500"
            variant="body1"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>{" "}
          <PlayersPopover memberCount={_count.members} members={team.members} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: "0.5rem",
            px: "1rem",
          }}
        >
          <Avatar
            sx={{
              width: "2.5rem",
              height: "2.5rem",
              fontSize: "0.8rem",
              visibility: topGuess.score === 0 ? "hidden" : "initial",
            }}
          >
            {topGuess.score}
          </Avatar>
          {guessCount !== 0 && (
            <Typography>
              <span ref={counter} key={guessCount} className="flip-animate">
                <span data-hover={guessCount}>{guessCount}</span>
                {countToWord[guessCount - 1] ?? "th"} guess
              </span>
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", height: "1rem" }}>
          {topGuess.rank < 0 ? (
            <Typography fontSize={"0.75rem"}>
              {topGuess.score === 0 ? "(יאללה להתחיל לנחש)" : `(לא מתקרבים פה אפילו)`}
            </Typography>
          ) : (
            <Box sx={{ width: "10rem" }}>
              <Rank rank={topGuess.rank}></Rank>
            </Box>
          )}
        </Box>
      </CardContent>
      <CardActions>
        {!isCurrentTeam ? (
          <Button disabled={disabled} size="small" onClick={joinTeam}>
            Join
          </Button>
        ) : (
          <Button size="small" onClick={leaveTeam} color="error">
            Leave
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default TeamComponent;
