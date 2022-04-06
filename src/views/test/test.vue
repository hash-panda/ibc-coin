<template>
    <div class="load-more-container">
        <NSpin class="load-more-container__list" :show="refreshing">
            <NList bordered>
                <NListItem v-for="item in dataList" :key="item.id">
                    <template #prefix>
                        <NAvatar>{{ item.name[0] }}</NAvatar>
                    </template>
                    <template #suffix>
                        <span class="load-more-container__list-suffix">{{ item.job }}</span>
                    </template>
                    {{ item.name }}
                </NListItem>
            </NList>
        </NSpin>

        <NSpace class="load-more-container__page" justify="center">
            <NButton type="primary" :disabled="noMore" :loading="loadingMore" @click="loadMore">
                {{ noMore ? 'No more data' : 'Load more' }}
            </NButton>
            <NButton :loading="refreshing" @click="refresh">Refresh</NButton>
        </NSpace>
    </div>
</template>

<script lang="ts">
import { NAvatar, NButton, NList, NListItem, NSpace, NSpin } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useLoadMore } from 'vue-request'

type Data = {
    data: {
        id: number
        name: string
        avatar: string
        job: string
    }[]
    total: number
}
function testService(params: { data?: Data; dataList?: Data['data'] }) {
    const p = { limit: 10 }
    if (params?.dataList?.length !== undefined) {
        p['page'] = params.dataList.length / p.limit + 1
    } else {
        p['page'] = 1
    }
    return {
        url: `https://61273138c2e8920017bc0b3c.mockapi.io/api/users?${new URLSearchParams(p as any)}`,
    }
}

export default defineComponent({
    name: 'LoadMore',
    components: {
        NList,
        NListItem,
        NButton,
        NSpin,
        NAvatar,
        NSpace,
    },
    setup() {
        const { data, loadingMore, dataList, refreshing, loadMore, refresh } = useLoadMore<Data, Parameters<typeof testService>, Data['data']>(
            testService,
            {
                listKey: 'data',
            },
        )

        const noMore = computed(() => dataList.value.length === data.value?.total)

        return {
            dataList,
            loadingMore,
            loadMore,
            data,
            noMore,
            refreshing,
            refresh,
        }
    },
})
</script>

<style scoped lang="scss"></style>
