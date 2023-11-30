import React, { useEffect, useState } from 'react';
import { getActivityToolbox } from '../../Utils/requests.js';
import BlocklyCanvasPanel from '../../components/ActivityPanels/BlocklyCanvasPanel/BlocklyCanvasPanel';
import { message } from 'antd';
import NavBar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

export default function Workspace({ handleLogout }) {
					  alert("workspace 15");

  const [activity, setActivity] = useState({});
 
  useEffect(() => {
    const localActivity = JSON.parse(localStorage.getItem('my-activity'));
    const navigate = useNavigate();
				  alert("workspace 15");
    if (localActivity) {
      if (localActivity.toolbox) {
        setActivity(localActivity);
				  alert("workspace 19");
      } else {
		  alert("workspace 21");
        getActivityToolbox(localActivity.id).then((res) => {
          if (res.data) {
            let loadedActivity = { ...localActivity, toolbox: res.data.toolbox };

            localStorage.setItem('my-activity', JSON.stringify(loadedActivity));
            setActivity(loadedActivity);
          } else {
			  				  alert("workspace 29");
            message.error(res.err);
			
          }
        });
      }
    } else {
      navigate(-1);
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };
alert("workspace 43");
  return (
    console.log("workspace 46~~~~~~~");
    <div className='container flex flex-row nav-padding'>
      <NavBar isStudent={true} />
      <BlocklyCanvasPanel
        activity={activity}
        lessonName={`${activity.lesson_module_name}, Activity ${activity.number}`}
        handleGoBack={handleGoBack}
        handleLogout={handleLogout}
        isStudent={true}
      />
    </div>
  );
}
