import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { getRsvpCount, submitRsvp, getRsvpByGuestCode } from "./api/rsvpApi";
import { getGuestByCode } from "./constants/guestCodes";
import Schedule from "./components/Schedule";

const MAX_ATTENDEES = 16;

function App() {
  // State for RSVP count
  const [rsvpStats, setRsvpStats] = useState({
    confirmedCount: 0,
    maxCount: MAX_ATTENDEES,
  });

  // Loading state for RSVP operations
  const [isLoading, setIsLoading] = useState(false);

  // Fetch RSVP count on component mount
  useEffect(() => {
    fetchRsvpCount();
  }, []);

  // Function to fetch RSVP count
  const fetchRsvpCount = async () => {
    setIsLoading(true);
    try {
      const data = await getRsvpCount();
      if (data.success) {
        setRsvpStats({
          confirmedCount: data.confirmedCount,
          maxCount: data.maxCount,
        });
      }
    } catch (error) {
      // Keep the default values if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  // Initial form state
  const initialFormState = useMemo(() => ({
    name: "",
    email: "",
    phone: "",
    attending: false,
    golfCourses: {
      paynesValley: true,
      paynesValleyTime: "7:00 AM",
      buffaloRidge: true,
      buffaloRidgeTime: "11:00 AM",
      noGolf: false,
    },
    boatExcursion: true,
    comments: "",
  }), []);

  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [guestCode, setGuestCode] = useState(null);
  const [guestInfo, setGuestInfo] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Check for guest code in URL parameters
  useEffect(() => {
    const checkGuestCode = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        const guest = getGuestByCode(code);
        if (guest) {
          setGuestCode(code);
          setGuestInfo(guest);

          // Fetch previous RSVP data for this guest
          setIsLoading(true);
          try {
            const response = await getRsvpByGuestCode(code);
            if (response.success && response.data) {
              // Update form data with previously saved values
              setFormData({
                ...initialFormState,
                ...response.data,
                // Ensure nested objects are properly merged
                golfCourses: {
                  ...initialFormState.golfCourses,
                  ...(response.data.golfCourses || {})
                }
              });

              // If they've submitted before, they've interacted with the form
              setHasInteracted(true);
            }
          } catch (error) {
            // Handle error silently
          } finally {
            setIsLoading(false);
          }
        }
      }
    };

    checkGuestCode();
    fetchRsvpCount();
  }, [initialFormState]);

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
    let updatedFormData;

    if (option === "paynesValley" || option === "buffaloRidge") {
      updatedFormData = {
        ...formData,
        golfCourses: {
          ...formData.golfCourses,
          [option]: !formData.golfCourses[option],
          // If enabling a golf option, make sure noGolf is false
          noGolf: formData.golfCourses[option]
            ? formData.golfCourses.noGolf
            : false,
        },
      };

      setFormData(updatedFormData);
    } else if (option === "boatExcursion") {
      updatedFormData = {
        ...formData,
        boatExcursion: !formData.boatExcursion,
      };

      setFormData(updatedFormData);
    }

    // Create a custom event with a flag to identify it as an option toggle
    const customEvent = new Event("submit");
    customEvent.isOptionToggle = true;

    // Submit the updated form data to the backend
    setTimeout(() => {
      // Use setTimeout to ensure state is updated before submitting
      handleSubmit(customEvent);
    }, 0);
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

  // Update RSVP stats when form is submitted
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Determine if this is a checkbox toggle, option toggle, or a full form submission
    const isCheckboxToggle = event.isCheckboxToggle === true;
    const isOptionToggle = event.isOptionToggle === true;

    setIsLoading(true);
    try {
      // For checkbox toggles, use the explicit new value
      const dataToSubmit = isCheckboxToggle
        ? {
            ...formData,
            attending: event.newAttendingStatus, // Use the explicit new value
            guestCode,
            guestName: guestInfo ? guestInfo.name : formData.name,
          }
        : {
            ...formData,
            attending: formData.attending, // Use the current attending value
            guestCode,
            guestName: guestInfo ? guestInfo.name : formData.name,
          };

      // Remove id field if it exists to prevent update errors
      if (dataToSubmit.id) {
        delete dataToSubmit.id;
      }

      // Submit RSVP data to backend
      const response = await submitRsvp(dataToSubmit);

      if (response.success) {
        // Fetch updated RSVP count after successful submission
        await fetchRsvpCount();

        // Only set submitted to true for explicit form submissions, not checkbox toggles or option toggles
        if (!isCheckboxToggle && !isOptionToggle) {
          setSubmitted(true);
        }
      } else {
        // Handle error silently
      }
    } catch (error) {
      // Handle error silently
    } finally {
      setIsLoading(false);
    }
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
                                  onChange={() => {
                                    // Mark that user has interacted with the checkbox
                                    setHasInteracted(true);

                                    // Get the current attending status before toggling
                                    const currentAttendingStatus = formData.attending;
                                    
                                    // Toggle attending status in the UI
                                    const newAttendingStatus = !currentAttendingStatus;
                                    setFormData((prev) => ({
                                      ...prev,
                                      attending: newAttendingStatus,
                                    }));

                                    // Create a custom event with a flag to identify it as a checkbox toggle
                                    const customEvent = new Event("submit");
                                    customEvent.isCheckboxToggle = true;
                                    customEvent.currentAttendingStatus = currentAttendingStatus;
                                    customEvent.newAttendingStatus = newAttendingStatus;

                                    // Submit the form when checkbox is toggled
                                    setTimeout(() => {
                                      handleSubmit(customEvent);
                                    }, 0);
                                  }}
                                  disabled={!guestCode}
                                />
                                <span className="giant-checkbox"></span>
                                <span className="giant-checkbox-text">
                                  {isLoading
                                    ? "Loading..."
                                    : formData.attending
                                    ? "I will be there!"
                                    : hasInteracted
                                    ? "No, I can't come"
                                    : "Attending?"}
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="mt-auto">
                            <div className="d-flex justify-content-between align-items-center mb-2 mb-md-3">
                              <small className="text-muted d-flex align-items-center">
                                {/* Display accurate RSVP count */}
                                {isLoading
                                  ? "Loading..."
                                  : `${rsvpStats.confirmedCount} of ${rsvpStats.maxCount} friends joining`}
                              </small>
                              <div
                                className="progress flex-grow-1 mx-2"
                                style={{ height: "8px" }}
                              >
                                <div
                                  className={`progress-bar ${
                                    isLoading
                                      ? "progress-bar-striped progress-bar-animated"
                                      : "bg-success"
                                  }`}
                                  role="progressbar"
                                  style={{
                                    width: `${
                                      ((rsvpStats.confirmedCount +
                                        (formData.attending ? 1 : 0)) /
                                        rsvpStats.maxCount) *
                                      100
                                    }%`,
                                  }}
                                  aria-valuenow={
                                    rsvpStats.confirmedCount +
                                    (formData.attending ? 1 : 0)
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
                    {guestCode ? (
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
                    ) : (
                      <div className="text-center mt-4">
                        <Alert variant="info">
                          Please use your personal invitation link to view the
                          full content.
                        </Alert>
                      </div>
                    )}
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
