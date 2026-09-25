"use client";
import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";

import { emptyModalObject, Modal } from "src/components/modal";
import CompaniesTable from "./playersTable";

const PlayersList = () => {
  //Modal state
  const [modalState, setModalState] = useState(emptyModalObject);
  const handleCloseModal = () => setModalState(emptyModalObject);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Equipo" pageTitle="Equipo" />
          <Row>
            <CompaniesTable
              handleCloseModal={handleCloseModal}
              setModalState={setModalState}
            />
          </Row>
        </Container>
      </div>
      {modalState.isOpen && (
        <Modal {...modalState} closeModal={handleCloseModal} />
      )}
    </React.Fragment>
  );
};

export default PlayersList;
