import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppContextProvider(props) {
	const [coach, setCoach] = useState(null);
	const [player, setPlayer] = useState(null);

	const context = {
		coach,
		setCoach,
		player,
		setPlayer,
	};

	return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
}
