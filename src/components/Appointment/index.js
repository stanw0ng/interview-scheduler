import React from "react";
import "./styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode (
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  function remove() {
    {/* will only trigger if confirm in CONFIRM is clicked  */}
    if (mode === CONFIRM) {
      transition(DELETING)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
    } else {
      {/* transitions to CONFIRM before actually deleting */}
      transition(CONFIRM);      
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition("CREATE")} />}
      {mode === SHOW && (
       <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={remove}
       />
      )}
      {mode === CREATE && 
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />}
      {mode === SAVING && <Status message="Saving..."/>}
      {mode === CONFIRM && 
        <Confirm
        onCancel={back}
        onConfirm={remove}
        message = "Are you sure you would like to delete?"
        />}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
  );
}
