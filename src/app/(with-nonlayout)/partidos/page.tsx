"use client";
import React, { useMemo, useState } from "react";
import "./partidos.scss";
import { useGetAllMatchesQuery } from "src/slices/api/apiSlice";
import { useRouter } from "next/navigation";

type Match = {
  id: number;
  match_status: string;
  home_team_id: number;
  away_team_id: number;
  home_team: string;
  away_team: string;
  home_image: string;
  away_image: string;
  home_goals: number;
  away_goals: number;
  home_penalties: number;
  away_penalties: number;
  match_date: string;
  match_time: string;
  matchday_name: string;
  stadium_name: string;
};

const getTeamLogo = (teamId: number) =>
  `https://dksx1d.ligamx.net/sttcdcs/arcdgt/AfldDrct/logos/${teamId}/${teamId}.png?rnd=300622`;

type Filter = "all" | "finished" | "upcoming";

const VAQUEROS_ID = 14291;

function getResult(match: Match) {
  const isHome = match.home_team_id === VAQUEROS_ID;
  const vaquerosGoals = isHome ? match.home_goals : match.away_goals;
  const rivalGoals = isHome ? match.away_goals : match.home_goals;

  if (vaquerosGoals > rivalGoals) return "win";
  if (vaquerosGoals < rivalGoals) return "loss";
  return "draw";
}

function parseMatchDate(date: string, seasonStartYear = 2026): Date | null {
  const parts = date.split("/").map(Number);

  if (parts.length === 3) {
    // Formato YYYY/M/D
    const [year, month, day] = parts;
    return new Date(year, month - 1, day);
  }

  if (parts.length === 2) {
    // Formato DD/MM
    const [day, month] = parts;
    const year = month >= 7 ? seasonStartYear : seasonStartYear + 1;

    return new Date(year, month - 1, day);
  }

  return null;
}

function formatDate(date: string) {
  const parsedDate = parseMatchDate(date);

  if (!parsedDate || Number.isNaN(parsedDate.getTime())) {
    return "Fecha por confirmar";
  }

  return parsedDate.toLocaleDateString("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Team({
  name,
  image,
  isVaqueros,
}: {
  name: string;
  image: string;
  isVaqueros: boolean;
}) {
  return (
    <div className={`team ${isVaqueros ? "vaqueros" : ""}`}>
      <img
        src={image}
        alt={`Escudo de ${name}`}
        className="team-logo"
        onError={e => {
          e.currentTarget.src = "/images/team-placeholder.png";
        }}
      />
      <span>{name.trim()}</span>
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(
      `/partidos/${match.id}?localTeamId=${match.home_team_id}&awayTeamId=${match.away_team_id}`
    );
  };

  const finished = match.match_status === "Finalizado";

  const result = finished ? getResult(match) : null;

  const resultLabel = {
    win: "VICTORIA",
    draw: "EMPATE",
    loss: "DERROTA",
  };

  return (
    <article
      className="match-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === "Enter") {
          handleClick();
        }
      }}
    >
      <div className="match-header">
        <span>{match.matchday_name}</span>
        <span className={`status ${finished ? "finished" : "upcoming"}`}>
          {finished ? "FINALIZADO" : "POR JUGAR"}
        </span>
      </div>

      <div className="match-date">
        {formatDate(match.match_date)} · {match.match_time.replace("HC", "")}
      </div>

      <div className="scoreboard">
        <Team
          name={match.home_team}
          image={getTeamLogo(match.home_team_id)}
          isVaqueros={match.home_team_id === VAQUEROS_ID}
        />

        <div className="score">
          {finished ? (
            <>
              <strong>{match.home_goals}</strong>
              <span>-</span>
              <strong>{match.away_goals}</strong>
            </>
          ) : (
            <span className="vs">VS</span>
          )}
        </div>

        <Team
          name={match.away_team}
          image={getTeamLogo(match.away_team_id)}
          isVaqueros={match.away_team_id === VAQUEROS_ID}
        />
      </div>

      {finished && (
        <div className={`result ${result}`}>
          {resultLabel[result!]}
          {match.home_goals === match.away_goals &&
            (match.home_penalties > 0 || match.away_penalties > 0) && (
              <span>
                {" "}
                · Penales {match.home_penalties} - {match.away_penalties}
              </span>
            )}
        </div>
      )}

      <div className="stadium">
        <span>⌖</span>
        {match.stadium_name}
      </div>
    </article>
  );
}

const Partidos = () => {
  const { data: matches = [] } = useGetAllMatchesQuery();
  const [filter, setFilter] = useState<Filter>("all");

  const sortedMatches = useMemo(() => {
    return [...matches].sort((a, b) => {
      const dateA = parseMatchDate(a.match_date)?.getTime() ?? 0;
      const dateB = parseMatchDate(b.match_date)?.getTime() ?? 0;

      return dateA - dateB;
    });
  }, [matches]);

  const filteredMatches = sortedMatches.filter(match => {
    if (filter === "finished") {
      return match.match_status === "Finalizado";
    }

    if (filter === "upcoming") {
      return match.match_status !== "Finalizado";
    }

    return true;
  });

  const finishedMatches = matches.filter(
    match => match.match_status === "Finalizado"
  );

  const wins = finishedMatches.filter(
    match => getResult(match) === "win"
  ).length;

  const draws = finishedMatches.filter(
    match => getResult(match) === "draw"
  ).length;

  const losses = finishedMatches.filter(
    match => getResult(match) === "loss"
  ).length;

  const goalsFor = finishedMatches.reduce(
    (sum, match) =>
      sum +
      (match.home_team_id === VAQUEROS_ID
        ? match.home_goals
        : match.away_goals),
    0
  );

  const goalsAgainst = finishedMatches.reduce(
    (sum, match) =>
      sum +
      (match.home_team_id === VAQUEROS_ID
        ? match.away_goals
        : match.home_goals),
    0
  );

  const goalDifference = goalsFor - goalsAgainst;

  return (
    <React.Fragment>
      <div className="page-content page">
        <header className="hero">
          <img src={getTeamLogo(VAQUEROS_ID)} alt="Vaqueros Reynosa" />
          <div>
            <div className="eyebrow">TEMPORADA 2026 / 2027</div>
            <h1>VAQUEROS REYNOSA FC</h1>
            <p>Liga Premier · Serie A</p>
          </div>
        </header>

        <section className="stats">
          <div className="stat">
            <strong>{finishedMatches.length}</strong>
            <span>Jugados</span>
          </div>
          <div className="stat">
            <strong>{wins}</strong>
            <span>Victorias</span>
          </div>
          <div className="stat">
            <strong>{draws}</strong>
            <span>Empates</span>
          </div>
          <div className="stat">
            <strong>{losses}</strong>
            <span>Derrotas</span>
          </div>
          <div className="stat goals-stat">
            <div className="goal-badges">
              <span className="goal-badge gf">GF {goalsFor}</span>
              <span className="goal-badge gc">GC {goalsAgainst}</span>
              <span className="goal-badge dg">
                DG {goalDifference > 0 ? `+${goalDifference}` : goalDifference}
              </span>
            </div>
            <span>Goles</span>
          </div>
        </section>

        <section>
          <div className="section-heading">
            <h2>Calendario y resultados</h2>
            <div className="filters">
              {(
                [
                  ["all", "Todos"],
                  ["finished", "Resultados"],
                  ["upcoming", "Próximos"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  className={filter === value ? "active" : ""}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="matches">
            {filteredMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
            {filteredMatches.length === 0 && (
              <div className="empty">No hay partidos para este filtro.</div>
            )}
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Partidos;
