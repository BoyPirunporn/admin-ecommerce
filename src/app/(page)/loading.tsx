import SkeletonDataTable from '@/components/table-common/skeleton-data-table'
import React from 'react'

type Props = {}

const loading = (props: Props) => {
    return (
        <div className=''><SkeletonDataTable /></div>
    )
}

export default loading