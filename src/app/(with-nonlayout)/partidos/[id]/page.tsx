"use client";

import { useGetMatchDataQuery } from "src/slices/api/apiSlice";
import "./partidoId.scss";
import { useParams, useSearchParams } from "next/navigation";

const eventLabels: Record<string, string> = {
  goal: "Gol",
  yellow_card: "Tarjeta amarilla",
  red_card: "Tarjeta roja",
  substitution: "Sustitución",
};

const PartidoPage = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const localTeamId = Number(searchParams.get("localTeamId"));
  const awayTeamId = Number(searchParams.get("awayTeamId"));

  const { data, isLoading, isError } = useGetMatchDataQuery({
    matchId: Number(id),
    localTeamId,
    awayTeamId,
  });

  if (isLoading) {
    return (
      <main className="match-detail">
        <p className="match-message">Cargando partido...</p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="match-detail">
        <p className="match-message">
          No se pudo cargar la información del partido.
        </p>
      </main>
    );
  }

  const { match, home, away, timeline } = data;

  const teams = [
    {
      id: home.id,
      name: match.home_team,
      image: match.home_image,
      starters: home.starters,
      substitutes: home.substitutes,
      staff: home.staff,
    },
    {
      id: away.id,
      name: match.away_team,
      image: match.away_image,
      starters: away.starters,
      substitutes: away.substitutes,
      staff: away.staff,
    },
  ];

  return (
    <main className="match-detail">
      {/* Encabezado y marcador */}
      <section className="match-header">
        <div className="match-header-info">
          <span className="matchday">{match.matchday_name}</span>
          <span className="match-status">
            {match.sheet_status_description || match.match_status}
          </span>
        </div>

        <div className="match-score">
          <div className="match-team">
            <img src={match.home_image} alt={match.home_team} />
            <h2>{match.home_team}</h2>
          </div>

          <div className="score-container">
            <div className="score">
              <strong>{match.home_goals}</strong>
              <span>-</span>
              <strong>{match.away_goals}</strong>
            </div>

            {(match.home_penalties > 0 || match.away_penalties > 0) && (
              <span className="penalties">
                Penales: {match.home_penalties} - {match.away_penalties}
              </span>
            )}
          </div>

          <div className="match-team">
            <img src={match.away_image} alt={match.away_team} />
            <h2>{match.away_team}</h2>
          </div>
        </div>

        <div className="match-information">
          <p>
            <span>Fecha:</span> {match.match_long_date}
          </p>
          <p>
            <span>Hora:</span> {match.match_time_local}
          </p>
          <p>
            <span>Estadio:</span> {match.stadium_name}
          </p>
          <p>
            <span>Competición:</span> {match.league}
          </p>
        </div>
      </section>

      {/* Eventos */}
      <section className="match-section">
        <h2 className="section-title">Eventos del partido</h2>

        {timeline.length === 0 ? (
          <p className="empty-message">No hay eventos registrados.</p>
        ) : (
          <div className="timeline">
            {[...timeline]
              .sort((a, b) => {
                const minuteA = a.minute + (a.extraTime ?? 0) / 100;
                const minuteB = b.minute + (b.extraTime ?? 0) / 100;
                return minuteA - minuteB;
              })
              .map(event => {
                const isHome = event.team === "local";

                return (
                  <div
                    key={event.id}
                    className={`timeline-event ${
                      isHome ? "home-event" : "away-event"
                    }`}
                  >
                    <div className="event-side">
                      {isHome && (
                        <div className="event-content">
                          <strong>
                            {eventLabels[event.type] || event.type}
                          </strong>

                          {event.type === "substitution" ? (
                            <div className="substitution-players">
                              <p className="player-in">
                                <span>↑</span>{" "}
                                {event.playerIn || "Sin información"}
                              </p>
                              <p className="player-out">
                                <span>↓</span>{" "}
                                {event.playerOut || "Sin información"}
                              </p>
                            </div>
                          ) : (
                            <p>
                              {event.playerName ||
                                event.description ||
                                "Sin información"}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <span className="event-minute">
                      {event.minute}
                      {event.extraTime ? `+${event.extraTime}` : ""}'
                    </span>

                    <div className="event-side">
                      {!isHome && (
                        <div className="event-content">
                          <strong>
                            {eventLabels[event.type] || event.type}
                          </strong>

                          {event.type === "substitution" ? (
                            <div className="substitution-players">
                              <p className="player-in">
                                <span>↑</span>{" "}
                                {event.playerIn || "Sin información"}
                              </p>
                              <p className="player-out">
                                <span>↓</span>{" "}
                                {event.playerOut || "Sin información"}
                              </p>
                            </div>
                          ) : (
                            <p>
                              {event.playerName ||
                                event.description ||
                                "Sin información"}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </section>

      {/* Alineaciones */}
      <section className="match-section">
        <h2 className="section-title">Alineaciones</h2>

        <div className="teams-grid">
          {teams.map(team => (
            <div key={team.id} className="team-card">
              <div className="team-card-header">
                <img src={team.image} alt={team.name} />
                <h3>{team.name}</h3>
              </div>

              <h4 className="subsection-title">Titulares</h4>

              {team.starters.length === 0 ? (
                <p className="empty-message">Sin alineación registrada.</p>
              ) : (
                <div className="players-list">
                  {team.starters.map(player => (
                    <div key={player.player_id} className="player-row">
                      <span className="player-shirt">{player.shirt}</span>

                      <div className="player-info">
                        <strong>
                          {player.name}
                          {player.captain === 1 && (
                            <span className="captain">C</span>
                          )}
                        </strong>
                        <small>{player.position}</small>
                      </div>

                      <span className="player-minutes">
                        {player.minutes_played}'
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <h4 className="subsection-title">Suplentes</h4>

              {team.substitutes.length === 0 ? (
                <p className="empty-message">Sin suplentes registrados.</p>
              ) : (
                <div className="players-list">
                  {team.substitutes.map(player => (
                    <div key={player.player_id} className="player-row">
                      <span className="player-shirt">{player.shirt}</span>

                      <div className="player-info">
                        <strong>{player.name}</strong>
                        <small>{player.position}</small>
                      </div>

                      <span className="player-minutes">
                        {player.minutes_played}'
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Cuerpo técnico */}
      <section className="match-section">
        <h2 className="section-title">Cuerpo técnico</h2>

        <div className="teams-grid">
          {teams.map(team => (
            <div key={team.id} className="team-card">
              <div className="team-card-header">
                <img src={team.image} alt={team.name} />
                <h3>{team.name}</h3>
              </div>

              {team.staff.length === 0 ? (
                <p className="empty-message">
                  No hay cuerpo técnico registrado.
                </p>
              ) : (
                <div className="staff-list">
                  {team.staff.map(person => (
                    <div key={person.technical_staff_id} className="staff-row">
                      <strong>{person.name}</strong>
                      <span>{person.position}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Equipo arbitral */}
      <section className="match-section">
        <h2 className="section-title">Equipo arbitral</h2>

        <div className="referees-grid">
          <div className="referee-row">
            <span>Árbitro central</span>
            <strong>{match.center_referee || "No disponible"}</strong>
          </div>

          <div className="referee-row">
            <span>Asistente 1</span>
            <strong>{match.assistant_referee_1 || "No disponible"}</strong>
          </div>

          <div className="referee-row">
            <span>Asistente 2</span>
            <strong>{match.assistant_referee_2 || "No disponible"}</strong>
          </div>

          <div className="referee-row">
            <span>Cuarto oficial</span>
            <strong>{match.fourth_official || "No disponible"}</strong>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PartidoPage;
