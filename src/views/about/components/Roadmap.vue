<script setup lang="ts">
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();
  const roadmapstage = computed(() => {
    return [
      {
        stage: 1,
        title: t("roadmap.stage1.title"),
        desc: [
          {
            content: t("roadmap.stage1.desc1"),
            checked: true,
          },
          {
            content: t("roadmap.stage1.desc2"),
            checked: true,
          },
          {
            content: t("roadmap.stage1.desc3"),
            checked: true,
          },
          {
            content: t("roadmap.stage1.desc4"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc5"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc6"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc7"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc8"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc9"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc10"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc11"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc12"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc13"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc14"),
            checked: false,
          },
          {
            content: t("roadmap.stage1.desc15"),
            checked: false,
          },
        ],
      },
      {
        stage: 2,
        title: t("roadmap.stage2.title"),
        desc: [
          {
            content: t("roadmap.stage2.desc1"),
            checked: false,
          },
          {
            content: t("roadmap.stage2.desc2"),
            checked: false,
          },
          {
            content: t("roadmap.stage2.desc3"),
            checked: false,
          },
          {
            content: t("roadmap.stage2.desc4"),
            checked: false,
          },
          {
            content: t("roadmap.stage2.desc5"),
            checked: false,
          },
          {
            content: t("roadmap.stage2.desc6"),
            checked: false,
          },
        ],
      },
      {
        stage: 3,
        title: t("roadmap.stage3.title"),
        desc: [
          {
            content: t("roadmap.stage3.desc1"),
            checked: false,
          },
          {
            content: t("roadmap.stage3.desc2"),
            checked: false,
          },
          {
            content: t("roadmap.stage3.desc3"),
            checked: false,
          },
          {
            content: t("roadmap.stage3.desc4"),
            checked: false,
          },
        ],
      },
      // {
      //   stage: 4,
      //   title: t("roadmap.stage4.title"),
      //   desc: [
      //     {
      //       content: t("roadmap.stage4.desc1"),
      //       checked: false,
      //     }
      //   ],
      // },
    ];
  });
</script>

<template>
  <div>
    <div class="container px-5 py-24 mx-auto flex flex-wrap">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">
          {{ $t("roadmap.title") }}
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          {{ $t("roadmap.desc") }}
        </p>
        <div class="flex mt-6 justify-center">
          <div class="w-16 h-1 rounded-full bg-green-500 inline-flex"></div>
        </div>
      </div>
      <div
        v-for="(item, index) in roadmapstage"
        :key="index"
        class="flex relative pt-5 pb-5 sm:items-center md:w-3/5 mx-auto"
      >
        <div
          class="h-full w-6 absolute inset-0 flex items-center justify-center"
        >
          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div
          class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-green-500 text-white relative z-10 title-font font-medium text-sm"
        >
          {{ item.stage }}
        </div>
        <div
          class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row"
        >
        <div class="flex-shrink-0 w-20 h-20 bg-green-100 text-green-500 rounded-full inline-flex items-center justify-center">
          <svg v-if="item.stage === 1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-12 h-12" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <svg  v-if="item.stage === 2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-12 h-12" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="3"></circle>
            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
          </svg>
          <svg v-if="item.stage === 3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-12 h-12" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
          <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
            <h2 class="font-medium title-font mb-1 text-xl">
              {{ item.title }}
            </h2>
            <p
              v-for="v in item.desc"
              :key="v.content"
              class="leading-relaxed opacity-80  my-4"
            >
              <div v-if="v.checked"
          class="mr-2 flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-green-500 text-white relative z-10 title-font font-medium text-sm"
        >
          <svg t="1649521875024" class="icon w-3 h-3" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2566" width="32" height="32"><path d="M356.7 720.3c-12.8-15.2-10.8-37.9 4.4-50.7l441.2-370.2c15.2-12.8 37.9-10.8 50.7 4.4 12.8 15.2 10.8 37.9-4.4 50.7L407.4 724.7c-15.2 12.8-37.9 10.8-50.7-4.4z" p-id="2567" fill="#ffffff"></path><path d="M406.7 724.7c-15.2 12.8-37.9 10.8-50.7-4.4L170.9 499.6c-12.8-15.2-10.8-37.9 4.4-50.7 15.2-12.8 37.9-10.8 50.7 4.4L411.2 674c12.7 15.2 10.8 37.9-4.5 50.7z" p-id="2568" fill="#ffffff"></path></svg>
        </div>
        <div v-else
          class="mr-2 flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center border border-gray-400 text-white relative z-10 title-font font-medium text-sm"
        >
          -
        </div>

        {{ v.content }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
