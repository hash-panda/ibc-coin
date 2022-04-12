<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { createChart } from 'lightweight-charts'
import areaSeriesData from './mock/areaSeriesData'
import volumeSeriesData from './mock/volumeSeriesData'
import candlestickSeriesData from './mock/candlestickSeriesData'
import dayjs from 'dayjs'
import { useAppStore } from '@/store/app'

interface KLine {}

interface emitType {
    (e: 'timeIntervalSelect', data: string): void
}
const props = defineProps<{
    data: any
}>()
const emit = defineEmits<emitType>()
const appStore = useAppStore()
const timeSelect = ref('5m')
const chartRef = ref(null)
const legend = ref({
    time: '',
    open: 0,
    close: 0,
    high: 0,
    low: 0,
})

const chart: any = ref({})
let candlestickSeries: any = {}
const initCharts = () => {
    try {
        chart.value = createChart(chartRef.value, {
            width: chartRef._value.offsetWidth,
            height: chartRef._value.offsetHeight - 90,
            rightPriceScale: {
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1,
                },
                borderVisible: false,
            },
            layout: {
                backgroundColor: appStore.isDark ? '#ffffff' : '#171212',
                textColor: appStore.isDark ? '#171212' : '#d1d4dc',
            },
            grid: {
                vertLines: {
                    color: 'rgba(42, 46, 57, 0)',
                },
                horzLines: {
                    color: 'rgba(42, 46, 57, 0.1)',
                },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
            watermark: {
                visible: true,
                fontSize: 108,
                horzAlign: 'center',
                vertAlign: 'center',
                color: appStore.isDark ? '#efefef' : '#241c1c',
                text: 'IBCCoin.org',
            },
            // crosshair: {
            //   vertLine: {
            //     width: 4,
            //     color: 'rgba(224, 227, 235, 0.1)',
            //     style: 0,
            //   },
            //   horzLine: {
            //     visible: false,
            //     labelVisible: false,
            //   },
            // },
        })
        chart.value.timeScale().fitContent()
        // 页面大小发生变化时，图表跟着变化
        window.addEventListener('resize', resize, false)
        function resize() {
            chart.value.applyOptions({
                width: chartRef._value.offsetWidth,
                height: chartRef._value.offsetHeight - 90,
            })
            setTimeout(() => {
                chart.timeScale().fitContent()
            }, 0)
        }

        const areaSeries = chart.value.addAreaSeries({
            topColor: 'rgba(38,198,218, 0.56)',
            bottomColor: 'rgba(38,198,218, 0.04)',
            lineColor: 'rgba(38,198,218, 1)',
            lineWidth: 2,
        })

        const volumeSeries = chart.value.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: '',
            scaleMargins: {
                top: 0.7,
                bottom: 0.01,
            },
        })

        // areaSeries.setData(areaSeriesData);
        // volumeSeries.setData(volumeSeriesData);

        candlestickSeries = chart.value.addCandlestickSeries({
            upColor: '#26a59a',
            downColor: '#A52A2A',
            borderVisible: false,
            wickVisible: true,
            borderUpColor: '#26a59a',
            borderDownColor: '#A52A2A',
            wickUpColor: '#26a59a',
            wickDownColor: '#A52A2A',
        })

        console.log('props.data', props.data)
        // candlestickSeries.setData(candlestickSeriesData);
        // candlestickSeries.setData(props.data??[]);
        // candlestickSeries.updateData(props.data);

        // high low open close 展示面板数据
        chart.value.subscribeCrosshairMove(param => {
            if (param.time) {
                const price: any = param.seriesPrices.get(candlestickSeries)
                legend.value = {
                    time: dayjs.unix(param.time).format('YYYY-MM-DD HH:mm'),
                    open: price.open,
                    close: price.close,
                    low: price.low,
                    high: price.high,
                }
            } else {
                console.log('ETC USD 7D VWAP')
            }
        })

        // 横坐标时间坐标更新
        chart.value.timeScale().subscribeVisibleTimeRangeChange(newVisibleTimeRange => {
            if (newVisibleTimeRange) {
                console.log(
                    'chart.timeScale().subscribeVisibleTimeRangeChange',
                    dayjs.unix(newVisibleTimeRange.from).format('YYYY-MM-DD HH:mm:ss'),
                    dayjs.unix(newVisibleTimeRange.to).format('YYYY-MM-DD HH:mm:ss'),
                )
            }
        })
    } catch (e) {
        console.log('e', e)
    }
}

