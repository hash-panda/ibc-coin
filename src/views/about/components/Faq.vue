<script setup>
  import { computed } from "vue";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();
  const faqList = computed(() => {
    return [
      {
        ask: t("faq.question1.ask"),
        answer: t("faq.question1.answer"),
      },
      {
        ask: t("faq.question2.ask"),
        answer: t("faq.question2.answer"),
      },
      {
        ask: t("faq.question3.ask"),
        answer: t("faq.question3.answer"),
      },
      {
        ask: t("faq.question4.ask"),
        answer: t("faq.question4.answer"),
      },
    ];
  });
</script>
<template>
  <div class="container px-5 lg:px-24 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4">
        {{ $t("faq.title") }}
      </h1>
      <!-- <p class="lg:w-2/3 mx-auto leading-relaxed text-base"></p> -->
      <div class="flex mt-6 justify-center">
        <div class="w-16 h-1 rounded-full bg-green-500 inline-flex"></div>
      </div>
    </div>
    <div class="flex flex-wrap -m-12">
      <div
        v-for="(item, index) in faqList"
        :key="index"
        class="px-12 md:w-1/2 flex flex-col items-start"
      >
        <h2 class="text-xl title-font font-medium mt-4 mb-4 hover:text-primary">
          {{ item.ask }}
        </h2>
        <p class="leading-relaxed mb-8 opacity-60">
          {{ item.answer }}
        </p>
      </div>
    </div>
  </div>
</template>
