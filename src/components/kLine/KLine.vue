<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { createChart } from 'lightweight-charts';
import areaSeriesData from './mock/areaSeriesData';
import volumeSeriesData from './mock/volumeSeriesData';
import candlestickSeriesData from './mock/candlestickSeriesData';

const props = defineProps<{
    // coinPairList:;
}>();
const chartRef = ref(null);
const initCharts = () => {
    try {
        const chart = createChart(chartRef.value, {
            width: chartRef._value.offsetWidth,
            height: chartRef._value.offsetHeight - 30,
            rightPriceScale: {
                scaleMargins: {
                    top: 0.05,
                    bottom: 0.4
                },
                borderVisible: false
            },
            layout: {
                backgroundColor: '#171212',
                textColor: '#d1d4dc'
            },
            grid: {
                vertLines: {
                    color: 'rgba(42, 46, 57, 0)'
                },
                horzLines: {
                    color: 'rgba(42, 46, 57, 0.6)'
                }
            }
        });
        chart.timeScale().fitContent();
        // 页面大小发生变化时，图表跟着变化
        window.addEventListener('resize', resize, false);
        function resize() {
            chart.applyOptions({
                width: chartRef._value.offsetWidth,
                height: chartRef._value.offsetHeight - 30
            });
            setTimeout(() => {
                chart.timeScale().fitContent();
            }, 0);
        }

        const areaSeries = chart.addAreaSeries({
            topColor: 'rgba(38,198,218, 0.56)',
            bottomColor: 'rgba(38,198,218, 0.04)',
            lineColor: 'rgba(38,198,218, 1)',
            lineWidth: 2
        });

        const volumeSeries = chart.addHistogramSeries({
            color: '#26a69a',
            priceFormat: {
                type: 'volume'
            },
            priceScaleId: '',
            scaleMargins: {
                top: 0.7,
                bottom: 0.01
            }
        });

        areaSeries.setData(areaSeriesData);
        volumeSeries.setData(volumeSeriesData);

        // const candlestickSeries = chart.addCandlestickSeries();
        // candlestickSeries.setData(candlestickSeriesData);
    } catch (e) {
        console.log('e', e);
    }
};
onMounted(() => {
    setTimeout(() => {
        initCharts();
    }, 1000);
});
</script>
<template>
    <div class="w-full h-full">
        <div class="btn-group ml-4">
            <input type="radio" name="options" data-title="30 s" class="btn btn-sm" />
            <input type="radio" name="options" data-title="5 min" class="btn btn-sm" checked />
            <input type="radio" name="options" data-title="30 min" class="btn btn-sm" />
            <input type="radio" name="options" data-title="1 h" class="btn btn-sm" />
            <input type="radio" name="options" data-title="1 d" class="btn btn-sm" />
        </div>
        <div ref="chartRef" class="w-full h-full"></div>
    </div>
</template>
