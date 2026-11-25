import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "name", headerName: "Nombre", width: 200 },
  { field: "email", headerName: "Correo", width: 300 },
  { field: "is_email_verified", headerName: "Verificado", width: 120 },
];
