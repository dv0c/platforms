import { LayoutDashboard } from "lucide-react";
import Item from "./Item";

const Sidebar = () => {
  return (
    <aside>
      <div className="min-w-[230px] p-5">
        <Item active icon={LayoutDashboard} name="Overview" />
      </div>
    </aside>
  );
};

export default Sidebar;
