import axios from "axios";
import dayjs from "dayjs";
import isYesterday from "dayjs/plugin/isYesterday.js";

dayjs.extend(isYesterday);

export const snoop = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/events/public`
    );
    const data = response.data;
    return constructReport(data, username);
  } catch (err) {
    console.error(err);
    return "Something went wrong, sorry";
  }
};

const constructReport = (apiResponse, username) => {
  const todaysEvents = apiResponse
    .filter((event) => dayjs(event.created_at).isYesterday())
    .map((event) => event.type);

  if (todaysEvents.length === 0) {
    return `${username} nic wczoraj nie zrobi艂
https://tenor.com/view/kononopedia-major-p%C5%82acz-lalu%C5%9B-szkolna17-gif-15886612`;
  }

  const pushCount = todaysEvents.filter(
    (event) => event === "PushEvent"
  ).length;
  const pushed = `Spushowa艂 ${pushCount} commit贸w 馃挭`;

  const createCount = todaysEvents.filter(
    (event) => event === "CreateEvent"
  ).length;
  const created = `Stworzy艂 ${createCount} branchy/tag贸w 馃尨`;

  const deleteCount = todaysEvents.filter(
    (event) => event === "DeleteEvent"
  ).length;
  const deleted = `Usun膮艂 ${deleteCount} branchy/tag贸w 馃棏锔廯;

  const forkCount = todaysEvents.filter(
    (event) => event === "ForkEvent"
  ).length;
  const forked = `Zrobi艂 ${forkCount} fork贸w 馃嵈`;

  const issueCommentCount = todaysEvents.filter(
    (event) => event === "IssueCommentEvent"
  ).length;
  const commented = `Doda艂 ${issueCommentCount} komentarzy 馃挱`;

  const publicCount = todaysEvents.filter(
    (event) => event === "PublicEvent"
  ).length;
  const published = `Opublikowa艂 ${publicCount} repozytori贸w 馃摪`;

  const pullRequestCount = todaysEvents.filter(
    (event) => event === "PullRequestEvent"
  ).length;
  const pullRequested = `Dokona艂 ${pullRequestCount} zmian w pull requestach 鉁旓笍`;

  const starCount = todaysEvents.filter(
    (event) => event === "WatchEvent"
  ).length;
  const starred = `Ogwiazdkowa艂 ${starCount} repozytori贸w 猸恅;

  return `${username} zrobi艂 wczoraj ${todaysEvents.length} rzeczy, w tym:
   鈥? ${pushed}
   鈥? ${created}
   鈥? ${deleted}
   鈥? ${forked}
   鈥? ${commented}
   鈥? ${published}
   鈥? ${pullRequested}
   鈥? ${starred}`;
};
