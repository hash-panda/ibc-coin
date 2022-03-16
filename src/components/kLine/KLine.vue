<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createChart } from 'lightweight-charts';
import areaSeriesData from './mock/areaSeriesData';
import volumeSeriesData from './mock/volumeSeriesData';
import candlestickSeriesData from './mock/candlestickSeriesData';

const chartRef = ref(null);

const initCharts = () => {
    try {
        const chart = createChart(chartRef.value, {
            width: chartRef._value.offsetWidth,
            height: chartRef._value.offsetHeight,
            rightPriceScale: {
                scaleMargins: {
                    top: 0.2,
                    bottom: 0.4
                },
                borderVisible: false
            },
            layout: {
                backgroundColor: '#2a303c',
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
                height: chartRef._value.offsetHeight
            });
            setTimeout(() => chart.timeScale().fitContent(), 0);
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
    }, 2000);
});
</script>
<template>
    <div ref="chartRef" class="w-full h-2/3"></div>
</template>
