import { useMemo, useState } from "react";
import contributionData from "../data/github-contributions.json";

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
const detailFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function formatContributionDetail(day) {
  const countLabel = day.count === 1 ? "contribution" : "contributions";
  return `${day.count} ${countLabel} on ${detailFormatter.format(new Date(`${day.date}T00:00:00Z`))}`;
}

function monthLabels(weeks) {
  let previousMonth = -1;

  return weeks.flatMap((week, index) => {
    const date = new Date(`${week.firstDay}T00:00:00Z`);
    const month = date.getUTCMonth();
    if (month === previousMonth) {
      return [];
    }

    previousMonth = month;
    return [{ index, label: monthFormatter.format(date) }];
  });
}

export function GithubContributionGraph() {
  const [activeDay, setActiveDay] = useState(null);
  const months = useMemo(() => monthLabels(contributionData.weeks), []);
  const generatedDate = detailFormatter.format(new Date(contributionData.generatedAt));

  return (
    <section className="github-contributions" aria-label={`${contributionData.totalContributions} GitHub contributions in the last year`}>
      <div className="github-contributions-header">
        <p><strong>{contributionData.totalContributions}</strong> contributions in the last year</p>
        <span>@{contributionData.username}</span>
      </div>

      <div className="github-contributions-calendar">
        <div className="github-contributions-months" aria-hidden="true" style={{ "--week-count": contributionData.weeks.length }}>
          {months.map((month) => (
            <span key={`${month.label}-${month.index}`} style={{ gridColumn: month.index + 1 }}>{month.label}</span>
          ))}
        </div>

        <div className="github-contributions-body">
          <div className="github-contributions-weekdays" aria-hidden="true">
            <span style={{ gridRow: 2 }}>Mon</span>
            <span style={{ gridRow: 4 }}>Wed</span>
            <span style={{ gridRow: 6 }}>Fri</span>
          </div>

          <div className="github-contributions-grid" role="grid" aria-label="Daily contributions" style={{ "--week-count": contributionData.weeks.length }}>
            {contributionData.weeks.map((week, weekIndex) => (
              <div className="github-contributions-week" role="row" key={week.firstDay}>
                {week.days.map((day, dayIndex) => (
                  <span
                    className={`github-contribution-day github-contribution-day--level-${day.level}`}
                    data-count={day.count}
                    key={day.date}
                    role="gridcell"
                    aria-label={formatContributionDetail(day)}
                    title={formatContributionDetail(day)}
                    style={{ "--cell-delay": `${1120 + weekIndex * 12 + dayIndex * 5}ms` }}
                    onMouseEnter={() => setActiveDay(day)}
                    onMouseLeave={() => setActiveDay(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="github-contributions-footer">
          <span>{activeDay ? formatContributionDetail(activeDay) : `Updated ${generatedDate}`}</span>
        </div>
      </div>
      <a
        className="github-title-kicker"
        href="https://github.com/ronitmartin"
        target="_blank"
        rel="noreferrer"
      >
        github.com/ronitmartin
      </a>
    </section>
  );
}
