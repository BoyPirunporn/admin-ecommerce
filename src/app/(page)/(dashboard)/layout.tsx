import React, { Suspense } from 'react'
import SkeletonDashboard from './components/skeleton-dashboard'


const layout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <Suspense fallback={<SkeletonDashboard />}>
            {children}
        </Suspense>
    )
}

export default layout