"use client";

import dynamic from "next/dynamic";
import {
  Wind,
  ChevronLeft,
  Share2,
  SlidersHorizontal,
  BarChart2,
  Sparkles,
} from "lucide-react";

import { BentoCard, CardHeader } from "./BentoCard";
import { withViewportChart } from "./ViewportChart";
import { Avatar, ProfileRow, Pill, Legend, StatDelta, InlineProgress, Dot } from "./ui";

// Chart chunks are downloaded and mounted once they approach the viewport.
const BarSeries = withViewportChart(dynamic(() => import("./BarSeries").then(m => m.BarSeries), { ssr: false }));
const BarSeriesRainbow = withViewportChart(dynamic(() => import("./BarSeries").then(m => m.BarSeriesRainbow), { ssr: false }));
const LineSeries = withViewportChart(dynamic(() => import("./LineSeries").then(m => m.LineSeries), { ssr: false }));
const AreaSeries = withViewportChart(dynamic(() => import("./AreaSeries").then(m => m.AreaSeries), { ssr: false }));
const Donut = withViewportChart(dynamic(() => import("./Donut").then(m => m.Donut), { ssr: false }));
const RadialGauge = withViewportChart(dynamic(() => import("./Radial").then(m => m.RadialGauge), { ssr: false }));
const MultiRing = withViewportChart(dynamic(() => import("./Radial").then(m => m.MultiRing), { ssr: false }));
const RankBars = dynamic(() => import("./RankBars").then(m => m.RankBars), { ssr: false });
const ContributionGrid = dynamic(() => import("./ContributionGrid").then(m => m.ContributionGrid), { ssr: false });
const WaveStack = withViewportChart(dynamic(() => import("./WaveStack").then(m => m.WaveStack), { ssr: false }));

import * as D from "./data-blue";

function ChartFallback({ height = 140 }: { height?: number }) {
  return <div style={{ height }} className="rounded-xl bg-canvas/60 dark:bg-white/[0.03]" aria-hidden />;
}

