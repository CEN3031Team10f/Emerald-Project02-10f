import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import AdminTab from "../../components/Moderation/AdminTab";
import ViewIncident from "../../components/Moderation/ViewIncident";
import "./GalleryAdmin.less";

function GalleryAdmin() {
  const [activeTab, setActiveTab] = useState("Pending Review"); // PR tab is active by default.
  function updateActiveTab(tab) {
    setActiveTab(tab);
  }

  function renderTabContent() {
    let tabContent = null;

    if (activeTab === "Pending Review") {
      tabContent = (
        // Render tables of pending review projects and comments on the left.
        <p>This is the Pending Review tab!</p>
      );
    }
    else { // activeTab === Resolved tab.
      tabContent = (
        // Render tables of resolved projects and comments on the left.
        <p>This is the Resolved tab!</p>
      );
    }

    return tabContent;
  }

  return (
    <div className="container nav-padding">
      <NavBar />

      {/* Tab Switcher Bar */}
      <div className="admin-tab-switcher">
        <AdminTab
          tabName="Pending Review" activeTab={activeTab} updateActiveTab={updateActiveTab}
        />
        <AdminTab
          tabName="Resolved" activeTab={activeTab} updateActiveTab={updateActiveTab}
        />
      </div>

      {renderTabContent()}
      <ViewIncident isPending={activeTab === "Pending Review"} isProject={true} />

    </div>
  );
}

export default GalleryAdmin;
