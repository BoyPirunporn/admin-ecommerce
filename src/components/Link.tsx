'use client';
import React from 'react'
import NextLink, { LinkProps } from 'next/link'

const Link = ({
    href,
    children,
    ...props
}: LinkProps & {
    children: React.ReactNode
}) => {
    
    return (
        <NextLink href={href} {...props}>
            {children}
        </NextLink>
    )
}

export default Link