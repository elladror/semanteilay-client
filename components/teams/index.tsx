import { Box, Button } from "@mui/material";
import { FC, useCallback, useState } from "react";
import useTeam from "../../hooks/useTeam";
import useUser from "../../hooks/useUser";
import { Room } from "../../models";
import TeamComponent from "../teamComponent";

interface Props {
  room: Room;
  isUserTeamInRoom: boolean;
}

const Teams: FC<Props> = ({ room, isUserTeamInRoom }) => {
  const { switchTeam, leaveTeam, createTeam } = useTeam(room);
  const { user } = useUser();
  const [isLoading, setLoading] = useState(false);

  const joinTeamHandler = useCallback(
    (teamId: string) => async () => {
      setLoading(true);
      await switchTeam(teamId);
      setLoading(false);
    },
    [switchTeam]
  );

  const leaveTeamHandler = useCallback(async () => {
    setLoading(true);
    await leaveTeam();
    setLoading(false);
  }, [leaveTeam]);

  return (
    <>
      <Box
        sx={{
          display: { xs: "-webkit-box", sm: "flex" },
          pb: "2rem",
          gap: 1,
          maxWidth: { xs: 350, sm: 600, md: 900, lg: 1100 },
          scrollSnapType: "x mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          flexWrap: { sm: "wrap" },
          justifyContent: { sm: "space-evenly" },
          overflow: { xs: "auto", sm: "initial" },
          ":last-child": { paddingInlineEnd: 1 },
          "&::-webkit-scrollbar": {
            width: "0.5em",
          },
        }}
      >
        {room.teams.map((team) => (
          <TeamComponent
            key={team.id}
            team={team}
            disabled={isLoading}
            joinTeam={joinTeamHandler(team.id)}
            leaveTeam={leaveTeamHandler}
            currentUser={user}
          ></TeamComponent>
        ))}
      </Box>
      {isUserTeamInRoom ? (
        <></>
      ) : (
        <Button
          variant="outlined"
          color="success"
          sx={{ display: "flex", alignContent: "center", textAlign: "center" }}
          onClick={() => {
            createTeam(room.id);
          }}
        >
          create team
        </Button>
      )}
    </>
  );
};

export default Teams;
