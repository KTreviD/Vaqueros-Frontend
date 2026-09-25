// Only render the SDK on the client side.
"use client";

import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "@common/BreadCrumb";

const Starter = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Starter" pageTitle="Pages" />
          <Row></Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Starter;
