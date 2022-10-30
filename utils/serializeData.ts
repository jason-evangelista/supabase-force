const serializeData = <TReturn>(data: string) => {
  const parse = JSON.parse(data);
  return parse as TReturn;
};

export default serializeData;
