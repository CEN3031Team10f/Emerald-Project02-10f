import React, { useState } from 'react';
import Less from './CommentFlagButton.less';
//import { <-- Import database getter/setters necessary for button function
//  createActivity,
//  deleteActivity,
//  getLessonModuleActivities,
//} from "../../Utils/requests";
import { Button } from 'antd';

export default function CommentFlagButton({uniqueKey}){

  let [status, setStatus] = useState("Unclicked");
  let [clicked, setClicked] = useState(false);
  //if user already reported comment: setAction("Unflag");
  //if user already reported comment: setClicked(true);
  //will be done by iterating through the array of reporters
  //for comment and attempting to match them with the user
  //if globally hidden, flags should cease to be created

  function HandleClick() {
    if (!clicked) {
      Flag();
    } else if (clicked) {
      Unflag();
    }
  }

  function Flag() {
    alert("The content has been flagged! Uniqiue key: " + uniqueKey);
    setStatus("Clicked");
    setClicked(true);
    //add user to array of reporters for specific post
    //hide content for specific user
  }

  function Unflag() {
    alert("The content has been unflagged! Unique key: " + uniqueKey);
    setStatus("Unclicked");
    setClicked(false);
    //remove user from array of reporters for specific post
    //unhide content from specific user
  }

  return (
    <span className ={status}>
        <Button className="flag" onClick={ HandleClick }> </Button>
    </span>
  );
}
