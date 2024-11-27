export const formatDate = (isoString) => {
  const date = new Date(isoString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
