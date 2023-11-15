import Logo from '../../assets/casmm_logo.png';
import "./ViewIncident.less";

function ViewIncident({ isPending, isProject }) {
  // Incident data should come from DB. Values are hardcoded for now.
  const user = "Student1";
  const title = "My Project";
  const reports = 5;
  const views = 100;
  const status = "Approved";
  const commentText = "This is a very very very very very very very very very long comment!";

  // Renders status depending on if we're in the Pending Review or Resolved tab. Throws exception
  // if status value is unexpected with regards to the current tab.
  function renderStatus() {
    if (isPending) {
      if (status == null) {
        return null;
      }
      else {
        /*
        throw new Error("Selected incident in Pending Review tab has a status defined. " +
          "Only resolved incidents should have a status."
        );
        */
      }
    }
    else { // !isPending
      if (status === "Approved" || status === "Rejected") {
        return (
          <div>
            <b>Status:</b> {status}
          </div>
        );
      }
      else {
        /*
        throw new Error("Selected incident in Resolved tab has unexpected or undefined status." +
          "Expected \"Approved\" or \"Rejected\"."
        );
        */
      }
    }
  }

  // Renders thumbnail or commentText depending on if the selected incident is a project or
  // comment.
  function renderContent() {
    if (isProject) {
      return <img src={Logo} className="preview" />; // Logo is a placeholder image.
    }
    else {
      return (
        <div className="preview">
          <div>
            <b>Comment:</b> {commentText}
          </div>
        </div>
      );
    }
  }

  // Returns className for styling Incident Summary box. White for Pending Review tab, and green
  // or red for Resolved tab.
  function changeBoxColor() {
    if (isPending) {
      return "pending";
    }
    else {
      if (status === "Approved") {
        return "resolved-approved";
      }
      else if (status === "Rejected") {
        return "resolved-rejected";
      }
    }
  }

  return (
    <div className="right-column">

      <h3><b>Incident Summary</b></h3>
      <p><b>Select an incident to view more information</b></p>

      <div className="view-incident">
        <div className={changeBoxColor()}>

          <b>User:</b> {user}
          <br />
          <b>Title:</b> {title}
          <br />
          <b>Reports:</b> {reports}
          <br />
          <b>Views:</b> {views}
          <br />
          {renderStatus()}
          <br />
          {renderContent()}

        </div>
      </div>

    </div>
  );
}

export default ViewIncident;
