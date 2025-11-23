"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialBar, RadialBarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface AttendanceRadialChartProps {
  attendanceData: Array<{
    date: Date;
    attended: boolean;
  }>;
}
import { attendatePerDateMetrics } from "@/lib/utils/dataToMetrics";

export default function AttendanceRadialChart(
  attendanceData: AttendanceRadialChartProps
) {
  const chartDataBase = attendatePerDateMetrics(attendanceData);
  const chartData: { Date: string; Attendance: number; fill: string }[] =
    chartDataBase.map((item, index) => {
      const id = `day${index + 1}`;
      const total = item.present + item.absent;
      const attendancePercentage =
        total === 0 ? 0 : Math.round((item.present / total) * 100);
      return {
        Date: item.Date,
        Attendance: attendancePercentage,
        fill: `var(--color-${id})`,
      };
    });

  const chartConfig = chartData.reduce(
    (acc, item, index) => {
      const id = `day${index + 1}`;
      const colorVar = `var(--chart-${index + 1})`;
      acc[id] = {
        label: item.Date,
        color: colorVar,
      };
      return acc;
    },
    {
      Attendance: {
        label: "attendance",
      },
    } as ChartConfig
  );


  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="font-semibold">Attendance %</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-[120px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[170px]"
        >
          <RadialBarChart data={chartData} innerRadius={20} outerRadius={90}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="date" />}
            />
            <RadialBar dataKey="Attendance" background />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
