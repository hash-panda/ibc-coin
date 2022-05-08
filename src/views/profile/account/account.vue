<script setup lang="ts">
import { computed, onMounted, ref, h, reactive } from 'vue'
import txAction from '@/const/txAction'
import Vote from '../components/Vote.vue'
import Send from '../components/Send.vue'
import Delegate from '../components/Delegate.vue'
import Undelegate from '../components/Undelegate.vue'
import BeginRedelegate from '../components/BeginRedelegate.vue'
import Receive from '../components/Receive.vue'
import IBCTransfer from '../components/IBCTransfer.vue'
import IBCReceived from '../components/IBCReceived.vue'
import MultiSend from '../components/MultiSend.vue'
import GetReward from '../components/GetReward.vue'
import { useRouter } from 'vue-router'
import { CloseCircleOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'

const props = defineProps({
    address: {
        type: String,
    },
})
const { t } = useI18n()
const router = useRouter()
const currentAction = ref(Vote)

const allTxActions = reactive([
    {
        action: txAction.Vote,
        component: Vote,
        label: t('account.radio.option.vote'),
    },
    {
        action: txAction.Delegate,
        component: Delegate,
        label: t('account.radio.option.delegate'),
    },
    {
        action: txAction.Undelegate,
        component: Undelegate,
        label: t('account.radio.option.undelegate'),
    },
    {
        action: txAction.BeginRedelegate,
        component: BeginRedelegate,
        label: t('account.radio.option.beginRedelegate'),
    },
    {
        action: txAction.Send,
        component: Send,
        label: t('account.radio.option.send'),
    },
    {
        action: txAction.Receive,
        component: Receive,
        label: t('account.radio.option.receive'),
    },
    // {
    //     action: txAction.IBCTransfer,
    //     component: IBCTransfer,
    //     label: 'IBCTransfer',
    // },
    // {
    //     action: txAction.IBCReceived,
    //     component: IBCReceived,
    //     label: 'IBCReceived',
    // },
    // {
    //     action: txAction.MultiSend,
    //     component: MultiSend,
    //     label: 'MultiSend',
    // },
    // {
    //     action: txAction.GetReward,
    //     component: GetReward,
    //     label: 'GetReward',
    // },
])

const backPage = () => {
    router.go(-1)
}
</script>
<template>
    <div class="m-5">
        <div class="fixed right-4 top-18 z-30">
            <n-icon @click="backPage" class="hover:text-primary" :component="CloseCircleOutline" size="30" :depth="2" />
        </div>
        <n-space vertical size="large">
            <n-radio-group v-model:value="currentAction" name="actionRadio" size="large">
                <n-radio-button v-for="action in allTxActions" :key="action.component" :value="action.component">
                    {{ action.label }}
                </n-radio-button>
            </n-radio-group>
            <keep-alive>
                <component :is="currentAction" :key="currentAction" :address="props.address" />
            </keep-alive>
        </n-space>
    </div>
</template>
