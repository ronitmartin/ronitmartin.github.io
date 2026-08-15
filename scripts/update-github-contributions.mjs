import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const username = process.env.GITHUB_CONTRIBUTIONS_USER || "ronitmartin";
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDirectory, "../src/data/github-contributions.json");
const levelNames = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];
const fallbackColors = ["#151b23", "#033a16", "#196c2e", "#2ea043", "#56d364"];

function contributionLevelIndex(level) {
  const index = levelNames.indexOf(level);
  return index < 0 ? 0 : index;
}

function buildSnapshot(weeks, totalContributions, source) {
  return {
    username,
    generatedAt: new Date().toISOString(),
    totalContributions,
    source,
    colors: fallbackColors,
    weeks: weeks.map((week) => ({
      firstDay: week.firstDay,
      days: week.days.map((day) => ({
        date: day.date,
        count: day.count,
        level: day.level,
      })),
    })),
  };
}

async function fetchGraphqlSnapshot() {
  if (!token) {
    throw new Error("No GitHub token available");
  }

  const query = `
    query ContributionCalendar($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              firstDay
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "ronitmartin-portfolio-contribution-updater",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed with ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length || !payload.data?.user) {
    throw new Error(payload.errors?.[0]?.message || `GitHub user ${username} was not found`);
  }

  const calendar = payload.data.user.contributionsCollection.contributionCalendar;
  const weeks = calendar.weeks.map((week) => ({
    firstDay: week.firstDay,
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: contributionLevelIndex(day.contributionLevel),
    })),
  }));

  return buildSnapshot(weeks, calendar.totalContributions, "github-graphql");
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
}

function weekStart(dateString) {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() - date.getUTCDay());
  return date.toISOString().slice(0, 10);
}

async function fetchPublicSnapshot() {
  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: { "User-Agent": "ronitmartin-portfolio-contribution-updater" },
  });
  if (!response.ok) {
    throw new Error(`GitHub contribution page request failed with ${response.status}`);
  }

  const html = await response.text();
  const totalMatch = html.match(/<h2[^>]*>[\s\S]*?([\d,]+)\s+contributions?[\s\S]*?<\/h2>/i);
  const dayPattern = /<td(?<attributes>[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*)><\/td>\s*<tool-tip[^>]*>(?<tooltip>[\s\S]*?)<\/tool-tip>/gi;
  const days = [];

  for (const match of html.matchAll(dayPattern)) {
    const date = match.groups.attributes.match(/data-date="([^"]+)"/)?.[1];
    const level = Number(match.groups.attributes.match(/data-level="([0-4])"/)?.[1] || 0);
    const tooltip = stripTags(match.groups.tooltip);
    const count = Number(tooltip.match(/^([\d,]+) contributions?/)?.[1]?.replaceAll(",", "") || 0);
    if (date) {
      days.push({ date, count, level });
    }
  }

  if (!days.length) {
    throw new Error("No contribution days were found in GitHub's public calendar");
  }

  const weeksByDate = new Map();
  for (const day of days) {
    const firstDay = weekStart(day.date);
    if (!weeksByDate.has(firstDay)) {
      weeksByDate.set(firstDay, { firstDay, days: [] });
    }
    weeksByDate.get(firstDay).days.push(day);
  }

  const weeks = [...weeksByDate.values()]
    .sort((a, b) => a.firstDay.localeCompare(b.firstDay))
    .map((week) => ({ ...week, days: week.days.sort((a, b) => a.date.localeCompare(b.date)) }));
  const totalContributions = Number(totalMatch?.[1]?.replaceAll(",", "")) || days.reduce((total, day) => total + day.count, 0);

  return buildSnapshot(weeks, totalContributions, "github-public-calendar");
}

let snapshot;
try {
  snapshot = await fetchGraphqlSnapshot();
} catch (graphqlError) {
  console.warn(`GraphQL refresh unavailable: ${graphqlError.message}`);
  snapshot = await fetchPublicSnapshot();
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(`Wrote ${snapshot.totalContributions} contributions across ${snapshot.weeks.length} weeks to ${outputPath}`);
