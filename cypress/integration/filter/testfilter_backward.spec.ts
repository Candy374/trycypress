/// <reference types="cypress" />

import { login } from "../utils";

before(() => {
  login();

  cy.contains("吉利汽车").click();
  cy.contains("前端UI自动化").click();
  cy.window().then((window) => {
    window.location.hash = "/ws/ui_automation/dwData/dw_car_owner/list_page";
  });
  cy.wait(3000);
  cy.contains("添加条件组").click();
});

describe("The Filter level2", () => {
  it("名称包含杰", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["属性字段", "名称"]);
    selectOperator("包含");

    cy.get('[data-ta-type="text"]').type("杰");

    cy.contains("查 询").click();
    cy.contains("杰哥").should("be.visible");
  });

  it("查找 我的爱车  默认选中不为空", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["属性字段", "我的爱车"]);
    cy.get('[data-ta-key="notEmpty"]').should("be.visible");
    cy.get('[data-ta-key="notEmpty"]').should("be.visible");
    cy.contains("特斯拉").should("be.visible");
    cy.contains("查 询").click();
    cy.contains("杰哥").should("be.visible");
    cy.contains("龙哥").should("be.visible");
    cy.contains("曹立").should("be.visible");

    selectOperator("为空");
    cy.contains("查 询").click();
    cy.contains("曹立").should("be.visible");
  });

  it("查找 我的爱车  默认选中不为空", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["属性字段", "我的爱车"]);
    selectConstraint("属性字段");

    cy.get('[data-ta-key="属性字段"]').find(`[data-ta-type="field"]`).click();
    selectField(["名称"]);
    selectOperator("不包含", cy.get('[data-ta-key="属性字段"]'));
    cy.get('[data-ta-key="属性字段"]')
      .find('[data-ta-type="text"]')
      .type("平价版");
    cy.contains("查 询").click();
    cy.contains("龙哥").should("be.visible");
    cy.contains("杰哥").should("not.exist");
  });
});

function selectField(values: string[]) {
  const cascader = cy.get(
    ".ant-cascader-menus:not(.ant-cascader-menus-hidden)"
  );

  for (const value of values) {
    cy.get(".ant-cascader-menus:not(.ant-cascader-menus-hidden)")
      .contains(value)
      .should("be.visible");
    cy.get(".ant-cascader-menus:not(.ant-cascader-menus-hidden)")
      .contains(value)
      .click();
  }

  cascader.should("not.be.visible");
}

function selectOperator(operator, parent: any = cy) {
  parent.find(`[data-ta-type="operator"]`).click();
  cy.get(".ant-select-dropdown:not(.ant-select-dropdown-hidden)")
    .contains(operator)
    .click();
}

function selectConstraint(constraint) {
  cy.contains("添加限制条件").click();
  cy.get(".ant-dropdown:not(.ant-dropdown-hidden)")
    .contains(constraint)
    .click();
}
