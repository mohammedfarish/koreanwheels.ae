export function objectToUrlParams(obj: object) {
  const params: string[] = [];
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    //  @ts-ignore
    const value = encodeURIComponent(obj[key]);
    const keyItem = encodeURIComponent(key);
    if (value !== "undefined") params.push(`${keyItem}=${value}`);
  });

  return params.join("&");
}
