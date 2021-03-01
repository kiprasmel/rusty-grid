import { FC } from "react";
import { css, cx } from "emotion";

export type ButtonProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, ...rest }) => (
	<button
		type="button"
		{...rest}
		className={cx(
			css`
				font-size: 1.5em;
				padding: 0.4em 1em;

				border-radius: 8px;

				background-color: hsl(220, 100%, 60%);
				color: white;
			`,
			rest.className
		)}
	>
		{children}
	</button>
);
