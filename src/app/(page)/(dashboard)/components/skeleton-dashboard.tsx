
import React from 'react'

type Props = {}

const SkeletonDashboard = (props: Props) => {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between space-y-2">
                <div className="h-10 w-[200px] rounded-xl bg-gray-200 animate-pulse" />
                <div className="h-10 w-[280px] rounded-xl bg-gray-200 animate-pulse" />
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
                <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
                <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
                <div className="aspect-video rounded-xl bg-gray-200 animate-pulse" />
            </div>
            <div className=" flex-1 rounded-xl bg-gray-200 md:min-h-min" />
            <div className="grid auto-rows-min gap-4 md:grid-cols-6">
                <div className="w-full min-h-[400px] rounded-xl bg-gray-200 col-span-4 h-full animate-pulse" />
                <div className="w-full min-h-[400px] rounded-xl bg-gray-200 col-span-2 h-full animate-pulse" />
            </div>
        </div>
    )
}

export default SkeletonDashboard