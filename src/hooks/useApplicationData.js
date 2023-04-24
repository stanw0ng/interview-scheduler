import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = (initial) => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  function bookInterview(id, interview) {
    {/* interview comes from the object defined in save function, below updates the interview for an appointment */}
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }; 

    {/* updates the appointment in appointments */}
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
  }

  {/* just need id to reference interview for deletion (since interview data will be null) */}
  function cancelInterview(id) {
    {/* rewrites interview to back null and avoids TypeError */}
    const appointment = {
      ...state.appointments[id],
      interview: null
    }; 

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`api/appointments/${id}`)
    .then(res => {
        setState({...state, appointments})
        return res
      })
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

  return {
    state,
    setDay, 
    bookInterview, 
    cancelInterview
  };
};

export default useApplicationData;