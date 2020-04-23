export default function (timeStamp) {
  let time = new Date(timeStamp * 1000).toLocaleString(undefined, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  return time;
}