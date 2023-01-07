import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FC, useCallback, useMemo } from "react";
import useTeam from "../../hooks/useTeam";
import useUser from "../../hooks/useUser";
import { Room } from "../../models";
import TeamComponent from "../teamComponent";
import TeamComponentAlt from "../teamComponentAlt";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useDetectIOS from "../../hooks/useDetectIOS";
import useApi from "../../hooks/useApi";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
interface Props {
  room: Room;
  isUserTeamInRoom: boolean;
  isGuessing: boolean;
}

const Teams: FC<Props> = ({ room, isUserTeamInRoom, isGuessing }) => {
  const { switchTeam, leaveTeam, createTeam } = useTeam(room);
  const { user } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isIOS = useDetectIOS();
  const [joinTeamRequest, isJoinTeamLoading] = useApi(switchTeam);
  const [leaveTeamRequest, isLeaveTeamLoading] = useApi(leaveTeam);
  const [createTeamRequest, isCreateTeamLoading, createTeamError] = useApi(createTeam);

  const isLoading = isJoinTeamLoading || isLeaveTeamLoading || isCreateTeamLoading;

  const joinTeamHandler = useCallback(
    (teamId: string) => () => {
      joinTeamRequest(teamId).catch((_e) => {
        //
      });
    },
    [joinTeamRequest]
  );

  const leaveTeamHandler = useCallback(() => {
    leaveTeamRequest().catch((_e) => {
      //
    });
  }, [leaveTeamRequest]);

  const createTeamHandler = useCallback(
    (roomId: string) => () => {
      createTeamRequest(roomId).catch((_e) => {
        //
      });
    },
    [createTeamRequest]
  );

  const topTeamId = useMemo(
    () =>
      room.teams.reduce((topTeam, currentTeam) =>
        topTeam.topGuess.score >= currentTeam.topGuess.score ? topTeam : currentTeam
      ).id,
    [room.teams]
  );

  return (
    <>
      <Box
        id={"teams"}
        sx={{
          display: { xs: "-webkit-box", sm: "flex" },
          pb: "1rem",
          pt: "3rem",
          mt: "-1.5rem",
          paddingInline: "1rem",
          gap: 2,
          maxWidth: { xs: 350, sm: 600, md: 900, lg: 1100 },
          scrollSnapType: "x mandatory",
          "& > *": {
            scrollSnapAlign: "center",
          },
          flexWrap: { sm: "wrap" },
          justifyContent: { sm: "space-evenly" },
          overflowX: { xs: "auto", sm: "initial" },
          ":last-child": { paddingInlineEnd: 1 },
          "&::-webkit-scrollbar": {
            width: "0.5em",
          },
        }}
      >
        {room.teams.map((team) => (
          <Box key={team.id}>
            <TeamComponentAlt
              show={isGuessing && isMobile && !isIOS}
              team={team}
              isLeading={topTeamId === team.id}
            ></TeamComponentAlt>
            <TeamComponent
              show={!(isGuessing && isMobile && !isIOS)}
              team={team}
              disabled={isLoading}
              joinTeam={joinTeamHandler(team.id)}
              leaveTeam={leaveTeamHandler}
              currentUser={user}
              isLeading={topTeamId === team.id}
            ></TeamComponent>
          </Box>
        ))}
      </Box>
      {isUserTeamInRoom ? (
        <></>
      ) : (
        <Box>
          <Button
            variant="outlined"
            color="success"
            sx={{ display: "flex", alignContent: "center", textAlign: "center" }}
            onClick={createTeamHandler(room.id)}
            disabled={isCreateTeamLoading}
          >
            create team
          </Button>
          {createTeamError && (
            <Alert severity="error">
              <AlertTitle>could not create team</AlertTitle>
              {createTeamError.message}
            </Alert>
          )}
        </Box>
      )}
    </>
  );
};

export default Teams;
