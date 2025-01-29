import React, { useContext, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from "../icons";
import { CiLogout } from "react-icons/ci";

import {
  Avatar,
  Badge,
  Input,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";
import { useHistory } from "react-router-dom";

import Logout from "../pages/logout";

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const history = useHistory();
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const name = localStorage.getItem("Name");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your IV Request is Approved",
      type: "success",
      read: false,
    },
    {
      id: 2,
      message: "Your IV Report as been Approved",
      type: "success",
      read: false,
    },
    {
      id: 3,
      message: "Transport Request Rejected",
      type: "danger",
      read: false,
    },
  ]);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  function markAllAsRead() {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  }

  function markAsRead(id) {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  }

  const handlelogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {notifications.some((notification) => !notification.read) && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
                ></span>
              )}
            </button>

            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
              className="w-64" // Adjusted dropdown width
            >
              <DropdownItem
                className="justify-between text-sm font-bold cursor-pointer"
                onClick={markAllAsRead}
              >
                Mark all as read
              </DropdownItem>
              {notifications.map((notification) => (
                <DropdownItem
                  key={notification.id}
                  tag="div"
                  className={`justify-between ${
                    notification.read ? "opacity-50" : ""
                  }`}
                >
                  <span>{notification.message}</span>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs text-blue-500 hover:underline ml-2"
                    >
                      Mark as read
                    </button>
                  )}
                  {!notification.read && (
                    <span
                      aria-hidden="true"
                      className="ml-2 inline-block w-2 h-2 bg-red-600 rounded-full"
                    ></span>
                  )}
                </DropdownItem>
              ))}
            </Dropdown>
          </li>
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
               <DropdownItem onClick={() => handlelogout()}>
                {" "}
             <span className="mb-4 "> Welcome Back {name}</span>
              </DropdownItem>
              <DropdownItem onClick={() => handlelogout()}>
                {" "}
                <CiLogout className="mr-2" size={20} />
                Logout
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
