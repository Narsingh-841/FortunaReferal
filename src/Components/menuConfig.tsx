// src/Components/menuConfig.tsx
import { Home, Users, Upload, MessageSquare, Calendar } from "lucide-react";

export const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
 {
    name: "My Referrals",
    icon: Users,
    path: "/my-referrals",
    children: [
      { name: "Add New", path: "/my-referrals/new" },
    ],
  },
  { name: "Clients", icon: Users, path: "/clients" },
  { name: "Uploads", icon: Upload, path: "/uploads" },
  { name: "Messages", icon: MessageSquare, path: "/messages" },
  { name: "Calendar", icon: Calendar, path: "/calendar" },
];
