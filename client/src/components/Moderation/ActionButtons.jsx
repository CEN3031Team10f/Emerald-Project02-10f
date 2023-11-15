import React from 'react';
import './ActionButtons.less';
//import { <-- Import database getter/setters necessary for button function
//  createActivity,
//  deleteActivity,
//  getLessonModuleActivities,
//} from "../../Utils/requests";
import { Button } from 'antd';

export default function ActionButtons({uniqueKey, display = 0}) {

  function Approve() {
    // Mark content as appropriate and remove any restrictions on it
    alert("The content has been approved! Uniqiue key: " + uniqueKey);
    
    // Use setter from requests.js to update status column as approved

    // Remove hidden status from gallery, if hidden

  }

  function Reject() {
    // Mark content as inappropriate and restrict it from being displayed publically
    alert("The content has been rejected! Uniqiue key: " + uniqueKey);

    // Use setter from requests.js to update status column as rejected

    // Enabling hiding post from gallery if not already hidden
    
  }

  if (display == 0) {
    return (
      <span className="ActionButtons">
          <Button className={'approve'} onClick={ Approve }>Approve</Button>
          <Button className={'reject'} onClick={ Reject }>Reject</Button>
      </span>
    );
  }
  if (display == 1) {
    return (
      <span className="ActionButtons">
          <Button className={'approve'} onClick={ Approve }>Approve</Button>
      </span>
    );
  }
  if (display == 2) {
    return (
      <span className="ActionButtons">
          <Button className={'reject'} onClick={ Reject }>Reject</Button>
      </span>
    );
  } else {
    return (
      <span className="ActionButtons">
          <Button className={'approve'} onClick={ Approve }>Approve</Button>
          <Button className={'reject'} onClick={ Reject }>Reject</Button>
      </span>
    );
  }
}
