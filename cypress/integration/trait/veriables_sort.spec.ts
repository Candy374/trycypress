/// <reference types="cypress" />

import { login } from "../utils";
import { gotToComputeValueTraitDetail } from "./utils";

describe("计算值标签- 排序字段", () => {
  beforeEach(() => {
    login();
    gotToComputeValueTraitDetail();

    cy.contains("编辑公式").click();
    cy.contains("添加变量").click();
  });

  it("属性字段 邮箱", () => {
    testSortFieldTemplate({
      clickValues: [["属性字段", "邮箱"]],
      sortField: "",
      data: {
        dataTable: "dw_customer",
        field: "_email",
      },
    });
  });

  it("查找-属性字段", () => {
    testSortFieldTemplate({
      clickValues: [
        ["属性字段", "做过的蠢事"],
        ["属性字段", "创建批次"],
      ],
      sortField: "",
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

  it("查找-反查-属性字段", () => {
    testSortFieldTemplate({
      clickValues: [
        ["属性字段", "做过的蠢事"],
        ["其他关联表", "我做了"],
        ["名称"],
      ],
      sortField: "邮箱",
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
          sortField: "_email",
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

    testSortFieldTemplate({
      clickValues: [["属性字段", "所属顾问"]],
      sortField: "",
      data: {
        dataTable: "dw_customer",
        field: "sale_id",
      },
    });
  });

  it("反查-属性字段 -> 反查-查找-属性字段(清空) -> add sort", () => {
    testSortFieldTemplate({
      clickValues: [
        ["其他关联表", "人-酒店关系"],
        ["属性字段", "名称"],
      ],
      sortField: "id",
      data: {
        field: "_name",
        dataTable: "dw_cust_hotel",
        relationship: {
          destinationTable: "dw_customer",
          destinationField: "_id",
          sourceField: "_related_id1",
          relationType: "lookup",
        },
        sortField: "_id",
      },
    });

    testSortFieldTemplate({
      clickValues: [
        ["其他关联表", "人-酒店关系"],
        ["属性字段", "客户信息"],
        ["最后更新批次"],
      ],
      sortField: "",
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
          field: "_last_updated_batch_id",
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

    clickSortField("头像");
    verifySortField({
      field: "",
      dataTable: "dw_cust_hotel",
      relationship: {
        destinationTable: "dw_customer",
        destinationField: "_id",
        sourceField: "_related_id1",
        relationType: "lookup",
      },
      variable: {
        sortField: "_img",
        field: "_last_updated_batch_id",
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

  it("反查-查找-属性字段", () => {
    testSortFieldTemplate({
      clickValues: [
        ["其他关联表", "人-酒店关系"],
        ["属性字段", "客户信息"],
        ["系统创建时间"],
      ],
      sortField: "头像",
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
          sortField: "_img",
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
    testSortFieldTemplate({
      clickValues: [
        ["其他关联表", "客户的dw_g_profile"],
        ["其他关联表", "test"],
        ["最后更新时间"],
      ],
      sortField: "创建人",
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
          field: "_last_updated",
          sortField: "_creator_id",
          dataTable: "dw_test",
          relationship: {
            destinationTable: "dw_g_profile",
            destinationField: "_id",
            sourceField: "_related_id1",
            relationType: "lookup",
          },
        },
        sortField: "",
      },
    });
  });
});

function verifySortField(data) {
  cy.get("#data").should(($div) => {
    const text = $div.text();

    expect(JSON.parse(text)).to.deep.eq(data);
  });
}

function testSortFieldTemplate({
  clickValues,
  data,
  sortField,
}: {
  clickValues: string[][];
  data: any;
  sortField: string;
}) {
  let i = 1;
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

  if (sortField) {
    clickSortField(sortField);
  } else {
    // cy.contains("排序字段").should("not.be.visible");
  }

  verifySortField(data);
}

function clickSortField(sortField: string) {
  cy.contains("排序字段").should("be.visible");
  cy.get('[data-test-id="sort-field"]').click();
  cy.get(".ant-cascader-menus:not(.ant-cascader-menus-hidden)")
    .contains(sortField)
    .click();
}
