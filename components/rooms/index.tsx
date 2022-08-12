import { FC, MouseEventHandler } from "react";
import styles from "./rooms.module.css";
import Typography from "@mui/material/Typography";
import { Room, User } from "../../models";
import { useRooms } from "../../hooks/useRooms";

interface RoomsProps {
  user: User;
  rooms: Room[];
  changeTeam: (teamId: string) => void;
}

const Rooms: FC<RoomsProps> = ({ rooms, changeTeam, user }) => {
  const { joinRoom } = useRooms({ changeTeam, user });

  const enterRoom =
    (roomId: string): MouseEventHandler<HTMLDivElement> =>
    (_event) => {
      joinRoom(roomId);
    };

  return (
    <div className={styles.grid}>
      {rooms.map(({ id: roomId, name }) => {
        return (
          <div key={roomId} className={styles.card} onClick={enterRoom(roomId)}>
            <Typography variant="h2">{name}</Typography>
          </div>
        );
      })}
    </div>
  );
};

export default Rooms;