watch(
    () => props.data,
    () => {
        if (props.data) {
            candlestickSeries.setData(props.data ?? [])
            console.log('candlestickSeries', candlestickSeries)
        }
    },
)

watch(
    () => appStore.isDark,
    () => {
        chart.value.applyOptions({
            layout: {
                backgroundColor: appStore.isDark ? '#ffffff' : '#171212',
                textColor: appStore.isDark ? '#171212' : '#d1d4dc',
            },
            watermark: {
                color: appStore.isDark ? '#efefef' : '#241c1c',
            },
        })

        console.log('chart chart', chart)
    },
)

onMounted(() => {
    setTimeout(() => {
        initCharts()
    }, 300)
})

// 选择时间
const timeIntervalSelect = value => {
    console.log('vale', value.target.defaultValue)
    emit('timeIntervalSelect', value.target.defaultValue)
}
</script>
<template>
    <div class="w-full h-full">
        <div class="btn-group ml-3 mb-3">
            <!-- <input
                type="radio"
                name="options"
                value="5s"
                :data-title="$t('kline.option.5s')"
                class="btn btn-xs lg:btn-sm"
                @input="timeIntervalSelect"
            /> -->
            <!-- <input
                type="radio"
                name="options"
                value="30s"
                :data-title="$t('kline.option.30s')"
                class="btn btn-xs lg:btn-sm"
                @input="timeIntervalSelect"
            /> -->
            <input
                type="radio"
                name="options"
                value="5m"
                :data-title="$t('kline.option.5m')"
                class="btn btn-xs lg:btn-sm"
                @input="timeIntervalSelect"
                checked
            />
            <input
                type="radio"
                name="options"
                value="30m"
                :data-title="$t('kline.option.30m')"
                class="btn btn-xs lg:btn-sm"
                @input="timeIntervalSelect"
            />
            <input
                type="radio"
                name="options"
                value="1h"
                :data-title="$t('kline.option.1h')"
                class="btn btn-xs lg:btn-sm"
                @input="timeIntervalSelect"
            />
            <input
                type="radio"
                name="options"
                value="1d"
                :data-title="$t('kline.option.1d')"
                class="btn btn-xs lg:btn-sm"
                @input="timeIntervalSelect"
            />
        </div>
        <div ref="chartRef" class="w-full h-full relative ml-3">
            <div class="absolute top-3 z-20 ml-5">
                <span></span>
                <n-space class="text-xs">
                    <span>
                        <span class="text-base-content opacity-50">{{ legend.time }}</span>
                    </span>
                    <span>
                        <span class="text-base-content opacity-50">{{ $t('kline.open') }}:</span>
                        <span class="text-accent">{{ legend.open }}</span>
                    </span>
                    <span>
                        <span class="text-base-content opacity-50">{{ $t('kline.high') }}:</span>
                        <span class="text-accent">{{ legend.high }}</span>
                    </span>
                    <span>
                        <span class="text-base-content opacity-50">{{ $t('kline.low') }}:</span>
                        <span class="text-accent">{{ legend.low }}</span>
                    </span>
                    <span>
                        <span class="text-base-content opacity-50">{{ $t('kline.close') }}:</span>
                        <span class="text-accent">{{ legend.close }}</span>
                    </span>
                </n-space>
            </div>
        </div>
    </div>
</template>
