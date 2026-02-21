import { memo } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import type { RadarData } from '../data/teaDetails';

interface TeaRadarChartProps {
  data: RadarData[];
  chartColor: string;
  fontSize: number;
}

function TeaRadarChart({ data, chartColor, fontSize }: TeaRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data} startAngle={90} endAngle={-270}>
        <PolarGrid stroke="#d0d0d0" strokeWidth={1} gridType="polygon" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#666', fontSize, fontWeight: 500 }}
          tickLine={false}
        />
        <Radar
          name="Benefits"
          dataKey="A"
          stroke={chartColor}
          fill={chartColor}
          fillOpacity={0.7}
          strokeWidth={2}
          isAnimationActive={true}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default memo(TeaRadarChart);
