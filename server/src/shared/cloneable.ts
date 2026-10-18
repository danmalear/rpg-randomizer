export interface ICloneable<T extends ICloneable<T>> {
	clone(): T;
}
