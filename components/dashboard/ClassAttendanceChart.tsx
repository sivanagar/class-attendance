"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart3 } from "lucide-react";
import { attendatePerDateMetrics } from "@/lib/utils/dataToMetrics";

interface ClassAttendanceChartProps {
    attendanceData: Array<{
        date: Date;
        attended: boolean;
    }>;
}

export default function ClassAttendanceChart(attendanceData : ClassAttendanceChartProps) {

// const chartData: { Date: string; present: number; absent: number; }[] = []
// for (const record of attendanceData.attendanceData) {

//     const date = new Date(record.date).toLocaleDateString();
//     const existingEntry = chartData.find(entry => entry.Date === date);
//     if (existingEntry) {
//         if (record.attended) {
//             existingEntry.present += 1;
//         } else {
//             existingEntry.absent += 1;
//         }
//     } else {
//         chartData.push({
//             Date: date,
//             present: record.attended ? 1 : 0,
//             absent: record.attended ? 0 : 1,
//         });
//     }
// }

const chartData = attendatePerDateMetrics(attendanceData);

    const chartConfig = {
  present: {
    label: "Present",
    color: "var(--chart-1)",
  },
  absent: {
    label: "Absent",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig


  return (<Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                Attendance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
            {chartData.length === 0 ? (
                <div className="h-[200px] w-full rounded-md border-2 border-dashed border-muted bg-muted/10 flex items-center justify-center flex-col text-muted-foreground gap-2">
                <BarChart3 className="h-10 w-10 opacity-20" />
                <p className="text-sm">Attendance trends will appear here</p>
              </div>) : (
       <ChartContainer config={chartConfig}>
        
          <BarChart accessibilityLayer data={chartData}>
            
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            
            <ChartLegend content={<ChartLegendContent />} />
            
            <Bar
              dataKey="present"
              stackId="a"
              fill="var(--color-present)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="absent"
              stackId="a"
              fill="var(--color-absent)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>)}

            </CardContent>
          </Card>);
}