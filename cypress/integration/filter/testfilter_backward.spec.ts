/// <reference types="cypress" />

import {
  checkTableData,
  checkTableDataNotExist,
  getTableValue,
  login,
  Session,
} from "../utils";
import {
  clickMenu,
  searchEntity,
  selectInGroupCascader,
  setBasicProperty,
  startSearch,
  getOperator,
  selectConstraint,
  selectInTableDetail,
  removeCondition,
  clickConstraint,
  selectInAggregation,
  checkApi,
  injectApi,
} from "./utils";

describe("The Filter 车主", () => {
  before(() => {
    login();
  });

  beforeEach(() => {
    cy.setCookie("SESSION", Session.value);
    clickMenu(["数据存储", "模型表"]);
    searchEntity("车主");
    getTableValue("车主").click();
    cy.contains("数据列表").click();
    cy.contains("添加条件组").click();
    injectApi();
  });

  it.only("名称包含杰", () => {
    selectInGroupCascader(["属性字段", "名称"]);
    setBasicProperty({ operator: "包含", taKey: "text", value: "杰" });
    startSearch();

    checkApi({
      type: "filter",
      filter: {
        dataTable: "dw_car_owner",
        operator: "contain",
        contain: { value: "杰", field: "_name" },
      },
    });
    cy.contains("杰哥").should("be.visible");
  });

  it("查找 我的爱车 默认选中不为空 -> 为空", () => {
    selectInGroupCascader(["属性字段", "我的爱车"]);

    getOperator().contains("不为空").should("be.visible");
    cy.contains("特斯拉").should("be.visible");

    startSearch();

    checkApi({
      type: "filter",
      filter: {
        dataTable: "dw_car_owner",
        operator: "notEmpty",
        notEmpty: { field: "my_car" },
      },
    });

    checkTableData(["杰哥", "龙哥"]);

    setBasicProperty({ operator: "为空" });
    startSearch();

    checkApi({
      type: "filter",
      filter: {
        dataTable: "dw_car_owner",
        operator: "empty",
        notEmpty: { field: "my_car" },
      },
    });

    checkTableData(["曹立"]);
  });

  it("查找 我的爱车 业务单据 状态成功", () => {
    selectInGroupCascader(["属性字段", "我的爱车"]);
    selectConstraint("业务单据");

    selectInGroupCascader(["商品名称"], ["业务单据"]);
    selectInGroupCascader(["状态"], ["业务单据", "属性字段"]);

    setBasicProperty({
      taKey: "text",
      value: "成功",
      parentKeys: ["业务单据", "属性字段"],
    });

    startSearch();

    checkApi({
      type: "filter",
      filter: {
        dataTable: "dw_car",
        relationship: {
          destinationField: "_id",
          sourceTable: "dw_car_owner",
          sourceField: "my_car",
          relationType: "lookup",
        },
        type: "forwardRelationQuery",
        forwardRelationQuery: {
          dataTable: "dw_deal_detail_line",
          relationship: {
            destinationTable: "dw_car",
            destinationField: "_id",
            sourceField: "ticket",
            relationType: "lookup",
          },
          type: "backwardRelationQuery",
          backwardRelationQuery: {
            logicalOperator: "and",
            type: "logicalOperator",
            filters: [
              {
                type: "filter",
                filter: {
                  dataTable: "dw_deal_detail_line",
                  operator: "between",
                  between: {
                    fieldExpression:
                      "date_trunc('DAY', from_utc_timestamp($_date_happened,'Asia/Shanghai'))",
                    fieldExpressionValueLeft:
                      "date_trunc('WEEK',date_sub(from_utc_timestamp(now(),'Asia/Shanghai'),7))",
                    fieldExpressionValueRight:
                      "date_trunc('WEEK', from_utc_timestamp(now(),'Asia/Shanghai'))",
                    field: "_date_happened",
                  },
                },
              },
              {
                type: "filter",
                filter: {
                  dataTable: "dw_deal_detail_line",
                  operator: "equal",
                  equal: { value: "成功", field: "_status" },
                },
              },
            ],
          },
        },
      },
    });

    checkTableData(["杰哥"]);

    selectConstraint("统计指标", ["业务单据"]);
    selectInGroupCascader(["发生时间"], ["业务单据", "统计指标"]);
    setBasicProperty({
      operator: "为空",
      parentKeys: ["业务单据", "统计指标"],
    });

    startSearch();
    checkTableDataNotExist(["杰哥"]);
  });

  it("标签 有钱", () => {
    selectInGroupCascader(["标签"]);
    selectInTableDetail("有钱");
    removeCondition(["属性字段"]);
    startSearch();
    checkTableData(["杰哥"]);
  });

  it("（反查-查找-普通） 买卖关系 车主不为空", () => {
    selectInGroupCascader(["其他关联表", "买卖关系"]);
    selectInGroupCascader(["车主"], ["属性字段"]);
    clickConstraint(["属性字段"]);
    selectInGroupCascader(["名称"], ["属性字段", "属性字段"]);

    setBasicProperty({
      parentKeys: ["属性字段"],
      taKey: "text",
      value: "龙哥",
    });

    startSearch();
    checkTableData(["龙哥"]);
  });

  it("（反查-普通）买卖关系 车主不为空", () => {
    selectInGroupCascader(["其他关联表", "买卖关系"]);

    selectInGroupCascader(["关系名称"], ["属性字段"]);

    setBasicProperty({
      operator: "包含",
      taKey: "text",
      value: "第二次",
    });
    startSearch();
    checkTableData(["杰哥"]);
  });

  it("（查找-查找）客户 销售 经销商", () => {
    selectInGroupCascader(["属性字段", "所属销售"]);
    selectConstraint("属性字段");
    selectInGroupCascader(["所属经销商"], ["属性字段"]);
    clickConstraint(["属性字段"]);
    selectInGroupCascader(["名称"], ["属性字段", "属性字段"]);
    setBasicProperty({
      operator: "包含",
      parentKeys: ["属性字段", "属性字段"],
      taKey: "text",
      value: "一店",
    });

    startSearch();
    checkTableData(["杰哥"]);
  });

  it("（反查-查找）车主 关注公众号", () => {
    selectInGroupCascader(["行为事件", "售前相关事件"]);
    selectInTableDetail("关注公众号");
    selectConstraint("统计指标");
    removeCondition(["属性字段"]);

    selectInAggregation("COUNT(次数)");

    setBasicProperty({
      operator: "大于(含)",
      parentKeys: ["统计指标"],
      taKey: "number",
      value: "1",
    });

    startSearch();
    checkTableData(["曹立"]);
  });

  it("（查找-反查）车主 公司 业务单据", () => {
    selectInGroupCascader(["属性字段", "上家公司"]);
    selectConstraint("业务单据");
    selectInGroupCascader(["买车车"], ["业务单据"]);
    selectInGroupCascader(["状态"], ["业务单据", "属性字段"]);
    setBasicProperty({
      parentKeys: ["属性字段"],
      taKey: "text",
      value: "成功",
    });
    startSearch();
    checkTableData(["麦麦"]);
  });

  it("（查找-反查）销售 经销商 订单", () => {
    clickMenu(["数据存储", "模型表"]);
    searchEntity("销售");
    cy.get(`[data-row-key="dw_sales"]`).contains("销售").click();
    cy.contains("数据列表").click();
    cy.contains("添加条件组").click();

    selectInGroupCascader(["属性字段", "所属经销商"]);
    selectConstraint("业务单据");
    selectInGroupCascader(["流水账"], ["业务单据"]);
    selectConstraint("统计指标", ["业务单据"]);
    removeCondition(["业务单据", "属性字段"]);
    selectInAggregation("COUNT(次数");

    setBasicProperty({
      operator: "大于(含)",
      parentKeys: ["业务单据", "统计指标"],
      taKey: "number",
      value: "1",
    });
    startSearch();
    checkTableData(["小包"]);
  });
});
