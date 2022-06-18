import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		bgColor: string;
		boardColor: string;
		cardColor: string;
		titleColor: string;
		highlightColor: string;
		highlightColor2: string;
		isDraggingColor: string;
	}
}
