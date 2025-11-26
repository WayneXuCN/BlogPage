/**
 * Chart.tsx
 * Chart.js 图表组件
 *
 * 用法：
 * <Chart
 *   type="line"
 *   data={{
 *     labels: ['1月', '2月', '3月'],
 *     datasets: [{
 *       label: '数据',
 *       data: [10, 20, 30],
 *     }]
 *   }}
 * />
 */
import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartData,
  type ChartOptions,
  type ChartType,
} from 'chart.js';

// 注册必要组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea';
  data: ChartData<ChartType>;
  options?: ChartOptions<ChartType>;
  height?: number;
  caption?: string;
  className?: string;
}

export default function Chart({
  type,
  data,
  options,
  height = 300,
  caption,
  className = '',
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);
  const [isDark, setIsDark] = useState(false);

  // 监听主题变化
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // 创建/更新图表
  useEffect(() => {
    if (!canvasRef.current) return;

    // 销毁旧图表
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // 主题相关颜色
    const textColor = isDark ? '#e5e7eb' : '#374151';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    const defaultOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: textColor,
            font: {
              family: "'Noto Sans SC', sans-serif",
            },
          },
        },
        tooltip: {
          backgroundColor: isDark ? '#374151' : '#ffffff',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: isDark ? '#4b5563' : '#e5e7eb',
          borderWidth: 1,
        },
      },
      scales: ['line', 'bar'].includes(type)
        ? {
            x: {
              ticks: { color: textColor },
              grid: { color: gridColor },
            },
            y: {
              ticks: { color: textColor },
              grid: { color: gridColor },
            },
          }
        : undefined,
    };

    chartRef.current = new ChartJS(ctx, {
      type,
      data,
      options: { ...defaultOptions, ...options } as ChartOptions,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, data, options, isDark]);

  return (
    <figure className={`chart-container my-8 ${className}`}>
      <div style={{ height: `${height}px` }}>
        <canvas ref={canvasRef} />
      </div>
      {caption && (
        <figcaption className='mt-3 text-center text-sm text-gray-600 dark:text-gray-400 italic'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
