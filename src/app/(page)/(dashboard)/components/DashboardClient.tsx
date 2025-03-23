'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatPrice } from '@/lib/utils';
import { Dashboard } from '@/typed';
import * as LucideIcons from 'lucide-react';
import { CalendarIcon, LucideProps } from 'lucide-react';
import React, { useRef } from 'react';

import momenjs from 'moment';
import BarChartDashboard from './BarChartDashboard';
import PieChartDashboard from './PieChartDashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import moment from 'moment';
import { DateRange } from 'react-day-picker';
import { addDays, addMonths, format } from 'date-fns';

interface DashboardDataProps {
    headers: {
        title: string;
        icon: keyof typeof LucideIcons;
        content: string;
        description: string;
    }[];
    // secondChart: {
    //     chartData: {
    //         browser: string;
    //         visitors: number;
    //         fill: string;
    //     }[];
    //     chartConfig: ChartConfig;
    // };

}
const DashboardClient = ({
    dashboard: data
}: {
    dashboard: Dashboard;
}) => {
    const current = data.monthlyRevenues[data.monthlyRevenues.length - 1].totalRevenue;
    const preve = data.monthlyRevenues[data.monthlyRevenues.length - 2].totalRevenue;
    const percentageGrowth = Math.abs(preve === 0 ? 100 : (current / data.totalRevenues) * 100).toFixed(2);
    const saleOfLastMounth = preve === 0 ? 100 : (((current - preve) / preve) * 100);
    console.log(data);
    const firstChartData = data.monthlyRevenues.map(item => ({
        date: item.date,
        month: momenjs(item.date).format("MMMM"),
        total: item.totalRevenue
    }));
    const dashBoard: DashboardDataProps = {
        headers: [
            {
                title: "Total Revenue",
                icon: "DollarSign",
                content: `+ ${formatPrice(data.totalRevenues)}`,
                description: `+${percentageGrowth}% from last month`
            },
            {
                title: "Subscriptions",
                icon: "Users",
                content: "+" + data.subscriptions + "",
                description: "+180.1% from last month"
            },
            {
                title: "Sales",
                icon: "CreditCard",
                content: `+ ${formatPrice(current)}`,
                description: `${saleOfLastMounth <= 0 ? "-" : "+"}${Math.abs(saleOfLastMounth).toFixed(2)}% from last month`
            }
        ],

    };

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addMonths(new Date(), 6),
    });

    const popoverRef = useRef<HTMLButtonElement>(null);

    const handleCancel = () => {
        popoverRef.current?.click();
    };
    const handleOk = () => {
        popoverRef.current?.click();
    };
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between space-y-2">
                <h2 className="text-3xl font-bold  tracking-tight">Dashboard</h2>
                <div className="flex flex-col md:flex-row items-center space-x-2">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2">
                        <div className="grid gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant={"outline"}
                                        className={cn(
                                            "w-[300px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon />
                                        {date?.from ? (
                                            date.to ? (
                                                <>
                                                    {format(date.from, "dd, LLL y")} -{" "}
                                                    {format(date.to, "dd, LLL y")}
                                                </>
                                            ) : (
                                                format(date.from, "dd, LLL y")
                                            )
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        initialFocus
                                        mode="range"
                                        defaultMonth={date?.from}
                                        selected={date}
                                        onSelect={setDate}
                                        numberOfMonths={2}
                                        min={30}
                                        max={180}
                                        
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <Button>Download</Button>
                    </div>
                </div>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {dashBoard.headers.map((item, index) => {
                    const IconComponent = LucideIcons[item.icon] as React.FC<LucideProps>;;
                    return (
                        <Card key={index} className='aspect-video rounded-xl  w-full h-full gap-10 flex'>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-10">
                                <CardTitle className='tracking-tight text-xl  font-medium'>{item.title}</CardTitle>
                                <CardDescription>
                                    <IconComponent size={18} />
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="pt-0 flex flex-col gap-5 md:gap-0 md:flex-col">
                                    <div className="text-3xl  font-bold">{item.content}</div>
                                    <p className="text-base  text-muted-foreground">{item.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

            </div>
            <div className=" flex-1 rounded-xl bg-gray-200 md:min-h-min" />
            <div className="grid auto-rows-min gap-4 md:grid-cols-7">
                <BarChartDashboard data={firstChartData} />
                <Card className='md:col-span-3'>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                        <CardDescription>You made 265 sales this month.</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-10 max-h-[400px] overflow-auto'>
                        {Array.from({ length: 10 }).map((_, index) => {
                            return (
                                <div key={index} className='flex flex-row items-center gap-4'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <p className='text-base font-medium'>Olivia Martin {index + 1}</p>
                                        <span className='text-sm text-muted-foreground'></span>
                                    </div>
                                    <p className="ml-auto text-base">+{formatPrice(1090)}</p>
                                </div>
                            );
                        }
                        )}
                    </CardContent>
                </Card>
                {/* <PieChartDashboard data={[
                    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
                    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
                    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
                    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
                    { browser: "other", visitors: 190, fill: "var(--color-other)" },
                ]} /> */}
            </div>
        </div>
    );
};

export default DashboardClient;