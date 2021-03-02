/* eslint-disable @typescript-eslint/no-var-requires, no-param-reassign */

/**
 * @param {string} url
 * @returns {string}
 */
const fixHomepageUrl = (url) => {
	if (url[0] !== "/") {
		if ([".", "./"].includes(url)) {
			url = "/";
		} else if ([".", "./"].includes(url[0])) {
			url = url.substring(1);
		} else {
			url = `/${url}`;
		}
	}

	if (url[url.length - 1] !== "/") {
		url = `${url}/`;
	}

	return url;
};

/**
 * @type string
 */
const homepageUrl = fixHomepageUrl(require("../package.json").homepage);

module.exports = {
	homepageUrl,
};
