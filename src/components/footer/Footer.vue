<script setup lang="ts">
const openTwitter = () => {
    window.open('https://twitter.com/ibcCoin_org', '_blank')
}

const openDiscord = () => {
    window.open('https://discord.com/invite/DeFi', '_blank')
}
</script>
<template>
    <footer class="body-font border-base-200 border-t mt-5">
        <div class="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
            <img src="@/assets/logo.png" width="40" />
            <p class="mt-4 text-sm sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">© 2022 IBCCoin.org</p>
            <span class="mt-4 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start">
                <div @click="openTwitter" class="tooltip tooltip-primary ml-3" data-tip="Twitter">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-8 w-8" viewBox="0 0 24 24">
                        <path
                            d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                        ></path>
                    </svg>
                </div>
                <div @click="openDiscord" class="tooltip tooltip-primary ml-3" data-tip="Discord">
                    <svg
                        t="1649515722394"
                        class="icon h-8 w-8"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="1549"
                        width="32"
                        height="32"
                    >
                        <path d="M0 512a512 512 0 1 0 1024 0A512 512 0 1 0 0 512z" fill="#343c4d" p-id="1550"></path>
                        <path d="M190.915 234.305h642.169v477.288H190.915z" fill="#FFFFFF" p-id="1551"></path>
                        <path
                            d="M698.157 932.274L157.288 862.85c-58.43-7.5-55.4-191.167-50.26-249.853l26.034-297.22c5.14-58.686 74.356-120.22 132.7-128.362l466.441-65.085c58.346-8.14 177.24 212.65 176.09 271.548l-8.677 445.108M512 300.373c-114.347 0-194.56 49.067-194.56 49.067 43.947-39.253 120.747-61.867 120.747-61.867l-7.254-7.253c-72.106 1.28-137.386 51.2-137.386 51.2-73.387 153.173-68.694 285.44-68.694 285.44 59.734 77.227 148.48 71.68 148.48 71.68l30.294-38.4c-53.334-11.52-87.04-58.88-87.04-58.88S396.8 645.973 512 645.973c115.2 0 195.413-54.613 195.413-54.613s-33.706 47.36-87.04 58.88l30.294 38.4s88.746 5.547 148.48-71.68c0 0 4.693-132.267-68.694-285.44 0 0-65.28-49.92-137.386-51.2l-7.254 7.253s76.8 22.614 120.747 61.867c0 0-80.213-49.067-194.56-49.067M423.68 462.08c27.733 0 50.347 24.32 49.92 54.187 0 29.44-22.187 54.186-49.92 54.186-27.307 0-49.493-24.746-49.493-54.186 0-29.867 21.76-54.187 49.493-54.187m177.92 0c27.733 0 49.92 24.32 49.92 54.187 0 29.44-22.187 54.186-49.92 54.186-27.307 0-49.493-24.746-49.493-54.186 0-29.867 21.76-54.187 49.493-54.187z"
                            fill="#343c4d"
                            p-id="1552"
                        ></path>
                    </svg>
                </div>
            </span>
        </div>
    </footer>
</template>
