export default function getCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0'); // two digits
  const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const year = String(now.getFullYear()).slice(-2); // last 2 digits
  return `${day}/${month}/${year}`;
}
