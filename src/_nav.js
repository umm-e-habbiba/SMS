import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilChatBubble,
  cilCheck,
  cilCheckAlt,
  cilCheckCircle,
  cilClock,
  cilCursor,
  cilDescription,
  cilDrop,
  cilEnvelopeClosed,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSettings,
  cilSpeedometer,
  cilStar,
  cilUserFollow,
  cilUserPlus,
  cilUserUnfollow,
  cilX,
  cilXCircle,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  //   // badge: {
  //   //   color: 'info',
  //   //   text: 'NEW',
  //   // },
  // },
  // {
  //   component: CNavItem,
  //   name: 'SMS Delivered',
  //   to: '/active',
  //   icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Opt-Out Users',
  //   to: '/unsubscribed',
  //   icon: <CIcon icon={cilUserUnfollow} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Delivery Failed',
  //   to: '/failed',
  //   icon: <CIcon icon={cilXCircle} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'All Users',
    to: '/',
    icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Add Users',
    to: '/add-users',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Send SMS',
    to: '/settings',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  },
]

export default _nav
