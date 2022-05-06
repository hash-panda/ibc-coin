<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { createChart, UTCTimestamp } from 'lightweight-charts'
import { ArrowSyncCircle20Filled } from '@vicons/fluent'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useAppStore } from '@/store/app'
import { useTokenStore } from '@/store/token'
import { useRequest } from 'vue-request'
import { queryKLine, KLineRequestParams } from '@/api'
import { isIntersectionTypeAnnotation } from '@babel/types'
import { timeToLocal } from '@/utils'

interface KLine {}

interface emitType {
    (e: 'timeIntervalSelect', data: string): void
}

const isInit = ref(true)
const tokenStore = useTokenStore()
const appStore = useAppStore()
const timeSelect = ref('5m')
const chartRef = ref(null)
const lastUpdateTime = ref<any>()
const legend = ref({
    // time: '',
    open: 0,
    close: 0,
    high: 0,
    low: 0,
})

let chart = {} as any
let candlestickSeries: any = {}
const initCharts = () => {
    try {
        chart = createChart(chartRef.value, {
            width: chartRef._value?.offsetWidth,
            height: chartRef._value?.offsetHeight - 90,
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
                secondsVisible: true,
            },
            watermark: {
                visible: true,
                fontSize: 108,
                horzAlign: 'center',
                vertAlign: 'center',
                color: appStore.isDark ? '#efefef' : '#241c1c',
                text: 'IBCcoin.org',
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
        chart.timeScale().fitContent()
        // 页面大小发生变化时，图表跟着变化
        window.addEventListener('resize', resize, false)
        function resize() {
            // chart.applyOptions({
            //     width: chartRef._value?.offsetWidth,
            //     height: chartRef._value?.offsetHeight ?? 500 - 90,
            // })
            setTimeout(() => {
                chart.timeScale().fitContent()
            }, 0)
        }

        const areaSeries = chart.addAreaSeries({
            topColor: 'rgba(38,198,218, 0.56)',
            bottomColor: 'rgba(38,198,218, 0.04)',
            lineColor: 'rgba(38,198,218, 1)',
            lineWidth: 2,
        })

        const volumeSeries = chart.addHistogramSeries({
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

        candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a59a',
            downColor: '#A52A2A',
            borderVisible: false,
            wickVisible: true,
            borderUpColor: '#26a59a',
            borderDownColor: '#A52A2A',
            wickUpColor: '#26a59a',
            wickDownColor: '#A52A2A',
        })

        console.log('data', data)
        // candlestickSeries.setData(candlestickSeriesData);
        // candlestickSeries.setData(data ?? [])
        // candlestickSeries.updateData(data);

        // high low open close 展示面板数据
        chart.subscribeCrosshairMove(param => {
            if (param.time) {
                const price: any = param.seriesPrices.get(candlestickSeries)
                dayjs.extend(utc)
                legend.value = {
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
        chart.timeScale().subscribeVisibleTimeRangeChange(newVisibleTimeRange => {
            if (newVisibleTimeRange) {
                console.log(
                    'chart.timeScale().subscribeVisibleTimeRangeChange',
                    dayjs.unix(newVisibleTimeRange.from).format('YYYY-MM-DD HH:mm:ss'),
                    dayjs.unix(newVisibleTimeRange.to).format('YYYY-MM-DD HH:mm:ss'),
                )
                // if (lastUpdateTime.value - newVisibleTimeRange.from > 1000 * 600) {
                //     fetchKLine(lastUpdateTime.value)
                // }
            }
        })
        chart.timeScale().subscribeVisibleLogicalRangeChange(newVisibleLogicalRange => {
            if (newVisibleLogicalRange) {
                console.log(
                    'chart.timeScale().subscribeVisibleLogicalRangeChange',
                    newVisibleLogicalRange.from,
                    newVisibleLogicalRange.to,
                    dayjs.unix(newVisibleLogicalRange.from).format('YYYY-MM-DD HH:mm:ss'),
                    dayjs.unix(newVisibleLogicalRange.to).format('YYYY-MM-DD HH:mm:ss'),
                )
                // if (newVisibleLogicalRange.from < -10) {
                //     updateKLine(lastUpdateTime.value)
                // }
            }
        })
    } catch (e) {
        console.log('e', e)
    }
}

const {
    data,
    run: createKLineRun,
    reload,
    loading,
} = useRequest(queryKLine, {
    // defaultParams: [{ token_id: 1, k_line_interval: timeInterval.value }],
    errorRetryCount: 5,
    pollingInterval: 1000 * 30,
    debounceInterval: 1000,
    pollingWhenHidden: false,
    manual: true,
    onError: error => {
        console.log('queryKLine (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        console.log('queryKLine (⊙︿⊙) something success', res)
        if ((res as any)?.length > 0) {
            candlestickSeries.setData(res)
        }
    },
})

const { run: updateKLineRun } = useRequest(queryKLine, {
    // defaultParams: [{ token_id: 1, k_line_interval: timeInterval.value }],
    debounceInterval: 2000,
    manual: true,
    onError: error => {
        console.log('updateKLineRun (⊙︿⊙) something error', error)
    },
    onSuccess: res => {
        console.log('updateKLineRun (⊙︿⊙) something success', res)
        lastUpdateTime.value = res[0]?.time
        if ((res as any)?.length > 0) {
            candlestickSeries.setData(res)
        }
    },
})

const fetchKLine = (endTime?: number) => {
    if (tokenStore.currentTokenInfo.tokenId) {
        const requestParams = { token_id: tokenStore.currentTokenInfo.tokenId, k_line_interval: timeSelect.value }
        createKLineRun(requestParams)
    }
}
const updateKLine = (endTime?: number) => {
    let requestParams: KLineRequestParams = { token_id: tokenStore.currentTokenInfo.tokenId, k_line_interval: timeSelect.value }
    if (endTime) {
        requestParams = { ...requestParams, timestamp_end: endTime }
    }
    updateKLineRun(requestParams)
}

watch(
    () => tokenStore.currentTokenInfo.tokenId,
    () => {
        reload()
        candlestickSeries.setData([])
        chart.timeScale().fitContent()
        isInit.value = true
        fetchKLine()
    },
)

watch(
    () => timeSelect.value,
    () => {
        if (timeSelect.value) {
            candlestickSeries.setData([])
            chart.timeScale().fitContent()
            isInit.value = true
            fetchKLine()
        }
    },
)

// 根据主题适配颜色
watch(
    () => appStore.isDark,
    () => {
        chart.applyOptions({
            layout: {
                backgroundColor: appStore.isDark ? '#ffffff' : '#171212',
                textColor: appStore.isDark ? '#171212' : '#d1d4dc',
            },
            watermark: {
                color: appStore.isDark ? '#efefef' : '#241c1c',
            },
        })
    },
)

onMounted(() => {
    initCharts()
    isInit.value = true
    fetchKLine()
})

// 选择时间
const timeIntervalSelect = value => {
    timeSelect.value = value.target.defaultValue
}
</script>
<template>
    <div class="w-full h-full">
        <div class="btn-group ml-3 mb-3">
            <input
                type="radio"
                name="options"
                value="5s"
                :data-title="$t('kline.option.5s')"
                class="btn btn-xs lg:btn-sm"
                @input="timeIntervalSelect"
            />
            <input
                type="radio"
                name="options"
                value="30s"
                :data-title="$t('kline.option.30s')"
                class="btn btn-xs lg:btn-sm"
                @input="timeIntervalSelect"
            />
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
                    <!-- <span>
                        <span class="text-base-content opacity-50">{{ legend.time }}</span>
                    </span> -->
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
