/**
 * Chart.tsx
 * Chart.js 图表组件 - 优化版本，使用动态导入减少初始 bundle 体积
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
import { useEffect, useRef, useState, useCallback } from 'react';
import type { ChartData, ChartOptions, ChartType } from 'chart.js';

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
  const chartRef = useRef<any>(null);
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // 动态加载并创建图表
  const initChart = useCallback(async () => {
    if (!canvasRef.current) return;

    try {
      setIsLoading(true);
      setError(null);

      // 动态导入 Chart.js
      const { Chart: ChartJS, registerables } = await import('chart.js');
      
      // 注册所有组件（只在首次导入时执行）
      ChartJS.register(...registerables);

      // 销毁旧图表
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
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

      setIsLoading(false);
    } catch (err) {
      console.error('Chart.js load error:', err);
      setError('图表加载失败');
      setIsLoading(false);
    }
  }, [type, data, options, isDark]);

  // 创建/更新图表
  useEffect(() => {
    initChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [initChart]);

  return (
    <figure className={`chart-container my-8 ${className}`}>
      <div style={{ height: `${height}px` }} className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-red-500 text-sm">
            {error}
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: isLoading ? 'none' : 'block' }} />
      </div>
      {caption && (
        <figcaption className='mt-3 text-center text-sm text-gray-600 dark:text-gray-400 italic'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
