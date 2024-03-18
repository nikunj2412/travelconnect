import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineUsers,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'
import { TbBrandBooking } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineReviews } from "react-icons/md";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'addPackages',
		label: 'Add Packages',
		path: '/add-packages',
		icon: <IoIosAddCircleOutline />
	},
	{
		key: 'package',
		label: 'Tour Packages',
		path: '/packages',
		icon: <HiOutlineCube />
	},
	{
		key: 'customers',
		label: 'Customers',
		path: '/customers',
		icon: <HiOutlineUsers />
	},
    {
		key: 'booking',
		label: 'Booking',
		path: '/booking',
		icon: <TbBrandBooking />

	},
	{
		key: 'rating',
		label: 'Rating',
		path: '/rating',
		icon: <MdOutlineReviews />
	},
	{
		key: 'places',
		label: 'Tourism Places',
		path: '/places',
		icon: <HiOutlineCube />
	},
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]