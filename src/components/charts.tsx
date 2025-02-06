export interface ChartProps {
  data: number[];
  labels?: string[];
  className?: string;
}

export const LineChart: React.FC<ChartProps> = ({ data, labels, className }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const paddingX = 40;
  const paddingY = 40;
  const width = 400;
  const height = 200;

  const points = data.map((value, index) => ({
    x: paddingX + ((width - paddingX * 2) * index) / (data.length - 1),
    y: height - paddingY - ((value - min) / range) * (height - paddingY * 2),
    value,
    label: labels?.[index],
  }));

  const path = points.reduce(
    (acc, point, i) => (i === 0 ? `M ${point.x},${point.y}` : `${acc} L ${point.x},${point.y}`),
    "",
  );

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className={className}>
      <path d={path} fill="none" strokeWidth="2" className="stroke-blue-500 dark:stroke-blue-400" />
      {points.map((point, i) => (
        <g key={i}>
          <circle
            cx={point.x}
            cy={point.y}
            r="4"
            className="fill-blue-500 dark:fill-blue-400 hover:fill-blue-600 dark:hover:fill-blue-500"
          >
            <title>{`${point.label}: ${point.value} commits`}</title>
          </circle>
        </g>
      ))}
    </svg>
  );
};

export const BarChart: React.FC<ChartProps> = ({ data, labels, className }) => {
  const max = Math.max(...data);
  const paddingX = 40;
  const paddingY = 40;
  const width = 400;
  const height = 200;
  const barWidth = ((width - paddingX * 2) / data.length) * 0.8;
  const gap = ((width - paddingX * 2) / data.length) * 0.2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className={className}>
      {data.map((value, i) => {
        const x = paddingX + i * (barWidth + gap);
        const barHeight = (value / max) * (height - paddingY * 2);
        const y = height - paddingY - barHeight;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              className="fill-indigo-500 dark:fill-indigo-400 hover:fill-indigo-600 dark:hover:fill-indigo-500"
            >
              <title>{`${labels?.[i]}: ${value} commits`}</title>
            </rect>
          </g>
        );
      })}
    </svg>
  );
};
