export function formatTextToHyphen(text) {
	// Replace non-alphanumeric characters with hyphens
	return text.replace(/\W+/g, '-').toLowerCase();
}
