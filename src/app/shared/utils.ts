export const deepClone = <T>(source: T): T =>
  JSON.parse(JSON.stringify(source));
export const isDefined = (value: any): boolean =>
  value !== undefined && value !== null;
export const isObject = (value: any): boolean =>
  typeof value === 'object' && isDefined(value);
export const isObjectDefined = (value: any): boolean =>
  isObject(value) && Object.keys(value).length != 0;
