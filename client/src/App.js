import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { getRsvpCount } from "./api/rsvpApi";
import { getGuestByCode } from "./constants/guestCodes";
import Schedule from "./components/Schedule";

const MAX_ATTENDEES = 16;

function App() {
  // State for RSVP count
  const [rsvpStats, setRsvpStats] = useState({
    confirmedCount: 0,
    maxCount: MAX_ATTENDEES,
  });

  // Fetch RSVP count on component mount
  useEffect(() => {
    const fetchRsvpCount = async () => {
      try {
        const data = await getRsvpCount();
        if (data.success) {
          setRsvpStats({
            confirmedCount: data.confirmedCount,
            maxCount: data.maxCount,
          });
        }
      } catch (error) {
        console.error("Failed to fetch RSVP count:", error);
        // Keep the default values if there's an error
      }
    };

    fetchRsvpCount();
  }, []);

  // Initial form state
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    attending: true,
    arrivalDate: "2025-08-21",
    departureDate: "2025-08-24",
    golfCourses: {
      paynesValley: true,
      paynesValleyTime: "7:00 AM",
      buffaloRidge: true,
      buffaloRidgeTime: "11:00 AM",
      noGolf: false,
    },
    rentalClubs: "no",
    boatExcursion: true,
    comments: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [guestCode, setGuestCode] = useState(null);
  const [guestInfo, setGuestInfo] = useState(null);

  // Fetch RSVP count on component mount
  useEffect(() => {
    const fetchRsvpCount = async () => {
      try {
        const data = await getRsvpCount();
        if (data.success) {
          setRsvpStats({
            confirmedCount: data.confirmedCount,
            maxCount: data.maxCount,
          });
        }
      } catch (error) {
        console.error("Failed to fetch RSVP count:", error);
        // Keep the default values if there's an error
      }
    };

    // Check for guest code in URL parameters
    const checkGuestCode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        const guest = getGuestByCode(code);
        if (guest) {
          setGuestCode(code);
          setGuestInfo(guest);
        }
      }
    };

    fetchRsvpCount();
    checkGuestCode();
  }, []);

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

  // Calculate total cost based on selections
  const calculateTotalCost = () => {
    let total = COSTS.accommodation.perPerson; // Base cost (accommodation)

    // Add golf costs
    if (formData.golfCourses.paynesValley) {
      total += COSTS.golf.paynesValley;
    }

    if (formData.golfCourses.buffaloRidge) {
      total += COSTS.golf.buffaloRidge;
    }

    // Add boat excursion cost
    if (formData.boatExcursion) {
      total += COSTS.boat.perPerson;
    }

    return total;
  };

  // Toggle options when clicking on the cost breakdown table rows
  const toggleOption = (option) => {
    if (option === "paynesValley" || option === "buffaloRidge") {
      setFormData((prevData) => ({
        ...prevData,
        golfCourses: {
          ...prevData.golfCourses,
          [option]: !prevData.golfCourses[option],
          // If enabling a golf option, make sure noGolf is false
          noGolf: prevData.golfCourses[option]
            ? prevData.golfCourses.noGolf
            : false,
        },
      }));
    } else if (option === "boatExcursion") {
      setFormData((prevData) => ({
        ...prevData,
        boatExcursion: !prevData.boatExcursion,
      }));
    }
  };

  // Cost Breakdown Component
  const CostBreakdown = () => {
    const totalCost = calculateTotalCost();
    const accommodationCost = COSTS.accommodation.perPerson;

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
                <td data-label="Cost">${accommodationCost.toFixed(2)}</td>
                <td data-label="Selected">✓</td>
              </tr>
              <tr
                className={
                  formData.golfCourses.paynesValley
                    ? "table-success"
                    : "text-muted"
                }
                onClick={() => toggleOption("paynesValley")}
                style={{ cursor: "pointer" }}
              >
                <td data-label="Item">Payne's Valley Golf</td>
                <td data-label="Cost">${COSTS.golf.paynesValley.toFixed(2)}</td>
                <td data-label="Selected">
                  {formData.golfCourses.paynesValley ? "✓" : "—"}
                </td>
              </tr>
              <tr
                className={
                  formData.golfCourses.buffaloRidge
                    ? "table-success"
                    : "text-muted"
                }
                onClick={() => toggleOption("buffaloRidge")}
                style={{ cursor: "pointer" }}
              >
                <td data-label="Item">Buffalo Ridge Golf</td>
                <td data-label="Cost">${COSTS.golf.buffaloRidge.toFixed(2)}</td>
                <td data-label="Selected">
                  {formData.golfCourses.buffaloRidge ? "✓" : "—"}
                </td>
              </tr>
              <tr
                className={
                  formData.boatExcursion ? "table-success" : "text-muted"
                }
                onClick={() => toggleOption("boatExcursion")}
                style={{ cursor: "pointer" }}
              >
                <td data-label="Item">Boat Excursion</td>
                <td data-label="Cost">${COSTS.boat.perPerson.toFixed(2)}</td>
                <td data-label="Selected">
                  {formData.boatExcursion ? "✓" : "—"}
                </td>
              </tr>
              <tr className="table-primary">
                <th data-label="Item">Total Estimated Cost</th>
                <th data-label="Cost">${totalCost.toFixed(2)}</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted small">
          <em>
            Note: This is an estimate based on your selections. Final costs may
            vary. Accommodation cost assumes 3 people per cottage. Click on any
            row to toggle that option. We strongly encourage everyone to
            participate in all of the events as it will be a much more fun
            experience that way!
          </em>
        </p>
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
                {!submitted ? (
                  <>
                    <p className="text-center mb-3 mb-md-4">
                      Join us for an unforgettable golf weekend celebrating
                      Jake's last days of freedom! Please RSVP by filling out
                      the form below.
                    </p>

                    <div className="event-details mb-3 mb-md-4">
                      <div className="row">
                        <div className="col-md-8 d-flex flex-column justify-content-between">
                          <div>
                            <h4>Event Details:</h4>
                            <p>
                              <strong>Date:</strong> August 21-24, 2025 (4 days)
                            </p>
                            <p>
                              <strong>Location:</strong> Big Cedar Lodge,
                              Missouri
                            </p>
                          </div>

                          <div className="my-2 my-md-3">
                            <div className="giant-checkbox-container">
                              <label className="giant-checkbox-label">
                                <input
                                  type="checkbox"
                                  className="giant-checkbox-input"
                                  checked={formData.attending}
                                  onChange={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      attending: !prev.attending,
                                    }))
                                  }
                                />
                                <span className="giant-checkbox"></span>
                                <span className="giant-checkbox-text">
                                  {formData.attending
                                    ? "I will be there!"
                                    : "No, I can't come"}
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-2 mb-md-3">
                              <small className="text-muted">
                                {formData.attending
                                  ? `${rsvpStats.confirmedCount + 1} of ${
                                      rsvpStats.maxCount
                                    } friends joining`
                                  : `${rsvpStats.confirmedCount} of ${rsvpStats.maxCount} friends joining`}
                              </small>
                              <div
                                className="progress flex-grow-1 mx-2"
                                style={{ height: "8px" }}
                              >
                                <div
                                  className="progress-bar bg-success"
                                  role="progressbar"
                                  style={{
                                    width: `${
                                      ((formData.attending
                                        ? rsvpStats.confirmedCount + 1
                                        : rsvpStats.confirmedCount) /
                                        rsvpStats.maxCount) *
                                      100
                                    }%`,
                                  }}
                                  aria-valuenow={
                                    formData.attending
                                      ? rsvpStats.confirmedCount + 1
                                      : rsvpStats.confirmedCount
                                  }
                                  aria-valuemin="0"
                                  aria-valuemax={rsvpStats.maxCount}
                                ></div>
                              </div>
                            </div>
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

                    {/* Combined schedule and form content */}
                    <div className="combined-content">
                      {/* RSVP Form section */}
                      {formData.attending && (
                        <div className="rsvp-section mb-4">
                          <h3 className="text-center mb-3 mb-md-4">
                            RSVP Information for{" "}
                            {guestInfo ? guestInfo.name : ""}
                          </h3>
                          <CostBreakdown />
                        </div>
                      )}

                      {/* Schedule section */}
                      <div className="schedule-section mt-4">
                        <Schedule attending={formData.attending} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <Alert variant="success" className="mb-3 mb-md-4">
                      Thanks for your response, {formData.name}! We've received
                      your RSVP.
                    </Alert>
                    <p>
                      We'll be in touch with more details soon. Get ready for an
                      amazing golf weekend!
                    </p>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData(initialFormState);
                      }}
                      className="mt-3"
                    >
                      Submit Another Response
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
