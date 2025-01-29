import { name } from "faker/lib/locales/az";

const role = localStorage.getItem("role");

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
let routes = [];
switch (role) {
  case "1":
    routes = [
      {
        path: "/app/dashboard", // the url
        icon: "HomeIcon", // the component being exported from icons/index.js
        name: "Dashboard", // name that appear in Sidebar
      },
      {
        path: "/app/manage-users", // the url
        icon: "CiUser", // the component being exported from icons/index.js
        name: "Manage Users", // name that appear in Sidebar
      },
      {
        path: "/app/approve-request",
        icon: "FormsIcon",
        name: "Approve Request",
      },
      {
        path: "/app/approve-report",
        icon: "GoVerified",
        name: "Approve Report",
      },
      {
        path: "/app/transport-request",
        icon: "MdEmojiTransportation",
        name: "Transport Request",
      },
    ];
    break;
  case "2":
    {
      routes = [
        {
          path: "/app/faculty-dashboard", // the url
          icon: "HomeIcon", // the component being exported from icons/index.js
          name: "Dashboard", // name that appear in Sidebar
        },
        {
          path: "/app/approve-request",
          icon: "FormsIcon",
          name: "Approve Request",
        },
        {
          path: "/app/approve-report",
          icon: "GoVerified",
          name: "Approve Report",
        },
        {
          path: "/app/transport-request",
          icon: "MdEmojiTransportation",
          name: "Transport Request",
        },
      ];
    }
    break;
  default:
    routes = [
      {
        path: "/login",
        icon: "LoginIcon",
        name: "Login",
      },
    ];
}

export default routes;
