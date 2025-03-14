'use client'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
type Props = {}

const CategoryForm = (props: Props) => {
    const route = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => route.back()}>
            <div className="">
                <DialogContent className={cn(
                    "overflow-auto max-h-[calc(100%_-_64px)] max-w-md"
                )}>
                    <DialogHeader>
                        <DialogTitle className="text-md">TITLE</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-auto">
                        children
                    </div>
                </DialogContent>
            </div>
        </Dialog>
  )
}
export default CategoryForm