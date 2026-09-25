"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Navdata = () => {
  const router = useRouter();
  //state data
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isApps, setIsApps] = useState<boolean>(false);
  const [isPages, setIsPages] = useState<boolean>(false);

  // Apps
  const [isCalendar, setCalendar] = useState<boolean>(false);
  const [isEmail, setEmail] = useState<boolean>(false);
  const [isSubEmail, setSubEmail] = useState<boolean>(false);
  const [isProjects, setIsProjects] = useState<boolean>(false);
  const [isTasks, setIsTasks] = useState<boolean>(false);
  const [isCRM, setIsCRM] = useState<boolean>(false);
  const [isInvoices, setIsInvoices] = useState<boolean>(false);
  const [isSupportTickets, setIsSupportTickets] = useState<boolean>(false);
  const [isJobs, setIsJobs] = useState<boolean>(false);
  const [isJobList, setIsJobList] = useState<boolean>(false);
  const [isCandidateList, setIsCandidateList] = useState<boolean>(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e: any) {
    if (e && e.target && e.target.getAttribute("sub-items")) {
      const ul: any = document.getElementById("two-column-menu");
      const iconItems: any = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach(item => {
        item.classList.remove("active");
        var id = item.getAttribute("sub-items");
        const getID = document.getElementById(id) as HTMLElement;
        if (getID) getID.classList.remove("show");
      });
    }
  }

  const menuItems: any = [
    {
      label: "admin",
      isHeader: true,
    },
    {
      id: "admin-dashboard",
      label: "Admin",
      icon: "ri-admin-line",
      link: "/#",
      stateVariables: isAdmin,
      click: function (e: any) {
        e.preventDefault();
        setIsAdmin(!isAdmin);
        setIscurrentState("Admin");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "users",
          label: "Usuarios",
          link: "/admin/users",
          parentId: "admin-dashboard",
        },
        {
          id: "games",
          label: "Juegos",
          link: "/admin/games",
          parentId: "admin-dashboard",
        },
        {
          id: "team",
          label: "Equipo",
          link: "/admin/team",
          parentId: "admin-dashboard",
        },
      ],
    },
    {
      label: "user",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "ri-dashboard-2-line",
      link: "/#",
      stateVariables: isDashboard,
      click: function (e: any) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "next-games",
          label: "Proximos Juegos",
          link: "/user/next-games",
          parentId: "dashboard",
          badgeColor: "success",
          badgeName: "Nuevos",
        },
        {
          id: "my-tickets",
          label: "Mis boletos",
          link: "/user/my-tickets",
          parentId: "dashboard",
        },
        {
          id: "my-bono",
          label: "Mi abono",
          link: "/user/my-bono",
          parentId: "dashboard",
        },
      ],
    },
    {
      id: "pages",
      label: "Pages",
      icon: "ri-pages-line",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setIsPages(!isPages);
        setIscurrentState("Pages");
        updateIconSidebar(e);
      },
      stateVariables: isPages,
      subItems: [
        { id: "team", label: "Team", link: "/pages/team", parentId: "pages" },
        {
          id: "timeline",
          label: "Timeline",
          link: "/pages/timeline",
          parentId: "pages",
        },
        { id: "faqs", label: "FAQs", link: "/pages/faqs", parentId: "pages" },
        {
          id: "pricing",
          label: "Pricing",
          link: "/pages/pricing",
          parentId: "pages",
        },
        {
          id: "PrivecyPolicy",
          label: "Privacy Policy",
          link: "/pages/privacy-policy",
          parentId: "pages",
          // badgeColor: "success",
          // badgeName: "New",
        },
        {
          id: "TermsCondition",
          label: "Terms Condition",
          link: "/pages/terms-condition",
          parentId: "pages",
          // badgeColor: "success", badgeName: "New",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
