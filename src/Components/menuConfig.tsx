import { Home, Users, Upload, MessageSquare, Calendar } from "lucide-react";
import { GoBook } from "react-icons/go";

export const menuItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  {
    name: "My Referrals",
    icon: Users,
    path: "/my-referrals",
    children: [{ name: "Add New", path: "/my-referrals/new" }],
  },
  {
    name: "Activity Log", icon: GoBook, path: "/activity-log"
  },
  {
    name: "Clients",
    icon: Users,
    path: "/clients",
    children: [
      { name: "Client View", path: "/client/:clientName" },
    ],
  },
  { name: "Uploads", icon: Upload, path: "/uploads" },
  { name: "Messages", icon: MessageSquare, path: "/messages" },
  { name: "Calendar", icon: Calendar, path: "/calendar" },
  
];