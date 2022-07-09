import React, { createContext, FC, ReactNode, useContext, useState } from "react"
import { User } from "../models";

export type UserContextType = {
  user: User,
  setUser: (user: User) => void
}

type Props = {
  children?: ReactNode
};

const emptyUser: User = { name: "", id: ""};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState(emptyUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useCurrentUser = () => useContext(UserContext)