/// <reference types="cypress" />

import { login, gotToComputeValueTraitDetail } from "./utils";

describe("计算值标签", () => {
  beforeEach(() => {
    login();
    gotToComputeValueTraitDetail();

    cy.contains("编辑公式").click();
    cy.contains("添加变量").click();
  });

  it("属性字段 邮箱", () => {
    testTemplate({
      clickValues: [["属性字段", "邮箱"]],
      data: {
        dataTable: "dw_customer",
        field: "_email",
      },
    });
  });

  it("查找-属性字段", () => {
    testTemplate({
      clickValues: [
        ["属性字段", "做过的蠢事"],
        ["属性字段", "创建批次"],
      ],
      data: {
        field: "batch_id",
        dataTable: "dw_test_event",
        relationship: {
          destinationField: "_id",
          sourceTable: "dw_customer",
          sourceField: "dummy",
          relationType: "lookup",
        },
        sortField: "",
      },
    });
  });

  it.only("查找-查找-属性字段", () => {
    testTemplate({
      clickValues: [
        ["属性字段", "可用门店"],
        ["属性字段", "车辆"],
        ["创建批次"],
      ],
      data: {
        field: "",
        dataTable: "store",
        relationship: {
          destinationField: "_id",
          sourceTable: "dw_hotel",
          sourceField: "store",
          relationType: "lookup",
        },
        variable: {
          field: "batch_id",
          dataTable: "dw_buy_car",
          relationship: {
            destinationField: "_id",
            sourceTable: "store",
            sourceField: "car",
            relationType: "lookup",
          },
        },
        sortField: "",
      },
    });
  });

  it("查找-反查-属性字段", () => {
    testTemplate({
      clickValues: [
        ["属性字段", "做过的蠢事"],
        ["其他关联表", "我做了"],
        ["名称"],
      ],
      data: {
        field: "",
        dataTable: "dw_test_event",
        relationship: {
          destinationField: "_id",
          sourceTable: "dw_customer",
          sourceField: "dummy",
          relationType: "lookup",
        },
        variable: {
          field: "_name",
          dataTable: "dw_customer",
          relationship: {
            destinationTable: "dw_test_event",
            destinationField: "_id",
            sourceField: "dummy",
            relationType: "lookup",
          },
        },
        sortField: "",
      },
    });
  });

  it("反查-属性字段", () => {
    testTemplate({
      clickValues: [
        ["其他关联表", "人-酒店关系"],
        ["属性字段", "名称"],
      ],
      data: {
        field: "_name",
        dataTable: "dw_cust_hotel",
        relationship: {
          destinationTable: "dw_customer",
          destinationField: "_id",
          sourceField: "_related_id1",
          relationType: "lookup",
        },
        sortField: "",
      },
    });
  });

  it("反查-查找-属性字段", () => {
    testTemplate({
      clickValues: [
        ["其他关联表", "人-酒店关系"],
        ["属性字段", "客户信息"],
        ["系统创建时间"],
      ],
      data: {
        field: "",
        dataTable: "dw_cust_hotel",
        relationship: {
          destinationTable: "dw_customer",
          destinationField: "_id",
          sourceField: "_related_id1",
          relationType: "lookup",
        },
        variable: {
          field: "_date_created",
          dataTable: "dw_customer",
          relationship: {
            destinationField: "_id",
            sourceTable: "dw_cust_hotel",
            sourceField: "_related_id1",
            relationType: "lookup",
          },
        },
        sortField: "",
      },
    });
  });

  it("反查-反查-属性字段", () => {
    testTemplate({
      clickValues: [
        ["其他关联表", "客户的dw_g_profile"],
        ["其他关联表", "name2"],
        ["系统创建时间"],
      ],
      data: {
        field: "",
        dataTable: "dw_g_profile",
        relationship: {
          destinationTable: "dw_customer",
          destinationField: "_id",
          sourceField: "txt1",
          relationType: "lookup",
        },
        variable: {
          field: "_date_created",
          dataTable: "dw_relationship",
          relationship: {
            destinationTable: "dw_g_profile",
            destinationField: "_id",
            sourceField: "_related_id2",
            relationType: "lookup",
          },
        },
        sortField: "",
      },
    });
  });
});

function testTemplate({
  clickValues,
  data,
}: {
  clickValues: string[][];
  data: any;
}) {
  let i = 1;
  for (const values of clickValues) {
    cy.get(`:nth-child(${i}) > .ant-cascader-picker > .ant-input`).should(
      "be.visible"
    );
    cy.get(`:nth-child(${i}) > .ant-cascader-picker > .ant-input`).click();

    for (const value of values) {
      cy.get(".ant-cascader-menus:not(.ant-cascader-menus-hidden)")
        .contains(value)
        .click();
    }

    i++;
  }

  cy.get("#data").should("have.text", JSON.stringify(data, null, 2));
}
