<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { createChart } from 'lightweight-charts';
import areaSeriesData from './mock/areaSeriesData';
import volumeSeriesData from './mock/volumeSeriesData';
import candlestickSeriesData from './mock/candlestickSeriesData';
import dayjs from 'dayjs';

interface KLine {}

const props = defineProps<{
    data: any;
}>();
const chartRef = ref(null);
const legend = ref({
  time: '',
  open: 0,
  close: 0,
  high: 0,
  low: 0
})
const initCharts = () => {
    try {
        const chart = createChart(chartRef.value, {
            width: chartRef._value.offsetWidth,
            height: chartRef._value.offsetHeight - 30,
            rightPriceScale: {
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1
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
            },
            timeScale: {
              timeVisible: true,
              secondsVisible: false,
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

        // areaSeries.setData(areaSeriesData);
        // volumeSeries.setData(volumeSeriesData);

        const candlestickSeries = chart.addCandlestickSeries(
          {
          upColor: "#26a59a",
          downColor: "#A52A2A",
          borderVisible: false,
          wickVisible: true,
          borderUpColor: "#26a59a",
          borderDownColor: "#A52A2A",
          wickUpColor: "#26a59a",
          wickDownColor: "#A52A2A"
          }
        );

        console.log('props.data',props.data)
        // candlestickSeries.setData(candlestickSeriesData);
        candlestickSeries.setData(props.data);
        // candlestickSeries.updateData(props.data);


        // high low open close 展示面板数据
        chart.subscribeCrosshairMove((param) => {
          if (param.time) {
            const price:any = param.seriesPrices.get(candlestickSeries);
            legend.value = {
              time: dayjs.unix(param.time).format('YYYY-MM-DD HH:mm'),
              open: price.open,
              close: price.close,
              low: price.low,
              high: price.high
            }
          }
          else {
            console.log('ETC USD 7D VWAP');
          }
        });

        // 横坐标时间坐标更新
        chart.timeScale().subscribeVisibleTimeRangeChange((newVisibleTimeRange)=>{
          if (newVisibleTimeRange) {
            console.log('chart.timeScale().subscribeVisibleTimeRangeChange', newVisibleTimeRange)
          }
        })
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
        <div class="btn-group ml-3">
            <input type="radio" name="options" data-title="30 s" class="btn btn-sm" />
            <input type="radio" name="options" data-title="5 min" class="btn btn-sm" checked />
            <input type="radio" name="options" data-title="30 min" class="btn btn-sm" />
            <input type="radio" name="options" data-title="1 h" class="btn btn-sm" />
            <input type="radio" name="options" data-title="1 d" class="btn btn-sm" />
        </div>
        <div ref="chartRef" class="w-full h-full relative">
          <div class="absolute top-3 z-20 ml-5">
            <span></span>
            <n-space class="text-xs">
              <span>
                <span class="text-neutral-content opacity-50">{{ legend.time }}</span>
              </span>
              <span>
                <span class="text-neutral-content opacity-50">open: </span>
                <span class="text-accent">{{ legend.open }}</span>
              </span>
              <span>
                <span class="text-neutral-content opacity-50">high: </span>
                <span class="text-accent">{{ legend.high }}</span>
              </span>
              <span>
                <span class="text-neutral-content opacity-50">low: </span>
                <span class="text-accent">{{ legend.low }}</span>
              </span>
              <span>
                <span class="text-neutral-content opacity-50">close: </span>
                <span class="text-accent">{{ legend.close }}</span>
              </span>
            </n-space>
          </div>
        </div>
    </div>
</template>
