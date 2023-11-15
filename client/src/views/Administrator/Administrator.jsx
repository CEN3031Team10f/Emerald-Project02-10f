import React from "react"
import NavBar from "../../components/NavBar/NavBar"
import ActionButtons from "../../components/Moderation/ActionButtons"
import Resolved from "../../components/Moderation/Resolved"
import "./Administrator.less"

// Output for Administrator Page 
export default function Administrator(props) {
  const num = 3;
  return (
    <div className="container nav-padding">
      <NavBar />
      <Resolved/>
    </div>
  )
}
