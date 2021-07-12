import React from "react";
import add from "date-fns/add";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDaysInMonth from "date-fns/getDaysInMonth";
import getWeeksInMonth from "date-fns/getWeeksInMonth";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import getDay from "date-fns/getDay";
import styled from "styled-components";
import { Navigation } from "./Navigation";
import { Repeat } from "@material-ui/icons";

// ----------ui作成で活用するデータ
interface TestScheduleMetadata {
  title: string;
  place: string;
  description: string;
}
interface TestScheduleModel<T = TestScheduleMetadata> {
  date: Date;
  schedules: Array<T>;
}

const testToday: Date = new Date();
const testADay: TestScheduleModel = {
  date: testToday,
  schedules: [],
};

const weeksArray: TestScheduleModel[] = [];
// カレンダー描画するときに使うデータ。Navigationでも使っている
export const targetYear = getYear(testToday);
export const targetMonth = getMonth(testToday) + 1;
const renderedFirstDate = new Date(targetYear, targetMonth - 1, 1);
const daysInMonth = getDaysInMonth(renderedFirstDate);
const weeksInMonth = getWeeksInMonth(renderedFirstDate);
// ----------

// まずは巨大な配列を作る処理
// weeksArrayに４年前から４年後までの巨大な配列ができている
const today = new Date();
const firstDayOfCalendar = add(today, { years: -4 });
for (let i = 0; i < 2920; i++) {
  const aDay: TestScheduleModel = {
    date: add(firstDayOfCalendar, { days: i }),
    schedules: [],
  };
  weeksArray.push(aDay);
}

// テスト用の予定を追加していく
weeksArray[1460].schedules.push({
  title: "サッカー",
  place: "高校",
  description: "高校の友達と集まる",
});

weeksArray[1470].schedules.push({
  title: "映画",
  place: "TOHOシネマズ",
  description: "キャラクターか何かを見る。決まってない",
});

weeksArray[1480].schedules.push({
  title: "髪を切る",
  place: "neu",
  description: "流石にそろそろ切らないとまずい",
});

weeksArray[1470].schedules.push({
  title: "ジム",
  place: "エニタイム",
  description: "トレーニングと同時に、解約の手続きもする必要あり",
});
// ここまではテストデータ作成。2021年7月には予定も格納しているのでバッチリ
// 最終的に使うデータ
// weeksArray ; 日付が格納されたデータ。初日と使いたい年月の1日の間の差分を計算してカレンダー描画には使う
// targetYear, targetMonth(カレンダー描画に必要な対象となる年月)
// daysInMonth；該当年月だと何日間一月にあるのかを計算した変数

// この中にnavigationとcalendarBoardが入る構造にする
export const CalendarApp = () => {
  return (
    <CalendarAppStyle>
      <Navigation />
      <CalendarBoard />
    </CalendarAppStyle>
  );
};
const CalendarAppStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
`;

const CalendarBoard = () => {
  return (
    <BoarderStyle>
      <CalendarBoardStyle theme={{ rows: calendarRowsCalc(weeksInMonth) }}>
        <Schedules />
      </CalendarBoardStyle>
    </BoarderStyle>
  );
};
const CalendarBoardStyle = styled.div`
  background-color: rgb(255, 255, 255);
  border-color: rgb(218, 220, 224);
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: ${({ theme }) => theme.rows};
  grid-gap: 1px;
`;

const BoarderStyle = styled.div`
  background-color: rgb(218, 220, 224);
  width: 100%;
  height: 100%;
  margin: 8px;
`;

// calendarの行数に応じてグリッドを生成するための１frを返す
const calendarRowsCalc = (weeksInMonth: number): string => {
  if (weeksInMonth === 4) {
    return "1fr 1fr 1fr 1fr";
  } else if (weeksInMonth === 5) {
    return "1fr 1fr 1fr 1fr 1fr";
  } else {
    return "1fr 1fr 1fr 1fr 1fr 1fr";
  }
};

// 生成して並べる必要があるdivの数は7*weeksInMonth
const lineupDivNum: number = 7 * weeksInMonth;
const dateOfFirstDayOfCalendar = getDay(firstDayOfCalendar);
// カレンダー上でレンダーし始めるべきweeksArrayのIndex番号
const renderStartIndex: number =
  differenceInCalendarDays(firstDayOfCalendar, renderedFirstDate) -
  dateOfFirstDayOfCalendar;
// ここから該当月分レンダーしていったら、ピッタリの数になるはず。（renderStartIndexの数字はちゃんと計算していないから前後２ぐらいずれいているかも）

const renderWeeksArray = weeksArray.slice(renderStartIndex, lineupDivNum);

// 空で返ってきてしまっている。ここで、該当月の前後含めた日付全部を配列として引っこ抜いてくることができていれば、カレンダーの描画がうまくいくはず。
// ここの修正からスタート
console.log(renderWeeksArray);
const Schedules = () => {
  return (
    <>
      {renderWeeksArray.map((day) => (
        <div>{day.date.getDay}</div>
      ))}
    </>
  );
};
