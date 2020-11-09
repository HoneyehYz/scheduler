import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";


export default function Form(props) {
  const [interviewer, setInterviewer ] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");


  //Form Validation
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if(!interviewer){
      setError('Please Select an interviewer');
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }
  // Reset; passed to cancel
  function reset() {
    setName("");
    setInterviewer(null);
  };

  //Action upon clicking 'Cancel' button
  function cancel() {
    reset();
    props.onCancel();
  }

return(<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input 
        className="appointment__create-input text--semi-bold"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="Enter Student Name"
        data-testid="student-name-input"
      />
      <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList 
    interviewers={props.interviewers} 
    value={interviewer} 
    onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={validate} confirm>Save</Button>
    </section>
  </section>
</main>)
}