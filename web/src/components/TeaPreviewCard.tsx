import { lazy, memo, Suspense } from 'react';
import type { TeaDetail } from '../data/teaDetails';

interface TeaPreviewCardProps {
  tea: TeaDetail;
  /** When true, the card renders in compact hero-preview size. Default: false (full modal size). */
  compact?: boolean;
  /** Chart rendering can be disabled to keep the first screen lightweight. */
  showChart?: boolean;
}

const TeaRadarChart = lazy(() => import('./TeaRadarChart'));

function ChartFallback({ tea }: { tea: TeaDetail }) {
  return (
    <div className="h-full w-full rounded-xl border border-gray-100 bg-[#fafafa] p-3 flex flex-col justify-center gap-2">
      {tea.radarData.slice(0, 3).map((point) => (
        <div key={point.subject} className="space-y-1">
          <div className="text-[10px] leading-none text-brand-text/55">{point.subject}</div>
          <div className="h-1.5 rounded-full bg-brand-text/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${point.A}%`, backgroundColor: tea.chartColor }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TeaPreviewCard({ tea, compact = false, showChart = !compact }: TeaPreviewCardProps) {
  const layoutRatio = compact ? 'aspect-square w-full auto-rows-fr' : 'h-[220px] w-full';

  const fontSize = compact ? 10 : 9;
  const titleSize = compact ? 'text-[20px] sm:text-[22px] lg:text-[28px]' : 'text-[24px]';
  const subSize = compact ? 'text-[11px] sm:text-[12px] lg:text-[14px]' : 'text-[12px]';
  const descSize = compact ? 'text-[12px] sm:text-[13px] lg:text-[15px]' : 'text-[13px]';
  const iconSize = compact ? 'w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12' : 'w-10 h-10';
  const padding = compact ? 'p-5 lg:p-7' : 'p-6';
  const bPadding = compact ? 'px-5 pb-6 pt-5 lg:px-7 lg:pb-8 lg:pt-6' : 'px-6 pb-7 pt-5';
  const radius = compact ? 'rounded-[24px]' : 'rounded-[28px]';
  const gap = compact ? 'gap-4 lg:gap-6' : 'gap-4';

  return (
    <div className={`w-full bg-white/95 border border-white/60 shadow-2xl ${radius} overflow-hidden`}>
      {/* Top: Image + Chart */}
      <div className={`grid grid-cols-2 ${gap} ${padding} items-center`}>
        <div className={layoutRatio}>
          <img
            src={tea.popImage}
            alt={tea.name}
            loading={compact ? 'eager' : undefined}
            decoding="async"
            className="w-full h-full rounded-xl object-contain"
          />
        </div>
        <div className={`${layoutRatio} min-w-0 flex items-center justify-center`}>
          {showChart ? (
            <Suspense fallback={<ChartFallback tea={tea} />}>
              <TeaRadarChart data={tea.radarData} chartColor={tea.chartColor} fontSize={fontSize} />
            </Suspense>
          ) : (
            <ChartFallback tea={tea} />
          )}
        </div>
      </div>

      {/* Bottom: Text + Icons */}
      <div className={`${bPadding} border-t border-gray-100 bg-[#fafafa]/80`}>
        <h2 className={`font-serif ${titleSize} font-bold mb-0.5 text-brand-text`}>{tea.name}</h2>
        <p className={`font-sans ${subSize} text-brand-accent tracking-widest uppercase mb-2 font-semibold`}>{tea.subtitle}</p>
        <p className={`font-sans ${descSize} leading-[1.7] text-brand-text/70 mb-4 font-light`}>
          {tea.description}
        </p>

        <div className="grid grid-cols-4 gap-2">
          {tea.features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 text-center">
              <img
                src={feature.src}
                alt={feature.label.replace('\n', ' ')}
                loading={compact ? 'lazy' : 'eager'}
                decoding="async"
                className={`${iconSize} object-contain`}
              />
              <span className="font-sans text-[10px] text-brand-text/60 leading-[1.3] font-medium whitespace-pre-line">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(TeaPreviewCard);
