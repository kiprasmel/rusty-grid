import { FC } from "react";
import { css, cx } from "emotion";

export type BoxProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Box: FC<BoxProps> = ({ children, ref, ...rest }) => (
	<div
		{...rest}
		className={cx(
			css`
				display: flex;

				justify-content: center;
				align-items: center;

				margin: 0;
				padding: 0;

				/* width: 80px; */
				min-width: 80px;
				min-height: 80px;

				background-color: hsl(0, 0%, 90%);
				border: 1px solid hsla(0, 0%, 50%, 0.5);
			`,
			rest.className
		)}
	>
		{children}
	</div>
);
