import { Home, Users, Upload, MessageSquare, Calendar } from "lucide-react";
import { BsDisc } from "react-icons/bs";
import { GoBook } from "react-icons/go";

export const menuItems = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  {
    name: "My Services", 
    icon: BsDisc, 
    path: "/services/accounting",
    children: [
      { name: "Accounting", path: "/services/accounting" },
      { name: "Business Advisory", path: "/services/business-advisory" },
      { name: "Finance", path: "/services/finance" },
      { name: "Insurance", path: "/services/insurance" },
      { name: "IT", path: "/services/it" },
      { name: "Legal", path: "/services/legal" },
    ],
  },
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