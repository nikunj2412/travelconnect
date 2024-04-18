import React, { useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'

export default function DashboardStats() {
	const [totalBookingValue, setTotalBookingValue] = useState(0);
    const [totalPackages, setTotalPackages] = useState(0);
    const [totalBooking, setTotalBooking] = useState(0);
	const [totalBookingNum, setTotalBookingNum] = useState(0);

    useEffect(() => {
        fetchBookingData();
		fetchTravelPosts();
		fetchBooking();
		fetchTotalBooking();
    }, []);

    const fetchBookingData = async () => {
        try {
            const response = await fetch('https://travelconnect.onrender.com/v1/admin/getAllBookings');
            if (!response.ok) {
                throw new Error('Failed to fetch booking data');
            }
            const {data} = await response.json();
            console.log("DASH",data)
            const bookingValue = calculateTotalBookingValue(data);
            setTotalBookingValue(bookingValue);
        } catch (error) {
            console.error('Error fetching booking data:', error);
        }
    };

	const fetchTravelPosts = async () => {
        try {
            const response = await fetch('https://travelconnect.onrender.com/v1/admin/travel-posts');
            if (!response.ok) {
                throw new Error('Failed to fetch travel posts');
            }
            const data = await response.json();
            // Calculate total number of packages
            const numPackages = data.data.length;
            setTotalPackages(numPackages);
        } catch (error) {
            console.error('Error fetching travel posts:', error);
        }
    };

	const fetchBooking = async () => {
        try {
            const response = await fetch('https://travelconnect.onrender.com/v1/admin/');
            if (!response.ok) {
                throw new Error('Failed to fetch travel posts');
            }
            const data = await response.json();
            const numbooking = data.data.length;
            setTotalBooking(numbooking);
        } catch (error) {
            console.error('Error fetching travel posts:', error);
        }
    };

	const fetchTotalBooking = async () => {
        try {
            const response = await fetch('https://travelconnect.onrender.com/v1/admin/getAllBookings');
            if (!response.ok) {
                throw new Error('Failed to fetch travel posts');
            }
            const data = await response.json();
            const numbooking = data.data.length;
            setTotalBookingNum(numbooking);
        } catch (error) {
            console.error('Error fetching travel posts:', error);
        }
    };
    const calculateTotalBookingValue = (bookings) => {
        return bookings.reduce((total, booking) => {
            return total + booking.totalPrice;
        }, 0);
    };
	return (
		<div className="flex gap-4">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Booking Value</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">&#x24;{totalBookingValue}</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoPieChart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Packages</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{totalPackages}</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Customers</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{totalBooking}</strong>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Booking</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{totalBookingNum}</strong>
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}