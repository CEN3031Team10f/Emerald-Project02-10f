import "./AdminTab.less";

function AdminTab({ tabName, activeTab, updateActiveTab }) {
  const isActive = (activeTab === tabName);
  
  function handleTabClick() {
    updateActiveTab(tabName);
  };
  
  return (
    // Color of tab depends on whether it's selected or not.
    <div className={`admin-tab ${isActive ? "active" : ""}`} onClick={handleTabClick}>
      {tabName}
    </div>
  );
}

export default AdminTab;
