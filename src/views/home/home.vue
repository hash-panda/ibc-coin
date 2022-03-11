<script setup lang="ts">
import { ref } from 'vue';
import Nav from '@/components/nav/Nav.vue';
import { useRequest } from 'vue-request';
import axios from 'axios';

const demo = ref(0);
const getWeather = () => {
    return axios.post('/demoApi/common/weather/get15DaysWeatherByArea', {
        apiKey: 'Ex2AFtn418512e0dd84329a443e14a881bfce3ef91cf6d8',
        area: '北京'
    });
};
const { data, run } = useRequest(getWeather, {
    errorRetryCount: 5,
    initialData: 'init',
    onError: () => {
        console.log('(⊙︿⊙) something error');
    },
    onSuccess: () => {
        console.log('✿✿ヽ(°▽°)ノ✿ success');
    }
});
run();
</script>
<template>
    <div>
        <Nav />
        <div>{{ data }}</div>
    </div>
</template>
