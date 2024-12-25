// import { EnumResponseCode } from '@/enums/responseCode'
import { OptionsType } from './types'
import { computed, onMounted, ref } from 'vue'
import { useExportFile } from '../useExportRemoteFile'
import { useMessage } from 'naive-ui'
// import { getPagination } from '@/utils'

export function useList<
    T extends (...args: any) => Promise<any>
>(listRequestFn: T, options: OptionsType = {}) {
    const {
        exportRequestFn,
        filterOption = ref(),
        callback,
        immediate = true,
        code = 200
    } = options

    // 加载态
    const loading = ref(false)
    const pagination = ref({
        page: 1,
        pageSize: 10,
        itemCount: 0,
        showSizePicker: true,
        pageSizes: [10, 20, 30, 40],
        showQuickJumper: true,
        prefix: (info) => `共 ${info.itemCount} 条`
    })
    // 数据
    const dataSource = ref<any[]>([])

    const searchParams = computed(() => {
        return filterOption.value
    })

    /**
     * 加载数据
     * @param page - 当前页
     * @param pageSize - 页数
     */
    const loadData = async (
        page = pagination.value.page,
        filterParams?: any
    ) => {
        loading.value = true
        try {
            const { status, data } = await listRequestFn({
                pageNum: page,
                pageSize: pagination.value.pageSize,
                ...searchParams.value,
                ...filterParams
            })

            const { list, pageNum, total, pageSize } =
                (callback && callback(data)) || data
            if (status === code && Array.isArray(list)) {
                dataSource.value = list
                pagination.value = {
                    ...pagination.value,
                    page: pageNum,
                    itemCount: total,
                    pageSize: pageSize
                }
            } else {
                dataSource.value = []
                pagination.value = {
                    ...pagination.value,
                    pageSize: 10,
                    itemCount: 0,
                    page: 1
                }
                throw new Error('list的数据类型错误')
            }
        } catch (error) {
            console.error('Error in loadData:', error)
            throw error
        } finally {
            loading.value = false
        }
    }

    const message = useMessage()
    /**
     * 导出文件
     */
    const handleExcelData = async () => {
        if (!exportRequestFn || typeof exportRequestFn !== 'function') {
            throw new Error('当前没有提供exportRequest函数')
        }
        try {
            const { data, fileName } = await exportRequestFn(filterOption.value)
            useExportFile(data, fileName)
            message?.success('成功导出')
        } catch (error) {
            console.error('Error in handleExcelData:', error)
            throw error
        }
    }

    /**
     * 更新分页并加载数据
     * @param page - 当前页
     * @param pageSize - 每页条数
     */
    const updatePaginationAndLoadData = (page: number, pageSize?: number) => {
        if (pageSize !== undefined) {
            pagination.value.pageSize = pageSize
        }
        loadData(page)
    }

    const handlePageChange = (page: number) => {
        updatePaginationAndLoadData(page)
    }

    const handlePageSizeChange = (pageSize: number) => {
        updatePaginationAndLoadData(1, pageSize)
    }

    onMounted(() => immediate && loadData(pagination.value.page))

    return {
        dataSource,
        loading,
        pagination,
        handleExcelData,
        handlePageChange,
        handlePageSizeChange,
        loadData
    }
}

export default useList
