import React from "react";
import "components/Appointment/styles.scss";
import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import { useVisualMode } from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
// Transition Views
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // Added Callbacks to book interview & CancelInterview to avoid .then of undefined Error
  // Save an appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props
    .bookInterview(props.id, interview, transition, SHOW, ERROR_SAVE)
  }
  // Delete an appointment
  function deleteApp() {
    transition(DELETING, true);
    props
    .cancelInterview(props.id, transition, EMPTY, ERROR_DELETE)
  }
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && props.interview && (
    <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={() => transition(CONFIRM)}
    onEdit={() => transition(EDIT)}
    />
    )}
    {mode === CREATE && (
      <Form 
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
      />
    )}
    {mode === SAVING && (
      <Status
      message="Saving"
      />
    )}
    {mode === DELETING && (
      <Status
      message="Deleting"
      />
    )}
    {mode === CONFIRM && (
    <Confirm
    message="Are you sure you would like to delete?"
    onCancel={back}
    onConfirm={deleteApp}
    />
    )}
    {mode === EDIT && (
      <Form
      name={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error message="Error Deleting Appointment" onClose={back} />
    )}

    {mode === ERROR_SAVE && (
      <Error message="Error Saving Appointment" onClose={back} />
    )}
        </article>
  );
}