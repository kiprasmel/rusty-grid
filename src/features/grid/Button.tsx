import { FC } from "react";
import { css, cx } from "emotion";

export type ButtonProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, ...rest }) => (
	<button
		type="button"
		{...rest}
		className={cx(
			css`
				/* font-size: 1.5rem; */
				font-size: 1.75rem;
				/* padding: 0.4rem 1rem; */
				padding: 0.6rem 1.5rem;

				letter-spacing: -0.02em;
				border-radius: 8px;

				background-color: hsl(220, 100%, 60%);
				color: white;

				&:hover {
					background-color: hsl(220, 100%, 75%);
					transition: background-color 0.2s ease-in-out;
				}

				&:focus {
					background-color: hsl(220, 100%, 35%);
				}
			`,
			rest.className
		)}
	>
		{children}
	</button>
);
