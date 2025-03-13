'use client'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
type Props = {}

const CategoryC = (props: Props) => {
  return (
    <Dialog open={true} onOpenChange={() => { }}>
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
export default CategoryC