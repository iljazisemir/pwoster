export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const dateParser = (num) => {
  let options = {
    year: "numeric",
    month: "long",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const dateParserShort = (num) => {
  let options = {
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const dateParserPost = (num) => {
  let options = {
    day: "numeric",
    month: "short",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const dateParserPostLong = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let timestamp = Date.parse(num);

  let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const timestampParser = (num) => {
  let options = {
    hour: "2-digit",
    minute: "2-digit",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
};

export const timestampParserShort = (num) => {
  let options = {
    month: "short",
    day: "numeric",
  };

  let date = new Date(num).toLocaleDateString("fr-FR", options);

  return date.toString();
};
