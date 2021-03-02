import { FC } from "react";
import { css, cx } from "emotion";

export type RowProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export const Row: FC<RowProps> = ({ children, ref, ...rest }) => (
	<div
		{...rest}
		className={cx(
			css`
				display: flex;

				justify-content: center;
				align-items: center;

				/* & > * {
				flex: 1;
			} */
			`,
			rest.className
		)}
	>
		{children}
	</div>
);
