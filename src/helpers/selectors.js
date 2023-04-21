function getAppointmentsForDay(state, dayName) {
  const appointmentsArr = [];
  const matches = [];
  
  state.days.map(day => {
    if (day.name === dayName) {
      day.appointments.forEach(apptId => appointmentsArr.push(apptId))
    }
    return null;
  })

  appointmentsArr.forEach(id => matches.push(state.appointments[id]))

  return matches;
}

module.exports = { getAppointmentsForDay };