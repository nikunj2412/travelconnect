import React from 'react'

import DashboardStats from '../components/Dashboard/DashboardStats'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardStats />
			<div className="flex flex-row gap-4 w-full">
				{/* <TransactionChart /> */}
				{/* <BuyerProfilePieChart /> */}
			</div>
			<div className="flex flex-row gap-4 w-full">
				{/* <PopularProducts /> */}
			</div>
		</div>
	)
}