import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdAccountCircle,
  MdSupervisedUserCircle,
  MdCameraEnhance,
  MdControlCamera,
  MdLocationOn,
  MdMessage,
  MdAttachMoney,
  MdVerifiedUser,
  MdOutlineRequestQuote,
  MdOutlineRequestPage,
  MdRequestQuote,
  MdRequestPage,
  MdDynamicForm
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import usersTable from 'views/admin/usersTable/UsersTable'
import tourGuidesTable from 'views/admin/tourGuideTable/TourGuides'
import cameraOperators from "views/admin/cameraOperators/CameraOperators"
import directors from "views/admin/directors/Directors"
import tours from "views/admin/tours/Tours"
import reveiws from"views/admin/reveiws/Reveiws"
import payment from "views/admin/payment/Payment"
import userpayment from "views/admin/userpayment/UserPayment"
import admins from "views/admin/admintable/Admin"


// Auth Imports
import SignInCentered from "views/auth/signIn";
import RequestsTable from "views/admin/requestsTable/requestTable";
import ContactUs from "views/admin/contactUs/contactUs";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
    role: ["superAdmin", "headAdmin", "admin"],
  },
  {
    name: "Admins Table",
    layout: "/admin",
    path: "/admins-table",
    icon: <Icon as={MdVerifiedUser} width='20px' height='20px' color='inherit' />,
    component: admins,
    role: ["superAdmin"],

  },
  {
    name: "Users Table",
    layout: "/admin",
    path: "/users-table",
    icon: <Icon as={MdAccountCircle} width='20px' height='20px' color='inherit' />,
    component: usersTable,
    role: ["superAdmin","admin"],

  },
  {
    name: "Tour Guides Table",
    layout: "/admin",
    path: "/tourguides-table",
    icon: <Icon as={MdSupervisedUserCircle} width='20px' height='20px' color='inherit' />,
    component: tourGuidesTable,
    role: ["superAdmin", "admin"],

  },
  {
    name: "Camera Operators Table",
    layout: "/admin",
    path: "/cameraoperators-table",
    icon: <Icon as={MdCameraEnhance} width='20px' height='20px' color='inherit' />,
    component: cameraOperators,
    role: ["superAdmin", "admin"],

  },
  {
    name: "Directors Table",
    layout: "/admin",
    path: "/directors-table",
    icon: <Icon as={MdControlCamera} width='20px' height='20px' color='inherit' />,
    component: directors,
    role: ["superAdmin", "admin"],

  },
  {
    name: "Tours Table",
    layout: "/admin",
    path: "/tours-table",
    icon: <Icon as={MdLocationOn} width='20px' height='20px' color='inherit' />,
    component: tours,
    role: ["superAdmin", "headAdmin", "admin"],

  },
  {
    name: "Reveiws Table",
    layout: "/admin",
    path: "/reveiws-table",
    icon: <Icon as={MdDynamicForm} width='20px' height='20px' color='inherit' />,
    component: reveiws,
    role: ["superAdmin", "headAdmin"],

  },
  {
    name: "Requests Table",
    layout: "/admin",
    path: "/requests-table",
    icon: <Icon as={MdRequestQuote} width='20px' height='20px' color='inherit' />,
    component: RequestsTable,
    role: ["superAdmin", "headAdmin"],

  },
  {
    name: "Contact Us Table",
    layout: "/admin",
    path: "/contactus-table",
    icon: <Icon as={MdMessage} width='20px' height='20px' color='inherit' />,
    component: ContactUs,
    role: ["superAdmin", "headAdmin"],

  },
  // {
  //   name: "Payment Table",
  //   layout: "/admin",
  //   path: "/payment-table",
  //   icon: <Icon as={MdAttachMoney} width='20px' height='20px' color='inherit' />,
  //   component: payment,
  //   role: ["superAdmin", "headAdmin"],

  // },
  // {
  //   name: "User Payment Table",
  //   layout: "/admin",
  //   path: "/userpayment-table",
  //   icon: <Icon as={MdAttachMoney} width='20px' height='20px' color='inherit' />,
  //   component: userpayment,
  //   role: ["superAdmin"],

  // },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
    role: ["superAdmin", "headAdmin", "admin"],
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
    role: ["superAdmin", "headAdmin", "admin"],
  },
];

export default routes;
