/// <reference types="cypress" />

import { login, gotToComputeValueTraitDetail } from "./utils";

describe("计算值标签 - 限制条件", () => {
  beforeEach(() => {
    login();
    gotToComputeValueTraitDetail();

    cy.contains("编辑公式").click();
    cy.contains("添加变量").click();
  });

  it("查找-反查-属性字段", () => {
    selectField([
      ["属性字段", "做过的蠢事"],
      ["其他关联表", "我做了"],
      ["名称"],
    ]);

    selectFilter({ id: 1, tableName: "我做了" });

    verifyFilterCondition({
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
      filters: {
        type: "filter",
        filter: {
          dataTable: "dw_customer",
        },
      },
    });
  });

  it("反查-属性字段 -> 切换属性字段", () => {
    selectField([
      ["其他关联表", "人-酒店关系"],
      ["属性字段", "名称"],
    ]);

    selectFilter({ id: 1, tableName: "人-酒店关系" });

    verifyFilterCondition({
      field: "_name",
      dataTable: "dw_cust_hotel",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "_related_id1",
        relationType: "lookup",
      },
      filters: {
        type: "filter",
        filter: {
          dataTable: "dw_cust_hotel",
        },
      },
      sortField: "",
    });

    selectField([["属性字段", "id"]], 2);

    verifyFilterCondition({
      field: "_id",
      dataTable: "dw_cust_hotel",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "_related_id1",
        relationType: "lookup",
      },
      filters: {
        type: "filter",
        filter: {
          dataTable: "dw_cust_hotel",
        },
      },
      sortField: "",
    });
  });

  it("反查-属性字段 -> 切换反查", () => {
    selectField([
      ["其他关联表", "人-酒店关系"],
      ["属性字段", "名称"],
    ]);

    selectFilter({ id: 1, tableName: "人-酒店关系" });

    verifyFilterCondition({
      field: "_name",
      dataTable: "dw_cust_hotel",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "_related_id1",
        relationType: "lookup",
      },
      filters: {
        type: "filter",
        filter: {
          dataTable: "dw_cust_hotel",
        },
      },
      sortField: "",
    });

    selectField([
      ["其他关联表", "客户的dw_g_profile"],
      ["属性字段", "名称"],
    ]);

    verifyFilterCondition({
      field: "_name",
      dataTable: "dw_g_profile",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "txt1",
        relationType: "lookup",
      },
      sortField: "",
    });

    selectFilter({ id: 1, tableName: "客户的dw_g_profile" });

    verifyFilterCondition({
      field: "_name",
      dataTable: "dw_g_profile",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "txt1",
        relationType: "lookup",
      },
      filters: {
        type: "filter",
        filter: {
          dataTable: "dw_g_profile",
        },
      },
      sortField: "",
    });
  });

  it("反查-属性字段 -> 切换查找关联", () => {
    selectField([
      ["其他关联表", "人-酒店关系"],
      ["属性字段", "名称"],
    ]);

    selectFilter({ id: 1, tableName: "人-酒店关系" });

    verifyFilterCondition({
      field: "_name",
      dataTable: "dw_cust_hotel",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "_related_id1",
        relationType: "lookup",
      },
      filters: {
        type: "filter",
        filter: {
          dataTable: "dw_cust_hotel",
        },
      },
      sortField: "",
    });

    selectField([["属性字段", "客户信息"], ["邮箱"]], 2);

    verifyFilterCondition({
      field: "",
      dataTable: "dw_cust_hotel",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "_related_id1",
        relationType: "lookup",
      },
      filters: {
        type: "filter",
        filter: {
          dataTable: "dw_cust_hotel",
        },
      },
      variable: {
        field: "_email",
        dataTable: "dw_customer",
        relationship: {
          destinationField: "_id",
          sourceTable: "dw_cust_hotel",
          sourceField: "_related_id1",
          relationType: "lookup",
        },
      },
      sortField: "",
    });
  });

  it("反查-反查-属性字段 -> 切换第二层反查", () => {
    selectField([
      ["其他关联表", "客户的dw_g_profile"],
      ["其他关联表", "test"],
      ["名称"],
    ]);

    verifyFilterCondition({
      field: "",
      dataTable: "dw_g_profile",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "txt1",
        relationType: "lookup",
      },
      variable: {
        field: "_name",
        dataTable: "dw_test",
        relationship: {
          destinationTable: "dw_g_profile",
          destinationField: "_id",
          sourceField: "_related_id1",
          relationType: "lookup",
        },
      },
      sortField: "",
    });

    selectFilter({ id: 1, tableName: "客户的dw_g_profile" });
    selectFilter({ id: 2, tableName: "test" });

    verifyFilterCondition({
      field: "",
      dataTable: "dw_g_profile",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "txt1",
        relationType: "lookup",
      },
      filters: {
        type: "filter",
        filter: {
          dataTable: "dw_g_profile",
        },
      },
      variable: {
        field: "_name",
        dataTable: "dw_test",
        relationship: {
          destinationTable: "dw_g_profile",
          destinationField: "_id",
          sourceField: "_related_id1",
          relationType: "lookup",
        },
        filters: {
          type: "filter",
          filter: {
            dataTable: "dw_test",
          },
        },
      },
      sortField: "",
    });

    selectField([["其他关联表", "name2"], ["名称"]], 2);

    verifyFilterCondition({
      field: "",
      dataTable: "dw_g_profile",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "txt1",
        relationType: "lookup",
      },
      filters: {
        type: "filter",
        filter: {
          dataTable: "dw_g_profile",
        },
      },
      variable: {
        field: "_name",
        dataTable: "dw_relationship",
        relationship: {
          destinationTable: "dw_g_profile",
          destinationField: "_id",
          sourceField: "_related_id2",
          relationType: "lookup",
        },
      },
      sortField: "",
    });

    selectField([["属性字段", "档案号"]], 2);
    verifyFilterCondition({
      field: "txt2",
      dataTable: "dw_g_profile",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "txt1",
        relationType: "lookup",
      },
      filters: {
        type: "filter",
        filter: {
          dataTable: "dw_g_profile",
        },
      },
      sortField: "",
    });

    selectField([["属性字段", "邮箱"]]);
    verifyFilterCondition({
      dataTable: "dw_customer",
      field: "_email",
    });
  });
});

function selectField(clickValues: string[][], startFrom = 1) {
  let i = startFrom;
  for (const values of clickValues) {
    cy.get(`[data-test-id="field-part-${i}"]`).click();
    // const menu = cy.get(`.field-part-${i}-pop-up`);
    // menu.should("be.visible");
    for (const value of values) {
      cy.get(`.field-part-${i}-pop-up`).contains(value).click();
      //   cy.get(`.field-part-${i}-pop-up`).find(`[title="${value}"]`).click();
    }
    cy.get(`.field-part-${i}-pop-up`).should("not.be.visible");

    i++;
  }
}

function getFilter(id: number) {
  return cy.get(`[data-test-id="constraint-filter-${id}"]`);
}

function selectFilter({ id, tableName }: { id: number; tableName }) {
  getFilter(id).click();
  getFilter(id).contains(tableName).should("be.visible");
  getFilter(id).contains("添加条件组").click();
}

function verifyFilterCondition(data) {
  cy.get("#data").should("have.text", JSON.stringify(data, null, 2));
}
