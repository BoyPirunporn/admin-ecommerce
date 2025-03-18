'use client';
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const DashboardClient = (props: Props) => {

    const [date, setDate] = React.useState<Date>(new Date());

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <div className="flex flex-row gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",

                                    )}
                                >
                                    <span>Pick a date</span>
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="range"
                                    selected={{
                                        from: date,
                                        to: date
                                    }}
                                    onSelect={(form, to) => {

                                    }}
                                    disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <Button>Download</Button>
                    </div>
                </div>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">

            </div>
            <div className=" flex-1 rounded-xl bg-gray-200 md:min-h-min" />
            <div className="grid auto-rows-min gap-4 md:grid-cols-6">

            </div>
        </div>
    )
}

export default DashboardClient