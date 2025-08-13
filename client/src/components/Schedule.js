import React from "react";

/**
 * Schedule component for Jake's Bachelor Golf Trip
 * Displays the detailed schedule for the weekend
 */
const Schedule = () => {
  return (
    <div className="schedule-container">
      <h2 className="text-center mb-4">Weekend Schedule</h2>
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
                Enjoy a 5-hour boat excursion on Table Rock Lake. Drinks, wake
                boarding all the fun!
              </p>
            </div>
          </li>
          <li>
            <div className="time">7:00 PM</div>
            <div className="event">
              <h4>Welcome Dinner</h4>
              <p>
                Group dinner at Tall Tales Bar & Grill with drinks and toasts to
                the groom.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="day-container">
        <h3>Friday, August 22, 2025</h3>
        <ul className="timeline">
          <li>
            <div className="time">9:00 AM - 12:00 PM</div>
            <div className="event">
              <h4>
                Top of the Rock Lost Canyon Cave & Nature Trail Golf Cart Ride
              </h4>
              <p>
                Whip a golf cart through the winding trail of a marvelous cave
                where you can purchase refreshments at the Bat Bar as well as
                the scenic overlook where you can step out onto our skybridge
                for a breathtaking view of the Ozarks.
              </p>
            </div>
          </li>
          <li>
            <div className="time">1:00 PM - 1:20 PM</div>
            <div className="event">
              <h4>Tee Times at Buffalo Ridge</h4>
              <p>Available tee times: 1:00 PM, 1:10 PM, and 1:20 PM</p>
              <p>
                This Tom Fazio design is consistently rated as the best course
                in Missouri and features free-ranging buffalo from the nearby
                Dogwood Canyon Nature Park.
              </p>
            </div>
          </li>
          <li>
            <div className="time">6:00 PM</div>
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
                Gather around the fire pit for drinks, cigars, and storytelling.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="day-container">
        <h3>Saturday, August 23, 2025</h3>
        <ul className="timeline">
          <li>
            <div className="time">10:00 AM - 12:00 PM</div>
            <div className="event">
              <h4>Breakfast & Recovery at The Truman Café</h4>
              <p>
                Enjoy a hearty breakfast at the legendary Truman Café and take
                some time to rest and recover before heading out to Payne's
                Valley.
              </p>
            </div>
          </li>
          <li>
            <div className="time">1:30 PM - 1:50 PM</div>
            <div className="event">
              <h4>Tee Times at Payne's Valley</h4>
              <p>Available tee times: 1:30 PM, 1:40 PM, and 1:50 PM</p>
              <p>
                Designed by Tiger Woods, this is Big Cedar's newest and most
                spectacular course. The 19th hole is an island green in a canyon
                and is not to be missed!
              </p>
            </div>
          </li>
          <li>
            <div className="time">6:15 PM</div>
            <div className="event">
              <h4>Bachelor Party Dinner at Mountain Top Grill</h4>
              <p>
                Upscale dining experience in the historic Mountain Top Grill
                overlooking Mountain Top Course and Payne’s Valley Course.
              </p>
              <p>Special toasts and roasts of the groom!</p>
            </div>
          </li>
          <li>
            <div className="time">9:30 PM</div>
            <div className="event">
              <h4>The Roast</h4>
              <p>
                Hosted by <strong>Alec Anson</strong>
              </p>
              <p>
                The groom and his friends gather to roast the groom and
                celebrate his upcoming marriage.
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="day-container">
        <h3>Sunday, August 24, 2025</h3>
        <ul className="timeline">
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
