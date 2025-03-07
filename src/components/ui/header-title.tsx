import React from 'react'

type Props = {
    title: string;
    rightAction?: React.ReactNode
}

const HeaderTitle = ({
    rightAction,
    title
}: Props) => {
    return (
        <div className='pt-[48px] pb-[24px] flex flex-row'>
            <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl'>{title}</h1>
            <div className="ml-auto">{rightAction}</div>
        </div>
    )
}

export default HeaderTitle