export function InsightBentoMonochromeBlue() {
  let cardIndex = 0;
  const nextDelay = () => Math.min((cardIndex++ % 12) * 0.045, 0.5);
  return (
    <div className="insight-dashboard insight-dashboard-blue min-h-full w-full bg-canvas dark:bg-ink-950">
      <div className="px-4 py-4 md:px-6 md:py-6">
        {/* Masonry bento grid — capped at 4 columns to keep cards wide enough */}
        <div className="masonry columns-1 sm:columns-2 lg:columns-3 xl:columns-4">
          {/* Card 1 */}
          <BentoCard delay={nextDelay()}>
            <CardHeader title="Vertical bar" subtitle="Statistics of the month" />
            <Legend items={[{ label: "Data one", color: "#2563eb" }, { label: "Data two", color: "#1e3a8a" }]} />
            <div className="mt-2">
              <BarSeries
                data={D.verticalBarTwo}
                keys={[{ key: "one", color: "#2563eb" }, { key: "two", color: "#1e3a8a" }]}
                height={150}
                barSize={9}
                fallback={<ChartFallback height={150} />}
              />
            </div>
          </BentoCard>

          {/* Card 2 */}
          <BentoCard delay={nextDelay()}>
            <CardHeader title="Area range and line" subtitle="Average temperatures for July" />
            <div className="-mx-1">
              <AreaSeries
                data={D.temperatureArea}
                keys={[{ key: "v", color: "#1e40af" }]}
                showAxis
                height={150}
                fallback={<ChartFallback height={150} />}
              />
            </div>
            <p className="mt-2 text-xs text-ink-500 dark:text-ink-300">
              Minim dolor in amet nulla laboris enim dolore consequatt&hellip;
            </p>
          </BentoCard>

          {/* Card 3 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 text-[15px] font-bold text-ink-900 dark:text-white">
                <BarChart2 size={15} className="text-brand-pink" /> Bar chart
              </h3>
              <StatDelta value={86} />
            </div>
            <p className="mb-2 text-xs text-ink-500 dark:text-ink-300">
              Minim dolor in amet nulla laboris enim dolore consequatt&hellip;
            </p>
            <BarSeries
              data={D.stackedDeclineBars}
              keys={[
                { key: "purple", color: "#1e3a8a" },
                { key: "yellow", color: "#7dd3fc" },
                { key: "pink", color: "#2563eb" },
              ]}
              stacked
              height={150}
              barSize={14}
              fallback={<ChartFallback height={150} />}
            />
          </BentoCard>

          {/* Card 4 */}
          <BentoCard delay={nextDelay()}>
            <CardHeader title="Contributions" subtitle="Browser share breakdown" />
            <div className="flex items-center gap-5">
              <Donut data={D.browserShare} centerLabel="99%" size={116} thickness={12} fallback={<ChartFallback height={116} />} />
              <Legend items={D.browserShare.map((b) => ({ label: b.name, color: b.color }))} />
            </div>
          </BentoCard>

          {/* Card 5 */}
          <BentoCard delay={nextDelay()}>
            <CardHeader title="Contributions" subtitle="Weekly activity" />
            <BarSeries
              data={D.contributionsWeekBar}
              keys={[{ key: "v", color: "#1e3a8a" }]}
              showAxis
              height={150}
              barSize={16}
              radius={7}
              fallback={<ChartFallback height={150} />}
            />
            <div className="mt-4 border-t border-black/5 dark:border-white/10 pt-3">
              <ProfileRow name="Robert Fox" role="Software Developer" seed="robert-fox" action={<Pill>PROFILE</Pill>} />
            </div>
          </BentoCard>

          {/* Card 6 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-1 flex items-start justify-between">
              <div>
                <p className="text-2xl font-extrabold text-ink-900 dark:text-white">
                  854 <span className="ml-1 align-middle text-xs font-bold text-emerald-500">↑ 25 upward</span>
                </p>
              </div>
            </div>
            <BarSeries
              data={D.smallVerticalBar}
              keys={[{ key: "v", color: "#0ea5e9" }]}
              height={140}
              barSize={12}
              fallback={<ChartFallback height={140} />}
            />
            <h3 className="mt-3 text-[15px] font-bold text-ink-900 dark:text-white">Vertical bar</h3>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">
              Minim dolor in amet nulla laboris enim dolore consequatt&hellip;
            </p>
          </BentoCard>

          {/* Card 7 */}
          <BentoCard delay={nextDelay()}>
            <h3 className="mb-3 text-[15px] font-bold text-ink-900 dark:text-white">Horizontal bar chart with border radius</h3>
            <ProfileRow name="Andres" role="Team Leader" seed="andres" action={<Pill active color="#12121a">PROFILE</Pill>} />
            <div className="mt-4">
              <RankBars
                items={D.horizontalDecline.map((h, i) => ({ ...h, color: `rgba(37,99,235,${1 - i * 0.16})` }))}
                height={11}
                gap={9}
              />
            </div>
            <p className="mt-3 text-xs text-ink-500 dark:text-ink-300">
              Minim dolor in amet nulla laboris enim dolore consequatt&hellip;
            </p>
          </BentoCard>

          {/* Card 8 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Sales per employee per month</h3>
                <p className="text-xs text-ink-500 dark:text-ink-300">263 contributions in the last year</p>
              </div>
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {["2016", "2017", "2018", "2019"].map((y, i) => (
                <Pill key={`${y}-${i}`} active={i === 1} color="#1e40af">{y}</Pill>
              ))}
            </div>
            <ContributionGrid weeks={D.contributionWeeks} months={D.contributionMonths} colors={D.contributionColors} />
            <p className="mt-3 text-xs text-ink-500 dark:text-ink-300">Learn how we count contributions</p>
          </BentoCard>

          {/* Card 9 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Status of imports</h3>
              <span className="text-xs text-ink-500 dark:text-ink-300">January 2026</span>
            </div>
            <p className="mb-3 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt.</p>
            <div className="flex justify-center">
              <Donut
                data={[
                  { name: "Cleared", value: 73, color: "#2563eb" },
                  { name: "Pending", value: 15, color: "#7dd3fc" },
                  { name: "Delayed", value: 12, color: "#1e3a8a" },
                ]}
                centerLabel="73%"
                size={148}
                thickness={16}
                fallback={<ChartFallback height={148} />}
              />
            </div>
          </BentoCard>

          {/* Card 10 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 text-[15px] font-bold text-ink-900 dark:text-white">
                <Wind size={15} className="text-brand-violet" /> Temperature theme
              </h3>
            </div>
            <p className="mb-1 text-2xl font-extrabold text-ink-900 dark:text-white">4.875</p>
            <LineSeries data={D.tempThemeLine} keys={[{ key: "v", color: "#2563eb" }]} showAxis height={140} fallback={<ChartFallback height={140} />} />
          </BentoCard>

          {/* Card 11 */}
          <BentoCard delay={nextDelay()}>
            <p className="text-2xl font-extrabold text-ink-900 dark:text-white">85km/h</p>
            <LineSeries
              data={D.winSpeedLine}
              keys={[{ key: "a", color: "#0ea5e9" }, { key: "b", color: "#06b6d4" }]}
              showAxis
              height={130}
              fallback={<ChartFallback height={130} />}
            />
            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Win speed</h3>
              <span className="text-xs text-ink-500 dark:text-ink-300">Sunday 23</span>
            </div>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt&hellip;</p>
          </BentoCard>

          {/* Card 12 */}
          <BentoCard delay={nextDelay()}>
            <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Average of the first economies</h3>
            <p className="mb-3 mt-1 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt.</p>
            <div className="mb-2 flex items-center justify-between text-xs text-ink-500 dark:text-ink-300">
              <span>List of countries</span>
              <span>8 countries</span>
            </div>
            <RankBars
              items={D.economiesRanking.map((c) => ({ ...c, textOnBar: true }))}
              height={24}
              gap={7}
            />
          </BentoCard>

          {/* Card 13 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Personal Diagnostics</h3>
              <SlidersHorizontal size={15} className="text-ink-300" />
            </div>
            <ProfileRow name="Marvin McKinney" role="Scrum Master" seed="marvin" />
            <p className="mt-3 text-2xl font-extrabold text-ink-900 dark:text-white">8K</p>
            <p className="mb-2 text-xs text-ink-500 dark:text-ink-300">263 contributions in the last year</p>
            <BarSeriesRainbow data={D.diagnosticsRainbow} colors={D.rainbowColors} height={90} barSize={10} fallback={<ChartFallback height={90} />} />
          </BentoCard>

          {/* Card 14 */}
          <BentoCard delay={nextDelay()}>
            <ProfileRow
              name="Jenny Wilson"
              role="Software Developer"
              seed="jenny-wilson"
              action={<span className="text-ink-300">&hellip;</span>}
            />
            <p className="mt-3 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1">
                <InlineProgress value={83} color="#2563eb" height={9} />
              </div>
              <span className="text-[11px] font-bold text-ink-500 dark:text-ink-300 whitespace-nowrap">MAX/83%</span>
            </div>
            <div className="mt-2">
              <LineSeries data={D.jennyLine} keys={[{ key: "v", color: "#2563eb" }]} showAxis height={130} fallback={<ChartFallback height={130} />} />
            </div>
            <p className="mt-1 text-xs font-medium text-ink-700 dark:text-ink-200">Value of transactions in the last year</p>
            <p className="text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt.</p>
          </BentoCard>

          {/* Card 15 */}
          <BentoCard delay={nextDelay()}>
            <ProfileRow name="Arthur" role="" seed="arthur" action={<StatDelta value={23.45} />} />
            <p className="mt-2 text-xs text-ink-500 dark:text-ink-300">Statement of earnings</p>
            <p className="text-2xl font-extrabold text-ink-900 dark:text-white">$9834.72</p>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
            <div className="mt-2">
              <LineSeries data={D.earningsLine} keys={[{ key: "v", color: "#2563eb" }]} height={110} fallback={<ChartFallback height={110} />} />
            </div>
          </BentoCard>

          {/* Card 16 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-xs text-ink-500 dark:text-ink-300">Expected earnings</p>
                <p className="text-2xl font-extrabold text-ink-900 dark:text-white">&euro;682.5</p>
              </div>
              <span className="rounded-full bg-[#2563eb] px-2.5 py-1 text-[11px] font-bold text-white">+2.45%</span>
            </div>
            <LineSeries data={D.expectedEarningsSpark} keys={[{ key: "v", color: "#0ea5e9" }]} height={110} fallback={<ChartFallback height={110} />} />
          </BentoCard>

          {/* Card 17 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Monthly Average Rainfall</h3>
              <Share2 size={15} className="text-ink-300" />
            </div>
            <p className="mb-2 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt.</p>
            <AreaSeries data={D.monthlyRainfall} keys={[{ key: "v", color: "#06b6d4" }]} height={130} fallback={<ChartFallback height={130} />} />
          </BentoCard>

          {/* Card 18 */}
          <BentoCard delay={nextDelay()}>
            <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Most common desktop screen readers</h3>
            <p className="mb-2 mt-1 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt.</p>
            <LineSeries data={D.screenReadersLine} keys={[{ key: "v", color: "#0ea5e9" }]} showAxis height={140} fallback={<ChartFallback height={140} />} />
          </BentoCard>

          {/* Card 19 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Collection</h3>
              <SlidersHorizontal size={15} className="text-ink-300" />
            </div>
            <p className="text-xs text-ink-500 dark:text-ink-300">Diagnostics</p>
            <p className="text-2xl font-extrabold text-ink-900 dark:text-white">2,4K</p>
            <p className="mb-2 text-xs text-ink-500 dark:text-ink-300">263 contributions in the last year</p>
            <BarSeriesRainbow data={D.collectionRainbowBars} colors={D.rainbowColors.slice(2)} height={90} barSize={12} fallback={<ChartFallback height={90} />} />
          </BentoCard>

          {/* Card 20 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Statistic</h3>
              <SlidersHorizontal size={15} className="text-ink-300" />
            </div>
            <p className="mb-2 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt.</p>
            <BarSeries
              data={D.statisticMixed}
              keys={[
                { key: "yellow", color: "#7dd3fc" },
                { key: "blue", color: "#0ea5e9" },
                { key: "pink", color: "#2563eb" },
              ]}
              showAxis
              height={150}
              barSize={8}
              fallback={<ChartFallback height={150} />}
            />
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-ink-500 dark:text-ink-300">
              {["24h", "1d", "3d", "1w", "3w", "1m"].map((t, i) => (
                <Pill key={`${t}-${i}`} active={t === "3d"} color="#2563eb">{t}</Pill>
              ))}
            </div>
          </BentoCard>

          {/* Card 21 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-1 flex items-center justify-between text-xs text-ink-500 dark:text-ink-300">
              <span>Tarragona, Salou</span>
              <span>Wednesday 18</span>
            </div>
            <h3 className="mb-2 flex items-center gap-1.5 text-[15px] font-bold text-ink-900 dark:text-white">
              <Wind size={15} className="text-brand-blue" /> Wind speed
            </h3>
            <p className="mb-2 text-xs text-ink-500 dark:text-ink-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
            <Legend items={[{ label: "Zone one", color: "#1e3a8a" }, { label: "Zone two", color: "#06b6d4" }]} />
            <div className="mt-2">
              <LineSeries
                data={D.windSpeedDual}
                keys={[{ key: "zoneOne", color: "#1e3a8a" }, { key: "zoneTwo", color: "#06b6d4" }]}
                height={120}
                fallback={<ChartFallback height={120} />}
              />
            </div>
          </BentoCard>

          {/* Card 22 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-2xl font-extrabold text-ink-900 dark:text-white">$890.93</p>
              <BarChart2 size={16} className="text-ink-300" />
            </div>
            <div className="mb-2 border-t border-dashed border-ink-300 dark:border-white/15 pt-2 text-right text-[10px] text-ink-500 dark:text-ink-300">MAX</div>
            <BarSeries
              data={D.monthlyHighlighted}
              keys={[{ key: "v", color: "#dbeafe" }]}
              showAxis
              height={140}
              barSize={13}
              fallback={<ChartFallback height={140} />}
            />
          </BentoCard>

          {/* Card 23 */}
          <BentoCard delay={nextDelay()}>
            <h3 className="mb-3 flex items-center gap-1.5 text-[15px] font-bold text-ink-900 dark:text-white">
              <Sparkles size={15} className="text-brand-blue" /> User supplied data
            </h3>
            <LineSeries
              data={D.userSuppliedDual}
              keys={[{ key: "one", color: "#0ea5e9" }, { key: "two", color: "#2563eb" }]}
              showAxis
              height={140}
              fallback={<ChartFallback height={140} />}
            />
            <p className="mt-3 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt.</p>
            <Legend items={[{ label: "Data one", color: "#0ea5e9" }, { label: "Data two", color: "#2563eb" }]} />
          </BentoCard>

          {/* Card 24 */}
          <BentoCard delay={nextDelay()}>
            <h3 className="mb-2 text-[15px] font-bold text-ink-900 dark:text-white">Contributions</h3>
            <p className="mb-3 text-xs text-ink-500 dark:text-ink-300">Balance of downloads of the last 5 years in the company</p>
            <BarSeries data={D.contributionsBars5y} keys={[{ key: "v", color: "#dbeafe" }]} showAxis height={110} barSize={20} fallback={<ChartFallback height={110} />} />
            <div className="-mx-5 -mb-5 mt-3 rounded-b-card bg-emerald-50 dark:bg-emerald-500/10 px-5 pb-5 pt-3">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-ink-700 dark:text-ink-200">Select an area by dragging across the lower chart</span>
                <span className="font-bold text-emerald-600">85%</span>
              </div>
              <AreaSeries data={D.contributionsAreaTrend} keys={[{ key: "v", color: "#10b981", opacity: 0.5 }]} height={90} fallback={<ChartFallback height={90} />} />
            </div>
          </BentoCard>

          {/* Card 25 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Intensity</h3>
              <span className="text-xs text-ink-500 dark:text-ink-300">September 2026</span>
            </div>
            <p className="mb-2 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt.</p>
            <WaveStack
              data={D.intensityWave}
              keys={[{ key: "a", color: "#1e40af" }, { key: "b", color: "#1e40af" }, { key: "c", color: "#dbeafe" }]}
              height={140}
              fallback={<ChartFallback height={140} />}
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex -space-x-1">
                {["#1e40af", "#1e40af", "#dbeafe", "#1e3a8a"].map((c, i) => (
                  <span key={`${c}-${i}`} className="h-3 w-3 rounded-full ring-2 ring-white dark:ring-ink-800" style={{ background: c }} />
                ))}
              </div>
              <span className="text-xs font-bold text-ink-900 dark:text-white">80%</span>
            </div>
            <p className="mt-1 text-[11px] text-ink-500 dark:text-ink-300">Intensity zones</p>
          </BentoCard>

          {/* Card 26 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">America</h3>
              <SlidersHorizontal size={15} className="text-ink-300" />
            </div>
            <Legend items={[{ label: "2010", color: "#2563eb" }, { label: "2011", color: "#1e40af" }, { label: "2012", color: "#06b6d4" }]} />
            <div className="mt-2">
              <BarSeries
                data={D.historicPopulation}
                keys={[
                  { key: "y2010", color: "#2563eb" },
                  { key: "y2011", color: "#1e40af" },
                  { key: "y2012", color: "#06b6d4" },
                ]}
                height={150}
                barSize={6}
                fallback={<ChartFallback height={150} />}
              />
            </div>
            <h4 className="mt-3 text-[15px] font-bold text-ink-900 dark:text-white">Historic World Population</h4>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
            <div className="mt-3 border-t border-black/5 dark:border-white/10 pt-3">
              <ProfileRow name="Mathias" role="" seed="mathias" action={<StatDelta value={23.45} />} />
            </div>
          </BentoCard>

          {/* Card 27 */}
          <BentoCard delay={nextDelay()}>
            <ProfileRow
              name="Annia"
              role="Marketing Coordinator"
              seed="annia"
              action={
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                  34.56
                  <LineSeries data={D.densityTrend} keys={[{ key: "v", color: "#10b981" }]} height={22} fallback={<div className="h-[22px] w-12" />} />
                </div>
              }
            />
            <p className="mt-2 text-xs text-ink-500 dark:text-ink-300">January, 2026</p>
            <h4 className="mb-3 text-[15px] font-bold text-ink-900 dark:text-white">Browser market shares</h4>
            <div className="flex justify-center">
              <MultiRing
                rings={[
                  { value: 98, color: "#0ea5e9" },
                  { value: 74, color: "#06b6d4" },
                  { value: 52, color: "#1e40af" },
                ]}
                centerLabel="98%"
                centerSub="Browser"
                size={140}
              />
            </div>
            <button className="mt-4 w-full rounded-full bg-ink-900 dark:bg-white py-2 text-xs font-bold text-white dark:text-ink-900 transition-transform hover:scale-[1.02]">
              ANOTHER ACTION
            </button>
          </BentoCard>

          {/* Card 28 */}
          <BentoCard delay={nextDelay()}>
            <h3 className="mb-1 text-[15px] font-bold text-ink-900 dark:text-white">Historical USD to EUR Exchange Rate</h3>
            <LineSeries
              data={D.usdEurHistorical}
              keys={[{ key: "usd", color: "#0ea5e9" }, { key: "eur", color: "#2563eb" }]}
              showAxis
              height={140}
              fallback={<ChartFallback height={140} />}
            />
            <p className="mt-2 text-xs text-ink-500 dark:text-ink-300">Select an area by dragging across the lower chart</p>
          </BentoCard>

          {/* Card 29 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Stacked column chart</h3>
              <LineSeries data={D.densityTrend} keys={[{ key: "v", color: "#1e3a8a" }]} height={20} fallback={<div className="h-[20px] w-16" />} />
            </div>
            <BarSeries
              data={D.appleBananaBars}
              keys={[{ key: "apple", color: "#1e3a8a" }, { key: "banana", color: "#7dd3fc" }]}
              showAxis
              height={140}
              barSize={10}
              fallback={<ChartFallback height={140} />}
            />
            <div className="mt-2">
              <Legend items={[{ label: "Apple", color: "#1e3a8a" }, { label: "Banana", color: "#7dd3fc" }]} />
            </div>
            <p className="mt-2 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt.</p>
            <div className="mt-3 border-t border-black/5 dark:border-white/10 pt-3">
              <ProfileRow name="Jerome Bell" role="Marketing Coordinator" seed="jerome" action={<Share2 size={14} className="text-ink-300" />} />
            </div>
          </BentoCard>

          {/* Card 30 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Storage of your device</h3>
              <SlidersHorizontal size={15} className="text-ink-300" />
            </div>
            <div className="flex items-center gap-5">
              <Donut data={D.storageBreakdown} centerLabel="77%" size={120} thickness={13} fallback={<ChartFallback height={120} />} />
              <Legend items={D.storageBreakdown.map((s) => ({ label: s.name, color: s.color }))} />
            </div>
            <p className="mt-4 text-sm font-bold text-ink-900 dark:text-white">Used storage</p>
            <div className="mt-1 flex items-center justify-between">
              <div className="flex -space-x-1">
                {D.storageBreakdown.map((s, i) => (
                  <span key={`${s.name}-${i}`} className="h-3 w-3 rounded-full ring-2 ring-white dark:ring-ink-800" style={{ background: s.color }} />
                ))}
              </div>
              <span className="text-lg font-extrabold text-ink-900 dark:text-white">137GB</span>
            </div>
          </BentoCard>

          {/* Card 31 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-4 flex items-center justify-between">
              <ChevronLeft size={16} className="text-ink-300" />
              <span className="text-ink-300">&hellip;</span>
            </div>
            <div className="flex justify-center">
              <RadialGauge value={70} size={150} thickness={14} color="#38bdf8" label="70%" />
            </div>
            <h3 className="mt-4 text-center text-[17px] font-bold text-ink-900 dark:text-white">My storage</h3>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-ink-500 dark:text-ink-300"><Dot color="#38bdf8" />Used</span>
              <span className="flex items-center gap-1.5 text-ink-500 dark:text-ink-300"><Dot color="#dbeafe" />Total space</span>
              <button className="rounded-full bg-[#2563eb] px-3 py-1.5 text-[11px] font-bold text-white">BUY MORE</button>
            </div>
          </BentoCard>

          {/* Card 32 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-2 flex items-start justify-between gap-2">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white leading-snug">
                Countries compared by population density and total area.
              </h3>
              <SlidersHorizontal size={15} className="mt-0.5 shrink-0 text-ink-300" />
            </div>
            <div className="mb-3 flex items-center justify-between text-xs text-ink-500 dark:text-ink-300">
              <span>January, 221</span>
              <span className="font-bold text-emerald-500">↑ 98%</span>
            </div>
            <p className="mb-3 text-xs text-ink-500 dark:text-ink-300">More densely populate</p>
            <div className="flex justify-center">
              <Donut data={D.countriesCompared} size={140} thickness={70} fallback={<ChartFallback height={140} />} />
            </div>
            <div className="mt-4">
              <p className="mb-2 flex items-center justify-between text-xs text-ink-500 dark:text-ink-300">
                <span>List countries</span>
              </p>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {D.countriesCompared.map((c, i) => (
                  <span key={`${c.name}-${i}`} className="flex items-center gap-1.5 text-[11px] text-ink-700 dark:text-ink-200 truncate">
                    <Dot color={c.color} /> <span className="truncate">{c.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Card 33 */}
          <BentoCard delay={nextDelay()}>
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-ink-900 dark:text-white">Doughnut</h3>
              <SlidersHorizontal size={15} className="text-ink-300" />
            </div>
            <p className="mb-3 text-xs text-ink-500 dark:text-ink-300">Browser market shares at a specific website, 2026</p>
            <div className="flex items-center gap-5">
              <Donut data={D.cssHtmlSass} centerLabel="73%" size={116} thickness={14} fallback={<ChartFallback height={116} />} />
              <Legend items={D.cssHtmlSass.map((c) => ({ label: c.name, color: c.color }))} />
            </div>
            <div className="mt-4 border-t border-black/5 dark:border-white/10 pt-3">
              <ProfileRow name="Robert Fox" role="Software Developer" seed="robert-fox-2" action={<Pill active color="#12121a">PROFILE</Pill>} />
            </div>
          </BentoCard>

          {/* Card 34 — dark accent card */}
          <BentoCard delay={nextDelay()} className="bg-ink-900 dark:bg-gradient-to-br dark:from-ink-800 dark:to-ink-900" accent="linear-gradient(90deg,#2563eb,#1e40af)">
            <h3 className="text-[15px] font-bold text-white">Estimated Worldwide Population</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {(["America", "Europe", "Asia"] as const).map((r, i) => (
                <span
                  key={r}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                    i === 0 ? "bg-[#1e40af] text-white" : "text-white/50"
                  }`}
                >
                  {r}
                </span>
              ))}
            </div>
            <div className="mt-3">
              <AreaSeries
                data={D.worldPopulation.America}
                keys={[{ key: "v", color: "#93c5fd", opacity: 0.6 }]}
                height={130}
                fallback={<ChartFallback height={130} />}
              />
            </div>
            <p className="mt-2 text-xs text-white/60">
              Minim dolor in amet nulla laboris enim dolore consequatt.
            </p>
            <div className="mt-2 flex gap-3 text-[11px] text-white/60">
              <span>2011</span>
              <span>2012</span>
            </div>
          </BentoCard>

          {/* Card 35 */}
          <BentoCard delay={nextDelay()}>
            <ProfileRow name="Ralph Edwards" role="Team Leader" seed="ralph" action={<Share2 size={14} className="text-ink-300" />} />
            <p className="mt-3 text-xs text-ink-500 dark:text-ink-300">Minim dolor in amet nulla laboris enim dolore consequatt.</p>
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
