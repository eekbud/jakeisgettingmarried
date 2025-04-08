import React from "react";

/**
 * Schedule component for Jake's Bachelor Golf Trip
 * Displays the detailed schedule for the weekend
 */
const Schedule = ({ attending = true }) => {
  return (
    <div className="schedule-container">
      <h2 className="text-center mb-4">
        {attending ? "Weekend Schedule" : "What You'll Be Missing!"}
      </h2>
      <p className="text-center mb-4">
        Join us for an unforgettable weekend at Big Cedar Lodge in Ridgedale,
        Missouri!
      </p>

      <div className="day-container">
        <h3>Thursday, August 21, 2025</h3>
        <ul className="timeline">
          <li>
            <div className="time">12:00 PM - 5:00 PM</div>
            <div className="event">
              <h4>Arrival & Boat Excursion</h4>
              <p>
                Check in to Big Cedar Lodge and settle into our lakeside
                cottages.
              </p>
              <p>
                Enjoy a 5-hour boat excursion on Table Rock Lake with a Tahoe
                T-21 boat rental ($510.33 total, approximately $32 per
                person).
              </p>
            </div>
          </li>
          <li>
            <div className="time">6:00 PM</div>
            <div className="event">
              <h4>Welcome Dinner</h4>
              <p>
                Group dinner at Osage Restaurant with drinks and toasts to the
                groom.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="day-container">
        <h3>Friday, August 22, 2025</h3>
        <ul className="timeline">
          <li>
            <div className="time">7:00 AM - 7:30 AM</div>
            <div className="event">
              <h4>Tee Times at Payne's Valley</h4>
              <p>Available tee times: 7:00 AM, 7:10 AM, and 7:30 AM</p>
              <p>
                Designed by Tiger Woods, this is Big Cedar's newest and most
                spectacular course. The 19th hole is an island green in a
                canyon and is not to be missed!
              </p>
              <p className="text-muted">
                <strong>Cost:</strong> $400 per person (includes cart and
                range balls)
              </p>
            </div>
          </li>
          <li>
            <div className="time">12:30 PM</div>
            <div className="event">
              <h4>Lunch at Mountain Top Grill</h4>
              <p>
                Casual lunch at the clubhouse after golf with stunning views
                of the Ozarks.
              </p>
            </div>
          </li>
          <li>
            <div className="time">2:00 PM - 6:00 PM</div>
            <div className="event">
              <h4>Free Time / Resort Activities</h4>
              <p>
                Options include fishing, hiking, spa treatments, or relaxing
                at the pool.
              </p>
            </div>
          </li>
          <li>
            <div className="time">7:00 PM</div>
            <div className="event">
              <h4>Group Dinner at Devil's Pool Restaurant</h4>
              <p>
                Rustic dining experience with hearty Ozark cuisine and
                spectacular views.
              </p>
            </div>
          </li>
          <li>
            <div className="time">9:00 PM</div>
            <div className="event">
              <h4>Bonfire & Drinks</h4>
              <p>
                Gather around the fire pit for drinks, cigars, and
                storytelling.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="day-container">
        <h3>Saturday, August 23, 2025</h3>
        <ul className="timeline">
          <li>
            <div className="time">11:00 AM - 11:30 AM</div>
            <div className="event">
              <h4>Tee Times at Buffalo Ridge</h4>
              <p>Available tee times: 11:00 AM, 11:10 AM, and 11:30 AM</p>
              <p>
                This Tom Fazio design is consistently rated as the best course
                in Missouri and features free-ranging buffalo from the nearby
                Dogwood Canyon Nature Park.
              </p>
              <p className="text-muted">
                <strong>Cost:</strong> $225 per person (includes cart and
                range balls)
              </p>
            </div>
          </li>
          <li>
            <div className="time">4:30 PM</div>
            <div className="event">
              <h4>19th Hole Drinks at Buffalo Bar</h4>
              <p>
                Post-round drinks and appetizers to celebrate (or commiserate
                over) the day's golf.
              </p>
            </div>
          </li>
          <li>
            <div className="time">7:00 PM</div>
            <div className="event">
              <h4>Bachelor Party Dinner at Worman House</h4>
              <p>
                Upscale dining experience in the historic Worman House with a
                private room for our group.
              </p>
              <p>Special toasts and roasts of the groom!</p>
            </div>
          </li>
          <li>
            <div className="time">9:30 PM</div>
            <div className="event">
              <h4>Night Out</h4>
              <p>
                Transportation provided to and from Branson Landing for those
                who want to continue the celebration.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="day-container">
        <h3>Sunday, August 24, 2025</h3>
        <ul className="timeline">
          <li>
            <div className="time">9:00 AM</div>
            <div className="event">
              <h4>Farewell Brunch</h4>
              <p>
                Casual brunch at the Truman Café to say our goodbyes before
                departing.
              </p>
            </div>
          </li>
          <li>
            <div className="time">11:00 AM</div>
            <div className="event">
              <h4>Check-out & Departures</h4>
              <p>
                Official check-out time is 11:00 AM. Safe travels home,
                everyone!
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Schedule;
