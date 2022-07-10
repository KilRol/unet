export const date = (date: number) => {
  const d = new Date(date);
  const chunks = [d.getDate(), d.getMonth() + 1, d.getFullYear()];
  const chunksTime = [d.getHours(), d.getMinutes()]
  const dd = chunks.map(chunk => String(chunk).padStart(2, '0')).join('.');
  const tt = chunksTime.map(chunk => String(chunk).padStart(2, '0')).join(':');
  return dd + " " + tt;
}
