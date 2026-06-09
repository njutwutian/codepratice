import { Role } from "./Role.js";

export interface HistoryItem {
    role: Role;
    content: string;
}