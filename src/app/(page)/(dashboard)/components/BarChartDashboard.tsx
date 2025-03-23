import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';
import { BarChart, CartesianGrid, XAxis, Bar } from 'recharts';
import momentjs from 'moment';

type Props = {
    data: {
        date: Date;
        month: string;
        total: number;
    }[];
};

const chartConfig = {
    total: {
        label: "Total Revenues",
        color: "hsl(var(--chart-1))",
    },

};
const BarChartDashboard = ({
    data
}: Props) => {
    const form = momentjs(data[0].date).format("MMMM YYYY");
    const to = momentjs(data[data.length - 1].date).format("MMMM YYYY");

    const current = data[data.length - 1].total;
    const preve = data[data.length - 2].total;
    const toNextMonth = preve === 0 ? 0 : ((current - preve) / preve * 100);

    return (
        <Card className='md:col-span-4'>
            <CardHeader>
                <CardTitle>Bar Chart - Multiple</CardTitle>
                <CardDescription>{form} - {to}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={data}>
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
                        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by {preve === 0 ? 'is not calculated' : toNextMonth.toFixed(2)} this month {toNextMonth < 0 ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total sale for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
};

export default BarChartDashboard;