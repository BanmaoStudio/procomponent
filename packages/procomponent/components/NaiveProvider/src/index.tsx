import { NLoadingBarProvider, NMessageProvider, NModalProvider, NNotificationProvider } from 'naive-ui'

export default defineComponent({
    name: 'NaiveProvider',
    setup() {
        return (
            <NLoadingBarProvider>
                <NMessageProvider>
                    <NNotificationProvider>
                        <NModalProvider>
                            <slot />
                        </NModalProvider>
                    </NNotificationProvider>
                </NMessageProvider>
            </NLoadingBarProvider>
        )
    }
})
