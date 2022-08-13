import { FC, MouseEventHandler } from "react";
import styles from "./rooms.module.css";
import Typography from "@mui/material/Typography";
import { Room } from "../../models";
import { useRooms } from "../../hooks/useRooms";
import { Skeleton } from "@mui/material";

interface RoomsProps {
  rooms: Room[];
}

const Rooms: FC<RoomsProps> = ({ rooms }) => {
  const { joinRoom } = useRooms();

  const enterRoom =
    (roomId: string): MouseEventHandler<HTMLDivElement> =>
    (_event) => {
      joinRoom(roomId);
    };

  return (
    <div className={styles.grid}>
      {!rooms
        ? [1, 2, 3, 4].map((key) => <Skeleton key={key} className={styles.card} />)
        : rooms.map(({ id: roomId, name }) => {
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
