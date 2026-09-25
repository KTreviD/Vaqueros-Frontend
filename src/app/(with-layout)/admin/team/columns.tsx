import { GridColDef, GridValueFormatter } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 200 },
  { field: "date_of_birth", headerName: "Fecha de Nacimiento", width: 150 },
  { field: "position", headerName: "Posición", width: 150 },
  { field: "nationality", headerName: "Nacionalidad", width: 150 },
  { field: "height", headerName: "Altura", width: 120 },
  { field: "weight", headerName: "Peso", width: 120 },
  { field: "jersey_number", headerName: "Número de Camiseta", width: 120 },
  { field: "contract_value", headerName: "Valor del Contrato", width: 150 },
  { field: "market_value", headerName: "Valor de Mercado", width: 150 },
  { field: "goals_scored", headerName: "Goles Marcados", width: 120 },
  { field: "assists_given", headerName: "Asistencias", width: 120 },
  { field: "minutes_played", headerName: "Minutos Jugados", width: 120 },
  { field: "matches_played", headerName: "Partidos Jugados", width: 120 },
  { field: "yellow_cards", headerName: "Tarjetas Amarillas", width: 120 },
  { field: "red_cards", headerName: "Tarjetas Rojas", width: 120 },
];
