import React from "react";
import { Grid, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "./columns";
import {
  useGetPlayersAdminPageQuery,
  useDeletePlayerMutation,
  usePostPlayerMutation,
  usePutPlayerMutation,
} from "src/slices/api/apiSlice";
import { ModalPropsI } from "src/components/modal";
import { Card, CardBody, CardHeader } from "reactstrap";

type PlayersTableInput = {
  handleCloseModal: () => void;
  setModalState: React.Dispatch<React.SetStateAction<ModalPropsI>>;
};

export enum FootballPosition {
  GOALKEEPER = "Portero",
  CENTRAL_BACK = "Defensa Central",
  LEFT_BACK = "Lateral Izquierdo",
  RIGHT_BACK = "Lateral Derecho",
  DEFENSIVE_MIDFIELDER = "Pivote",
  CENTRAL_MIDFIELDER = "Mediocentro",
  ATTACKING_MIDFIELDER = "Mediocentro Ofensivo",
  LEFT_WINGER = "Extremo Izquierdo",
  RIGHT_WINGER = "Extremo Derecho",
  STRIKER = "Delantero Centro",
}

export const footballPositions = [
  { id: FootballPosition.GOALKEEPER, name: FootballPosition.GOALKEEPER },
  { id: FootballPosition.CENTRAL_BACK, name: FootballPosition.CENTRAL_BACK },
  { id: FootballPosition.LEFT_BACK, name: FootballPosition.LEFT_BACK },
  { id: FootballPosition.RIGHT_BACK, name: FootballPosition.RIGHT_BACK },
  {
    id: FootballPosition.DEFENSIVE_MIDFIELDER,
    name: FootballPosition.DEFENSIVE_MIDFIELDER,
  },
  {
    id: FootballPosition.CENTRAL_MIDFIELDER,
    name: FootballPosition.CENTRAL_MIDFIELDER,
  },
  {
    id: FootballPosition.ATTACKING_MIDFIELDER,
    name: FootballPosition.ATTACKING_MIDFIELDER,
  },
  { id: FootballPosition.LEFT_WINGER, name: FootballPosition.LEFT_WINGER },
  { id: FootballPosition.RIGHT_WINGER, name: FootballPosition.RIGHT_WINGER },
  { id: FootballPosition.STRIKER, name: FootballPosition.STRIKER },
];

const PlayersTable = ({
  handleCloseModal,
  setModalState,
}: PlayersTableInput) => {
  const { data, isLoading, isFetching } = useGetPlayersAdminPageQuery();
  const { players = [] } = data || {};
  console.log({ players });

  const [addPlayer] = usePostPlayerMutation();
  const [updatePlayer] = usePutPlayerMutation();
  const [deletePlayer] = useDeletePlayerMutation();

  const saveChanges = async (
    data: object,
    isEditing: boolean,
    isDeleting = false
  ) => {
    if (isDeleting) {
      await deletePlayer(data);
    } else if (isEditing) {
      await updatePlayer(data);
    } else {
      await addPlayer(data);
    }
    handleCloseModal();
  };

  const playerKeys = ({ footballPositions }: any) => {
    return {
      name: {
        label: "Name",
        type: "text",
      },
      position: {
        label: "Posición",
        type: "select",
        array: footballPositions,
        // dynamicOptionLabel: {
        //   propsToGet: [["name"], ["description"]],
        //   propsJoiner: ": ",
        // },
      },
      nationality: {
        label: "Nationalidad",
        type: "text",
      },
      height: {
        label: "Altura",
        type: "number",
      },
      weight: {
        label: "Peso",
        type: "number",
      },
      jersey_number: {
        label: "Número de camiseta",
        type: "number",
      },
      date_of_birth: {
        type: "date",
        label: "Fecha de nacimiento",
      },
      contract_value: {
        label: "Valor del contrato",
        type: "number",
      },
      market_value: {
        label: "Valor de mercado",
        type: "number",
      },
      goals_scored: {
        label: "Goles anotados",
        type: "number",
      },
      assists_given: {
        label: "Asistencias dadas",
        type: "number",
      },
      minutes_played: {
        label: "Minutos jugados",
        type: "number",
      },
      matches_played: {
        label: "Partidos jugados",
        type: "number",
      },
      yellow_cards: {
        label: "Tarjetas amarillas",
        type: "number",
      },
      red_cards: {
        label: "Tarjetas rojas",
        type: "number",
      },
    };
  };

  const handleAddRow = () => {
    const item = {
      name: "",
      position: null,
      nationality: "",
      height: 0,
      weight: 0,
      jersey_number: 0,
      date_of_birth: null,
      contract_value: 0,
      market_value: 0,
      goals_scored: 0,
      assists_given: 0,
      minutes_played: 0,
      matches_played: 0,
      yellow_cards: 0,
      red_cards: 0,
    };

    setModalState({
      isOpen: true,
      item,
      keys: playerKeys({ footballPositions }),
      title: "Agregar jugador",
      isEditing: false,
      saveChanges,
    });
  };

  const handleEditRow = (row: any) => {
    setModalState({
      isOpen: true,
      item: row,
      keys: playerKeys({ footballPositions }),
      title: `Edit ${row.name}`,
      isEditing: true,
      saveChanges,
    });
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader>
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Jugadores</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-danger"
                      color="primary"
                      variant="contained"
                      onClick={handleAddRow}
                    >
                      <i className="ri-add-line align-bottom me-1"></i>Agregar
                      jugador
                    </button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Box sx={{ height: 500, width: "100%" }}>
                    <DataGrid
                      onRowDoubleClick={params => handleEditRow(params.row)}
                      columns={columns}
                      rows={players!.players || []}
                      loading={isLoading || isFetching}
                      pagination
                      pageSizeOptions={[10, 25, 50]}
                      initialState={{
                        pagination: {
                          paginationModel: { pageSize: 10, page: 0 },
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PlayersTable;
