/**
 * PCOC 時間規格：所有臨床輸入、顯示與匯出以 Asia/Taipei（UTC+08:00）為準。
 * Graph 採帶 +08:00 時區偏移的 ISO 8601；SharePoint 服務端可能自行正規化為 UTC。
 * 不採用電腦當地時區，也不把沒有時區的字串直接寫入 DateTime。
 */
(function (global) {
  'use strict';
  const offset = '+08:00';
  const zone = 'Asia/Taipei';
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: zone, calendar: 'gregory', numberingSystem: 'latn',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  });
  function partsOf(instant) {
    const result = {};
    formatter.formatToParts(instant).forEach(x => { if (x.type !== 'literal') result[x.type] = x.value; });
    return result;
  }
  function validInput(localValue) {
    if (typeof localValue !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(localValue)) return false;
    const [year, month, day, hour, minute] = localValue.match(/\d+/g).map(Number);
    const check = new Date(Date.UTC(year, month - 1, day, hour, minute));
    return check.getUTCFullYear() === year && check.getUTCMonth() === month - 1 &&
      check.getUTCDate() === day && check.getUTCHours() === hour && check.getUTCMinutes() === minute;
  }
  function fromInput(localValue) {
    if (!validInput(localValue)) throw new Error('無效住院時間，請使用 YYYY-MM-DDTHH:mm');
    return `${localValue}:00${offset}`;
  }
  function now() {
    const date = new Date();
    const x = partsOf(date);
    const millis = String(date.getMilliseconds()).padStart(3, '0');
    return `${x.year}-${x.month}-${x.day}T${x.hour}:${x.minute}:${x.second}.${millis}${offset}`;
  }
  function today() { return now().slice(0, 10); }
  function isTaipeiISO(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?\+08:00$/.test(value)) return false;
    const ms = Date.parse(value);
    if (!Number.isFinite(ms) || !validInput(value.slice(0, 16))) return false;
    const x = partsOf(new Date(ms));
    const actual = `${x.year}-${x.month}-${x.day}T${x.hour}:${x.minute}:${x.second}`;
    return actual === value.slice(0, 19);
  }
  function display(value) {
    const d = new Date(value);
    if (!Number.isFinite(d.getTime())) throw new Error('無效時間資料');
    const x = partsOf(d);
    return `${x.year}/${x.month}/${x.day} ${x.hour}:${x.minute}:${x.second}（台灣時間）`;
  }
  global.PCOC_TIME = Object.freeze({zone, offset, fromInput, now, today, isTaipeiISO, display});
})(window);
