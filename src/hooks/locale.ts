import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default function useLocale() {
    const i18 = useI18n()
    const currentLocale = computed(() => {
        return i18.locale.value
    })
    const changeLocale = (value: string) => {
        i18.locale.value = value
        // window.$message.success(i18.t('navbar.action.locale'), { duration: 1000 });
    }
    return {
        currentLocale,
        changeLocale,
    }
}
