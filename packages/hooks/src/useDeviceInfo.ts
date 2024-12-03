import { UAParser } from 'ua-parser-js'

/**
 * 单例模式下的 UAParser 实例管理
 */
const parserInstance = (function() {
    let instance: UAParser | null = null
    const initializing: Promise<UAParser> = (async () => {
        try {
            instance = new UAParser()
            return instance
        } catch (error) {
            console.error('Failed to initialize UAParser:', error)
            throw error
        }
    })()

    return {
        /**
         * 获取 UAParser 实例
         * @returns 返回 {Promise<UAParser>} 解析用户代理字符串的实例
         */
        getInstance: async () => {
            if (!instance) {
                instance = await initializing
            }
            return instance
        }
    }
})()

/**
 * 使用设备信息钩子
 * 该钩子用于获取客户端设备的信息，如浏览器类型、操作系统等
 * 它基于UAParser实例来解析用户代理字符串
 * 
 * @returns {Object} 返回解析后的设备信息对象
 */
export const useDeviceInfo = async () => {
    const instance = await parserInstance.getInstance()
    return instance.getResult()
}
