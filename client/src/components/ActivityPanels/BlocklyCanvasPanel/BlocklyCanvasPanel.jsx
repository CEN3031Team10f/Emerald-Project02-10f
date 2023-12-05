import React from 'react';
import PublicCanvas from './canvas/PublicCanvas';
import StudentCanvas from './canvas/StudentCanvas';
import MentorCanvas from './canvas/MentorCanvas';
import ContentCreatorCanvas from './canvas/ContentCreatorCanvas';
import { useGlobalState } from '../../../Utils/userState';
import GalleryCanvas from './canvas/GalleryCanvas';


const BlocklyCanvasPanel = ({ activity, isSandbox, setActivity, isFork }) => {

  const [value] = useGlobalState('currUser');

  const userRole = value.role;
  //check if the fork button is clicked or not.
  // if the fork button is clicked, return GalleryCanvas.
  if(isFork)
  {
	  return <GalleryCanvas editing = {isFork} />;
  }
  else{
	  
	  switch (userRole) {
    case 'DefaultUser':
      return <PublicCanvas activity={activity} isSandbox={isSandbox} />;
    case 'Student':
      return <StudentCanvas activity={activity} />;
    case 'Mentor':
      return <MentorCanvas
      activity={activity}
      setActivity={setActivity}
      isSandbox={isSandbox}
      isMentorActivity={!activity.selectedToolbox && !isSandbox}
      />;
    case 'ContentCreator':
      return (
        <ContentCreatorCanvas
          activity={activity}
          setActivity={setActivity}
          isSandbox={isSandbox}
          isMentorActivity={!activity.selectedToolbox && !isSandbox}
        />
      );
    default:
      return <div></div>;
  }
	  
	  
  }

  
};

export default BlocklyCanvasPanel;
