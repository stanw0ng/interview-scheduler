import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }; 

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    {/* put path is written in appointment.js route */}
    return axios.put(`api/appointments/${id}`, {interview:interview})
    .then(res => {
        setState({...state, appointments})
        return res
      })
    .catch(err => console.log(err))
  }

  {/* function which receives day and changes value of day in state */}
  const setDay = day => setState({...state, day});
  
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      {/* fetches data then updates the state of with days and appointments */}
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])
  
  const appointmentsForDay = getAppointmentsForDay(state, state.day)
  const interviewersForDay = getInterviewersForDay(state, state.day)

  const schedule = appointmentsForDay.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewersForDay}
        bookInterview={bookInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            setDay={setDay}
            bookInterview={bookInterview}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" bookInterview={bookInterview} />
      </section>
    </main>
  );
}
