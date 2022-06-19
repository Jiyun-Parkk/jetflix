import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import App from "./App";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const client = new QueryClient();
root.render(
	<RecoilRoot>
		<QueryClientProvider client={client}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</QueryClientProvider>
	</RecoilRoot>
);
