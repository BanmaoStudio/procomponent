export interface LinkDiagramProps {
  /**
   * @description 图谱数据
   */
  data: any;
  /**
   * @description 图谱宽度
   */
  width?: number;
  /**
   * @description 图谱高度
   */
  height?: number;
  /**
   * @description 图谱边距
   */
  margin?: number;
}

/**
 * @description 图谱数据 -- 加油站数据图谱
 */
export interface LinkDiagramData {
    /**
     * @description 图谱名称
     */
    name: string;
    /**
     * @description 图谱数据
     */
    data: {[key: string]: number};
    /**
     * @description 图谱备注
     */
    remark?: string | string[];
    /**
     * @description 油罐油品对应关系
     */
    oilTypeForOilTankRelation: OilTypeForOilTankRelation[]
    /**
     * @description 油罐油枪对应关系
     */
    oilTankForOilGunRelation: OilTankForOilGunRelation[];
}

/**
 * @description 油罐油品对应关系
 */
export interface OilTypeForOilTankRelation {
    /**
     * @description 油品
     */
    oilType: string;
    /**
     * @description 油罐
     */
    tank: string;
}

export interface OilTankForOilGunRelation {
    /**
     * @description 油枪
     */
    gun: string;
    /**
     * @description 油罐
     */
    tank: string;
    /**
     * @description 加油机
     */
    fuelDispenser: string;
    /**
     * @description ID
     */
    id: number;
}