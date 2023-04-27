import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = (initial) => {

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });

  function updateSpots(appointments) {
    let days = state.days.map(day => {
      let spots = 0;
      for (const appointment of day.appointments) {
        if (appointments[appointment].interview === null) {
          spots++;
        }
      }
      return { ...day, spots };
    });
    return days;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(appointments);

    return axios.put(`api/appointments/${id}`, { interview: interview })
      .then(() => {
        return setState({ ...state, appointments, days });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(appointments);

    return axios.delete(`api/appointments/${id}`)
      .then(res => {
        setState({ ...state, appointments, days });
        return res;
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};

export default useApplicationData;