'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, LucideProps, TrendingUp } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis } from "recharts";

type Props = {};


const dashBoard: {
    headers: {
        title: string;
        icon: keyof typeof LucideIcons;
        content: string;
        description: string;
    }[];
    firstChart: {
        chartData: {
            month: string;
            desktop: number;
            mobile: number;
        }[];
        chartConfig: ChartConfig;
    },
    secondChart: {
        chartData: {
            browser: string;
            visitors: number;
            fill: string;
        }[];
        chartConfig: ChartConfig;
    };

} = {
    headers: [
        {
            title: "Total Revenue",
            icon: "DollarSign",
            content: "$45,231.89",
            description: "+20.1% from last month"
        },
        {
            title: "Subscriptions",
            icon: "Users",
            content: "+2350",
            description: "+180.1% from last month"
        },
        {
            title: "Sales",
            icon: "CreditCard",
            content: "+12,234",
            description: "+19% from last month"
        },
        {
            title: "Active Now",
            icon: "Activity",
            content: "+573",
            description: "+201 since last hour"
        },
    ],
    firstChart: {
        chartData: [
            { month: "January", desktop: 186, mobile: 80 },
            { month: "February", desktop: 305, mobile: 200 },
            { month: "March", desktop: 237, mobile: 120 },
            { month: "April", desktop: 73, mobile: 190 },
            { month: "May", desktop: 209, mobile: 130 },
            { month: "June", desktop: 214, mobile: 140 },
        ],
        chartConfig: {
            desktop: {
                label: "Desktop",
                color: "hsl(var(--chart-1))",
            },
            mobile: {
                label: "Mobile",
                color: "hsl(var(--chart-2))",
            }
        }
    },
    secondChart: {
        chartData: [
            { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
            { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
            { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
            { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
            { browser: "other", visitors: 190, fill: "var(--color-other)" },
        ],
        chartConfig: {
            visitors: {
                label: "Visitors",
            },
            chrome: {
                label: "Chrome",
                color: "hsl(var(--chart-1))",
            },
            safari: {
                label: "Safari",
                color: "hsl(var(--chart-2))",
            },
            firefox: {
                label: "Firefox",
                color: "hsl(var(--chart-3))",
            },
            edge: {
                label: "Edge",
                color: "hsl(var(--chart-4))",
            },
            other: {
                label: "Other",
                color: "hsl(var(--chart-5))",
            }
        }
    }
};
const DashboardClient = (props: Props) => {

    const [date, setDate] = React.useState<Date>(new Date());
    const totalVisitors = React.useMemo(() => {
        return dashBoard.secondChart.chartData.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);


    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between space-y-2">
                <h2 className="text-3xl font-bold  tracking-tight">Dashboard</h2>
                <div className="flex flex-col md:flex-row items-center space-x-2">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-2">
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
                {dashBoard.headers.map((item, index) => {
                    const IconComponent = LucideIcons[item.icon] as React.FC<LucideProps>;;
                    return (
                        <Card key={index} className='aspect-video rounded-xl min-h-[130px]  w-full h-full gap-10 md:0 md:block flex'>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-10">
                                <CardTitle className='tracking-tight text-xl md:text-sm font-medium'>{item.title}</CardTitle>
                                <CardDescription>
                                    <IconComponent size={18} />
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="pt-0 flex flex-col gap-5 md:gap-0 md:flex-col">
                                    <div className="text-3xl md:text-xl font-bold">{item.content}</div>
                                    <p className="text-base md:text-xs text-muted-foreground">{item.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}

            </div>
            <div className=" flex-1 rounded-xl bg-gray-200 md:min-h-min" />
            <div className="grid auto-rows-min gap-4 md:grid-cols-7">
                <Card className='md:col-span-4'>
                    <CardHeader>
                        <CardTitle>Bar Chart - Multiple</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={dashBoard.firstChart.chartConfig}>
                            <BarChart accessibilityLayer data={dashBoard.firstChart.chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dashed" />}
                                />
                                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>
                <Card className="flex flex-col w-full md:col-span-3">
                    <CardHeader className="items-center pb-0">
                        <CardTitle>Pie Chart - Donut with Text</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={dashBoard.secondChart.chartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={dashBoard.secondChart.chartData}
                                    dataKey="visitors"
                                    nameKey="browser"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalVisitors.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Visitors
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default DashboardClient;