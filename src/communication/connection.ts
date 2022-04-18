import { io } from "socket.io-client";
import { serverURL } from "./settings";

export const socket = io(serverURL);