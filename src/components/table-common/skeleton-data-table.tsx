import React from 'react';


const SkeletonDataTable = ({
    columns = 4,
    rows = 10,
}:{
    columns?:number,
    rows?:number
}) => {
    return (
        <div data-slot={"skeleton-data-table"} className=" pt-[48px] pb-[24px] flex flex-row gap-x-8 gap-y-3 flex-wrap animate-pulse ">
            <div className="relative w-full h-[50px] flex flex-row mb-5">
                <div className="w-[60%] h-[50px] bg-gray-200 rounded-md" />
                <h1 className='w-[30%] h-[50px] bg-gray-200 rounded-md ml-auto'/>
            </div>
            <div className="w-full border border-gray-200 rounded-lg shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-100 p-3 rounded-t-lg">
                {Array.from({ length: columns }).map((_, index) => (
                    <div key={index} className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                ))}
            </div>
            {/* Table Body */}
            <div className="divide-y divide-gray-200">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-4 p-3">
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <div key={colIndex} className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default SkeletonDataTable;