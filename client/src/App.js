import React, { useState } from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import Schedule from "./components/Schedule";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "golf":
      return (
        <div className="p-3 border border-top-0 rounded-bottom">
          <h4>Golf Group Details</h4>
          <p>Details about the golf group will be shown here.</p>
          {/* Add golf group content here */}
        </div>
      );
    case "rooming":
      return (
        <div className="p-3 border border-top-0 rounded-bottom">
          <h4>Rooming Details</h4>
          <p>Room assignments and lodging information will be shown here.</p>
          {/* Add rooming details content here */}
        </div>
      );
    case "schedule":
    default:
      return (
        <div className="schedule-section">
          <Schedule />
        </div>
      );
  }
};

function App() {
  const [activeTab, setActiveTab] = useState("schedule");
  // Constants for cost calculation
  const COSTS = {
    accommodation: {
      perCottage: 2614.0, // Total for 3 nights
      perPerson: 871.33, // Assuming 3 people per cottage
    },
    golf: {
      paynesValley: 400.0,
      buffaloRidge: 225.0,
    },
    boat: {
      perPerson: 32.0,
    },
  };

  const CostBreakdown = () => {
    const formatCurrency = (n) =>
      n.toLocaleString("en-US", { style: "currency", currency: "USD" });

    const accommodationCost = COSTS.accommodation.perPerson;
    const paynesValleyCost = COSTS.golf.paynesValley;
    const buffaloRidgeCost = COSTS.golf.buffaloRidge;
    const boatCost = COSTS.boat.perPerson;
    const totalCost =
      accommodationCost + paynesValleyCost + buffaloRidgeCost + boatCost;

    return (
      <div className="cost-breakdown-container mt-4 mb-4">
        <h4>Estimated Cost Breakdown</h4>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Item</th>
                <th>Cost</th>
                <th>Selected</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Item">Accommodation (3 nights, per person)</td>
                <td data-label="Cost">{formatCurrency(accommodationCost)}</td>
                <td data-label="Selected">✓</td>
              </tr>
              <tr className="table-success">
                <td data-label="Item">Payne's Valley Golf</td>
                <td data-label="Cost">{formatCurrency(paynesValleyCost)}</td>
                <td data-label="Selected">✓</td>
              </tr>
              <tr className="table-success">
                <td data-label="Item">Buffalo Ridge Golf</td>
                <td data-label="Cost">{formatCurrency(buffaloRidgeCost)}</td>
                <td data-label="Selected">✓</td>
              </tr>
              <tr className="table-success">
                <td data-label="Item">Boat Excursion</td>
                <td data-label="Cost">{formatCurrency(boatCost)}</td>
                <td data-label="Selected">✓</td>
              </tr>
              <tr className="table-primary">
                <th data-label="Item">Total Estimated Cost</th>
                <th data-label="Cost">{formatCurrency(totalCost)}</th>
                <td data-label="Selected"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="invitation-card shadow">
              <Card.Body className="p-md-4 p-3">
                <h1 className="text-center mb-3 mb-md-4">
                  Jake's Bachelor Party Golf Trip!
                </h1>
                <>
                  <p className="text-center mb-3 mb-md-4">
                    Join us for an unforgettable golf weekend celebrating Jake's
                    last days of freedom! Please RSVP by filling out the form
                    below.
                  </p>

                  <div className="event-details mb-3 mb-md-4">
                    <div className="row">
                      <div className="col-md-8 d-flex flex-column justify-content-between fs-5">
                        <div>
                          <h3 className="mb-3 display-6">Event Details:</h3>
                          <p className="mb-2">
                            <strong>Date:</strong> August 21-24, 2025 (4 days)
                          </p>
                          <p className="mb-0">
                            <strong>Location:</strong> Big Cedar Lodge, Missouri
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4 d-flex align-items-center justify-content-center">
                        <img
                          src="/jake.jpeg"
                          alt="Jake"
                          className="img-fluid rounded jake-image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="combined-content">
                    {/* RSVP Form section */}
                    <div className="rsvp-section mb-4">
                      <h3 className="text-center mb-3 mb-md-4">
                        RSVP Information
                      </h3>
                      <CostBreakdown />
                    </div>

                    {/* Tab Navigation */}
                    <div className="tabs-container mt-4">
                      <Nav
                        variant="tabs"
                        defaultActiveKey="schedule"
                        className="mb-3 justify-content-center"
                        onSelect={(selectedKey) => setActiveTab(selectedKey)}
                      >
                        <Nav.Item>
                          <Nav.Link eventKey="schedule" className="fw-bold">
                            Schedule
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="golf" className="fw-bold">
                            Golf Groups
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="rooming" className="fw-bold">
                            Rooming Details
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>

                      <TabContent activeTab={activeTab} />
                    </div>
                  </div>
                </>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
