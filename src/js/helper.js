import { TIME_OUT_SEC } from './config.js';
const timeoOut = s => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};
const AJAX = async url => {
  const res = await Promise.race([timeoOut(TIME_OUT_SEC), fetch(url)]);
  if (!res.ok) throw new Error(`Failed to fetch data! Status: ${res.status}`);
  return await res.json();
};
