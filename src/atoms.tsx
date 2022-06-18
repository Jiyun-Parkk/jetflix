import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
export interface IToDoState {
	[key: string]: ITodo[];
}
export interface ITodo {
	id: number;
	text: string;
}
const { persistAtom } = recoilPersist({ key: "DragDropTodo" });
export const toDoState = atom<IToDoState>({
	key: "toDo",
	default: {
		"To Do": [],
		Doing: [],
		Done: [],
	},
	effects_UNSTABLE: [persistAtom],
});
