export function getNativeTypeOf(param) {
	return Object.prototype.toString.call(param).split(' ')[1].replace(']', '').toLowerCase();
}
