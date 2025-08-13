import React, { useState } from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import Schedule from "./components/Schedule";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import buffaloImage from "./assets/buffalo.jpg";
import paynesImage from "./assets/paynes.jpg";
import cottageImage from "./assets/cottage.jpg";

const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "golf":
      return (
        <div className="p-3 border border-top-0 rounded-bottom">
          <h3 className="text-center mb-4">Golf Group Details</h3>

          {/* Buffalo Ridge Groups */}
          <div className="course-section mb-5">
            <h4 className="text-center mb-3" style={{ color: "#5a3921" }}>
              🏌️ Buffalo Ridge
            </h4>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-header text-center"
                    style={{
                      backgroundColor: "#3a5134",
                      color: "rgba(245, 240, 230, 0.95)",
                    }}
                  >
                    <h5 className="mb-0">Group 1</h5>
                  </div>
                  <div className="card-body" style={{ color: "#5a3921" }}>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <strong>👑 Jacob</strong>
                      </li>
                      <li className="mb-2">Todd</li>
                      <li className="mb-2">Alec</li>
                      <li className="mb-2">Drew</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-header text-center"
                    style={{
                      backgroundColor: "#3a5134",
                      color: "#f5f0e6",
                    }}
                  >
                    <h5 className="mb-0">Group 2</h5>
                  </div>
                  <div className="card-body" style={{ color: "#5a3921" }}>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">Ryan</li>
                      <li className="mb-2">Connor</li>
                      <li className="mb-2">Angelo</li>
                      <li className="mb-2">Klein</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-header text-center"
                    style={{
                      backgroundColor: "#3a5134",
                      color: "#f5f0e6",
                    }}
                  >
                    <h5 className="mb-0">Group 3</h5>
                  </div>
                  <div className="card-body" style={{ color: "#5a3921" }}>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">Marco</li>
                      <li className="mb-2">Cole</li>
                      <li className="mb-2">Wyatt</li>
                      <li className="mb-2">Rob</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Buffalo Ridge Course Image */}
            <div className="text-center mt-4">
              <img
                src={buffaloImage}
                alt="Buffalo Ridge Golf Course"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Paynes Valley Groups */}
          <div className="course-section">
            <h4 className="text-center mb-3" style={{ color: "#5a3921" }}>
              ⛳ Paynes Valley
            </h4>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-header text-center"
                    style={{
                      backgroundColor: "#8b5a2b",
                      color: "#f5f0e6",
                    }}
                  >
                    <h5 className="mb-0">Group 1</h5>
                  </div>
                  <div className="card-body" style={{ color: "#5a3921" }}>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <strong>👑 Jacob</strong>
                      </li>
                      <li className="mb-2">Klein</li>
                      <li className="mb-2">Connor</li>
                      <li className="mb-2">Cole</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-header text-center"
                    style={{
                      backgroundColor: "#8b5a2b",
                      color: "#f5f0e6",
                    }}
                  >
                    <h5 className="mb-0">Group 2</h5>
                  </div>
                  <div className="card-body" style={{ color: "#5a3921" }}>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">Drew</li>
                      <li className="mb-2">Todd</li>
                      <li className="mb-2">Wyatt</li>
                      <li className="mb-2">Rob</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-header text-center"
                    style={{
                      backgroundColor: "#8b5a2b",
                      color: "#f5f0e6",
                    }}
                  >
                    <h5 className="mb-0">Group 3</h5>
                  </div>
                  <div className="card-body" style={{ color: "#5a3921" }}>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">Marco</li>
                      <li className="mb-2">Ryan</li>
                      <li className="mb-2">Alec</li>
                      <li className="mb-2">Angelo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Paynes Valley Course Image */}
            <div className="text-center mt-4">
              <img
                src={paynesImage}
                alt="Paynes Valley Golf Course"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      );
    case "rooming":
      return (
        <div className="p-3 border border-top-0 rounded-bottom">
          <h3 className="text-center mb-4"> 🏠 Rooming Details</h3>

          {/* Cabin Assignments */}
          <div className="cabin-section">
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-header text-center"
                    style={{
                      backgroundColor: "#8b5a2b",
                      color: "#f5f0e6",
                    }}
                  >
                    <h5 className="mb-0">Cabin 1</h5>
                  </div>
                  <div className="card-body" style={{ color: "#5a3921" }}>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <strong>👑 Jacob</strong>
                      </li>
                      <li className="mb-2">Drew</li>
                      <li className="mb-2">Todd</li>
                      <li className="mb-2">Ryan</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-header text-center"
                    style={{
                      backgroundColor: "#3a5134",
                      color: "#f5f0e6",
                    }}
                  >
                    <h5 className="mb-0">Cabin 2</h5>
                  </div>
                  <div className="card-body" style={{ color: "#5a3921" }}>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">Connor</li>
                      <li className="mb-2">Marco</li>
                      <li className="mb-2">Angelo</li>
                      <li className="mb-2">Alec</li>
                      <li className="mb-2">Klein</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <div
                    className="card-header text-center"
                    style={{
                      backgroundColor: "#8b5a2b",
                      color: "#f5f0e6",
                    }}
                  >
                    <h5 className="mb-0">Cabin 3</h5>
                  </div>
                  <div className="card-body" style={{ color: "#5a3921" }}>
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">Jirak</li>
                      <li className="mb-2">Wyatt</li>
                      <li className="mb-2">Rob</li>
                      <li className="mb-2">Cole</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Cottage/Cabin Image */}
            <div className="text-center mt-4">
              <img
                src={cottageImage}
                alt="Cabin Accommodations"
                className="img-fluid rounded shadow"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          </div>
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "jakeandmadi") {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
      setPassword("");
    }
  };

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

  // If not authenticated, show password form
  if (!isAuthenticated) {
    return (
      <div className="App">
        <Container className="py-4">
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <Card className="shadow">
                <Card.Body className="p-4">
                  <h2 className="text-center mb-4">Enter Password</h2>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {showError && (
                      <div className="alert alert-danger text-center">
                        Incorrect password. Please try again.
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg w-100"
                      style={{ backgroundColor: "#3a5134", borderColor: "#3a5134" }}
                    >
                      Access Content
                    </button>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

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
                    last days of freedom!
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
                    {/* <div className="rsvp-section mb-4">
                      <h3 className="text-center mb-3 mb-md-4">
                        RSVP Information
                      </h3>
                      <CostBreakdown />
                    </div> */}

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
