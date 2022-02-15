import axios from "axios";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday.js";

dayjs.extend(isToday);

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
    .filter((event) => dayjs(event.created_at).isToday())
    .map((event) => event.type);

  if (todaysEvents.length === 0) {
    return `${username} nic dzisiaj nie zrobił`;
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

  return `${username} zrobił dzisiaj ${todaysEvents.length} rzeczy, w tym:
   • ${pushed}
   • ${created}
   • ${deleted}
   • ${forked}
   • ${commented}
   • ${published}
   • ${pullRequested}
   • ${starred}`;
};
