import React from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./customDatePickerWidth.css";
import { useQuery } from "react-query";
import { getHolidays } from "../api";

const getDate = (date) => {
  const year = new Date(date).getFullYear();
  const month =
    Number(date.getMonth() + 1) < 10
      ? "0" + String(Number(date.getMonth() + 1))
      : date.getMonth() + 1;
  const day = Number(date.getDate()) < 10 ? "0" + String(Number(date.getDate())) : date.getDate();
  return `${year}${month}${day}`;
};

function DatePicker2({ startDate, setStartDate, notInline }) {
  const maxDate = new Date().setMonth(new Date().getMonth() + 1);

  const createDate = (date) => {
    return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
  };

  const getDayName = (date) => {
    return date.toLocaleDateString("ko-KR", { weekday: "long" }).substr(0, 1);
  };

  const { data } = useQuery("date", getHolidays);

  const holidays = data ? data.item.map((n) => String(n.locdate)) : [];

  const getIsHoliday = (date) => {
    if (holidays.includes(getDate(date))) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className={"customDatePickerWidth"}>
        <DatePicker
          selected={startDate}
          locale={ko}
          onChange={(date) => setStartDate(date)}
          inline={notInline ? false : true}
          minDate={new Date()}
          maxDate={maxDate}
          dateFormat="yyyy-MM-dd"
          formatWeekDay={(nameOfDay) => {
            if (nameOfDay === "토요일") {
              return <p style={{ color: "blue" }}>{nameOfDay.substring(0, 1)}</p>;
            }
            if (nameOfDay === "일요일") {
              return <p style={{ color: "red" }}>{nameOfDay.substring(0, 1)}</p>;
            }
            return nameOfDay.substring(0, 1);
          }}
          dayClassName={(date) => {
            return date < new Date() || date > maxDate
              ? undefined
              : getDate(startDate) === getDate(date)
              ? undefined
              : getDayName(createDate(date)) === "토"
              ? "saturday"
              : getDayName(createDate(date)) === "일"
              ? "sunday"
              : getIsHoliday(date)
              ? "sunday"
              : undefined;
          }}
        />
      </div>
    </>
  );
}

export default DatePicker2;
