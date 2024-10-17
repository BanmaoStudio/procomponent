/***************************************
 * map 组件 helper 函数
 * @version v0.0.1
 * @author banmao
 */
import { formatNumber } from '../../../../utils'


/**
 * 通过模块批量注册地图到 echarts 中
 * @param modules - 包含地图数据的模块对象
 * @param echarts - echarts 实例
 * @returns 注册的地图数据数组
 */
export function handleRegisterMapByModules(modules, echarts) {
    const mapData: { name: string; item: any }[] = []; // 用于存储注册的地图数据

    // 遍历 modules 对象的所有键
    for (const key in modules) {
        // 使用正则表达式匹配键名中的 6 位数字
        const match = key.match(/\d{6}/);
        if (match) {
            const name = match[0]; // 提取地图名称
            const item = modules[key].default; // 提取地图数据
            // 将地图注册到 echarts 中
            echarts.registerMap(name, item);
            // 将地图数据添加到 mapData 数组中
            mapData.push({ name, item });
        }
    }

    return mapData; // 返回注册的地图数据数组
};


/**
 * 获取机器离线状态颜色
 * @param off number - 离线机器数量
 * @param total number - 机器总数量
 * @returns 表示机器离线状态的颜色
 */
export function getMachineOfflineStatusColor(off: number, total: number) {
    // 如果总机器数量为 0，则返回默认颜色
    if (total === 0) {
        return '#333';
    }

    // 计算离线机器的百分比
    const percentNum = off / total;


    // 根据离线百分比返回不同的颜色
    if (percentNum === 0) {
        // 没有机器离线，返回绿色
        return '#3ac569';
    } else if (percentNum < 0.33) {
        // 离线机器百分比在 0 到 0.33 之间，返回黄色
        return '#fbd14b';
    } else if (percentNum < 0.66) {
        // 离线机器百分比在 0.33 到 0.66 之间，返回橙色
        return '#fc913a';
    } else if (percentNum < 0.9) {
        // 离线机器百分比在 0.66 到 0.9 之间，返回红色
        return '#f5363d';
    } else {
        // 离线机器百分比在 0.9 到 1 之间，返回深紫色
        return '#492540';
    }
};


/**
 * 自定义提示框的格式化函数
 * @param params - 包含图表数据的参数对象
 * @returns 格式化后的提示信息
 */
export function getTooltipFormatterCustom(params: any) {
    const type = params.seriesType
    if (type === 'effectScatter') {
        return `
                    ${params.name} <br/>
                    地址：${params.data.address} <br />
                    出油油量：${formatNumber(params.data.output_sum, { decimals: 2 })}L<br />
                    出油金额：${formatNumber(params.data.output_amount, { decimals: 2 })}元<br />
                    销售油量：${formatNumber(params.data.sale_amount, { decimals: 2 })}L<br />
                    销售油金额：${formatNumber(params.data.sale_sum, { decimals: 2 })}元<br />
                    <hr />
                    设备离线数/总数：${params.data.machine_offline_count}/${params.data.machine_total_count}
                  `
    }
    return `${params.name} <br /> ${params.marker} 加油站数量：${params.value}`
}