import { useState } from "react";
import Tab from "../components/admin/Tab";
import Logs from "../components/admin/Logs";
import Settings from "../components/admin/Settings";
import CommunityManagement from "../components/admin/CommunityManagement";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("logs");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Tab activeTab={activeTab} handleTabClick={handleTabClick} />

      {activeTab === "logs" && <Logs />}
      {activeTab === "settings" && <Settings />}
      {activeTab === "Community Management" && <CommunityManagement />}
    </div>
  );
};

export default AdminPanel;
