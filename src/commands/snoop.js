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
    return `${username} nic wczoraj nie zrobił
https://tenor.com/view/kononopedia-major-p%C5%82acz-lalu%C5%9B-szkolna17-gif-15886612`;
  }

  const pushCount = todaysEvents.filter(
    (event) => event === "PushEvent"
  ).length;
  const pushed = `Spushował ${pushCount} commitów 💪`;

  const createCount = todaysEvents.filter(
    (event) => event === "CreateEvent"
  ).length;
  const created = `Stworzył ${createCount} branchy/tagów 🌴`;

  const deleteCount = todaysEvents.filter(
    (event) => event === "DeleteEvent"
  ).length;
  const deleted = `Usunął ${deleteCount} branchy/tagów 🗑️`;

  const forkCount = todaysEvents.filter(
    (event) => event === "ForkEvent"
  ).length;
  const forked = `Zrobił ${forkCount} forków 🍴`;

  const issueCommentCount = todaysEvents.filter(
    (event) => event === "IssueCommentEvent"
  ).length;
  const commented = `Dodał ${issueCommentCount} komentarzy 💭`;

  const publicCount = todaysEvents.filter(
    (event) => event === "PublicEvent"
  ).length;
  const published = `Opublikował ${publicCount} repozytoriów 📰`;

  const pullRequestCount = todaysEvents.filter(
    (event) => event === "PullRequestEvent"
  ).length;
  const pullRequested = `Dokonał ${pullRequestCount} zmian w pull requestach ✔️`;

  const starCount = todaysEvents.filter(
    (event) => event === "WatchEvent"
  ).length;
  const starred = `Ogwiazdkował ${starCount} repozytoriów ⭐`;

  return `${username} zrobił wczoraj ${todaysEvents.length} rzeczy, w tym:
   • ${pushed}
   • ${created}
   • ${deleted}
   • ${forked}
   • ${commented}
   • ${published}
   • ${pullRequested}
   • ${starred}`;
};
