import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		red: string;
		black: {
			veryDar: string;
			darker: string;
			lighter: string;
		};
		white: {
			lighter: string;
			darker: string;
		};
	}
}
