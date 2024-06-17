export function encrypt(text, key) {
	return [...text]
		.map((x, i) => (x.codePointAt() ^ key.charCodeAt(i % key.length) % 255).toString(16).padStart(2, '0'))
		.join('');
}