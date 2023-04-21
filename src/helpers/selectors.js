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

function getInterviewersForDay(state, dayName) {
  const interviewersArr = [];
  const matches = [];
  
  state.days.map(day => {
    if (day.name === dayName) {
      day.interviewers.forEach(interviewerId => interviewersArr.push(interviewerId))
    }
    return null;
  })

  interviewersArr.forEach(id => matches.push(state.interviewers[id]))

  return matches;
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer]
  return {student: interview.student, interviewer: interviewer}
}

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };