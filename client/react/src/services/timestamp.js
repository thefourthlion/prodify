// timestamp.js
const getTimestamp = () => {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${month}/${day}/${year.toString().substr(-2)} ${hour}:${minute}`;
  }
  
  export default getTimestamp;
  