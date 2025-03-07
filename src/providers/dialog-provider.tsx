'use client';
import DialogComponent from '@/components/dialog'
import React, { useEffect, useState } from 'react'


const DialogProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    return <DialogComponent />
}

export default DialogProvider