import { message } from "antd"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BlocklyCanvasPanel from "../../components/ActivityPanels/BlocklyCanvasPanel/BlocklyCanvasPanel"
import NavBar from "../../components/NavBar/NavBar"
import {
  getAuthorizedWorkspaceToolbox,
  getActivityToolbox,
  getActivityToolboxAll,
} from "../../Utils/requests"
import { useGlobalState } from "../../Utils/userState"

//TO SUBMIT TO GALLERY
alert("BlocklyPage");
export default function BlocklyPage({ isSandbox }) {
  const [value] = useGlobalState("currUser")
  const [activity, setActivity] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const setup = async () => {
		//alert(" window.location.href:"+ window.location.href);
      // if we are in sandbox mode show all toolbox
      const sandboxActivity = JSON.parse(localStorage.getItem("sandbox-activity"))
      if (isSandbox) {
		  alert("BlocklyPage isSandbox!");
        const AllToolboxRes = await getActivityToolboxAll()
        if (!sandboxActivity?.id || value.role === "Mentor"|| window.location.href === "http://localhost:3000/workspaceGallery") {
			alert("BlocklyPage Line 29!");
          if (AllToolboxRes.data) {
			  			alert("BlocklyPage Line 31 GOOD");
            let loadedActivity = {
              ...sandboxActivity,
              toolbox: AllToolboxRes.data.toolbox,
            }
            localStorage.setItem("sandbox-activity", JSON.stringify(loadedActivity))
            setActivity(loadedActivity)
          } else { alert("BlocklyPage Line 40 error");
            message.error(AllToolboxRes.err)
          }
        } 
		else if (value.role === "ContentCreator") {
						alert("BlocklyPage Line 41");
          const res = await getAuthorizedWorkspaceToolbox(sandboxActivity.id)
          if (res.data) {
            let loadedActivity = { ...sandboxActivity, selectedToolbox: res.data.toolbox }
            loadedActivity = { ...loadedActivity, toolbox: AllToolboxRes.data.toolbox }

            localStorage.setItem("sandbox-activity", JSON.stringify(loadedActivity))
            setActivity(loadedActivity)
          } else {
            message.error(res.err)
          }
        }
					alert("BlocklyPage Line 53 sandboxActivity.id: "+ sandboxActivity.id);

      }
      // else show toolbox based on the activity we are viewing
      else {
		  		  alert("BlocklyPage NotSandbox");

        const localActivity = JSON.parse(localStorage.getItem("my-activity"))

        if (localActivity) {
          if (localActivity.toolbox) {
            setActivity(localActivity)
          } else {
            const res = await getActivityToolbox(localActivity.id)
            if (res.data) {
              let loadedActivity = { ...localActivity, toolbox: res.data.toolbox }

              localStorage.setItem("my-activity", JSON.stringify(loadedActivity))
              setActivity(loadedActivity)
            } else {
              message.error(res.err)
            }
          }
        } else {
						alert("BlocklyPage Line 75");

          navigate(-1)
        }
      }
    }

    setup()
  }, [isSandbox, navigate, value.role])

  return (
    <div className="container nav-padding">
      <NavBar />
      <div className="flex flex-row">
        <BlocklyCanvasPanel activity={activity} setActivity={setActivity} isSandbox={isSandbox} />
        
      </div>


    </div>
  )
}