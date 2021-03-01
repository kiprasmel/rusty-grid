import { css } from "emotion";
import { FC } from "react";

export const Label: FC<{ label: string }> = ({ label, children }) => (
	<div
		className={css`
			display: flex;
			flex-direction: column;

			align-items: flex-start;

			& > * + * {
				margin-top: 0.25em;
			}
		`}
	>
		<p
			className={css`
				margin: 0;
				padding: 0;

				font-size: 1.5em;
			`}
		>
			{label}
		</p>

		{children}
	</div>
);
