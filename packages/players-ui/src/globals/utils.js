import { matchPath } from "react-router";
import cc from "currency-codes";
import currencies from "currency-codes/data";
import i18next from "i18next";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const timestamps = {};
export function waitAndTrigger(id, time) {
  timestamps[id] = Date.now();
  return new Promise((resolve) => {
    const initTimestamp = timestamps[id];
    setTimeout(() => {
      resolve(initTimestamp === timestamps[id]);
    }, time);
  });
}

export function toTitleCase(text = "") {
  return text
    .toLowerCase()
    .replace(/[^\s]*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

export function toPx(val) {
  if (typeof val !== "string") {
    return 0;
  }
  const [number, format] = val.replace(/([0-9]+)(.*)/, "$1,$2").split(",");
  switch (format) {
    case "rem":
      return number * toPx(getComputedStyle(document.body).fontSize);
    case "px":
      return number;
  }
}

export function getMatchedParamsForRoutes({ path, routes }) {
  return routes
    .map((r) => matchPath(path, r.path))
    .filter((r) => r != null)
    .reduce((reduced, match) => ({ ...reduced, ...match.params }), {});
}

export function formatCurrencyAmount({ currency, amount }) {
  let formattedAmount = 0;
  try {
    formattedAmount = new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency,
    }).format(amount);
  } catch (e) {}
  return formattedAmount;
}

export function getAllCurrencies() {
  return currencies;
}

export function getCurrencyCode({ number } = {}) {
  try {
    return cc.number(number).code;
  } catch (e) {}
  return null;
}

export function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

export function getFirstDayInMonth(month, year) {
  return new Date(year, month, 1).getDay();
}

export function getDayOfYear(day, month, year) {
  let totalDays = day;
  for (let i = 1; i < month; i++) {
    totalDays += getDaysInMonth(i, year);
  }
  return totalDays;
}

export function getCurrentDayOfYear() {
  return getDayOfYear(
    getCurrentDayOfMonth(),
    getCurrentMonth(),
    getCurrentYear()
  );
}

export function getCurrentDayOfMonth() {
  return new Date().getDate();
}

export function getCurrentDayOfWeek() {
  return new Date().getDay();
}

export function getCurrentMonth() {
  return new Date().getMonth() + 1;
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getDaysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

export function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

export function getYearDayDate(day) {
  const currentYear = getCurrentYear();
  let lastYearDayOfMonth = 0;
  for (let month = 1; ; month++) {
    const yearOverflow = Math.floor((month - 1) / 12);
    const finalYear = currentYear + yearOverflow;
    const finalMonth = month - yearOverflow * 12;
    lastYearDayOfMonth += getDaysInMonth(finalMonth, finalYear);
    if (lastYearDayOfMonth >= day) {
      return new Date(
        finalYear,
        finalMonth - 1,
        getDaysInMonth(finalMonth, finalYear) - (lastYearDayOfMonth - day)
      );
    }
  }
}

export function getWeekDayOfYearDay(day) {
  return getYearDayDate(day).getDay();
}

export function getDayOfMonthOfYearDay(day) {
  return getYearDayDate(day).getDate();
}

export function getMonthOfYearDay(day) {
  return getYearDayDate(day).getMonth() + 1;
}

export function getMinutesString(minutes) {
  return i18next.t("units:time.minute", { count: minutes });
}

export function arrayOfSize(size) {
  return "".padStart(size).split("");
}

export function calculateStartDateInGames(date) {
  return moment(date).format("DD MMM YYYY");
}

export function calculateDaysBetween(dayB = "") {
  const a = moment();
  const b = moment(dayB);
  return b.diff(a, "days");
}

export const Tip = withStyles(() => ({
  tooltip: {
    backgroundColor: "rgb(119, 127, 130)",
    color: "rgb(255, 255, 255)",
    maxWidth: 200,
    fontSize: 14,
  },
}))(Tooltip);
