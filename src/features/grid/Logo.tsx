import { css } from "emotion";
import { homepageUrl } from "../../config";

export const Logo = () => (
	<article
		className={css`
			text-align: left;
		`}
	>
		<img
			src={`${homepageUrl}assets/grid-logo.png`}
			alt="Grid logo"
			className={css`
				max-width: 90vw;
			`}
		/>
	</article>
);
