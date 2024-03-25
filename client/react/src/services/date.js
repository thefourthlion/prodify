// timestamp.js
const getDate = () => {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const year = now.getFullYear();
  return `${month}/${day}/${year.toString().substr(-2)}`;
}

export default getDate;
