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
});

function selectField(values: string[]) {
  const cascader = cy.get(".ant-cascader-menus.data-ta-type_field");

  for (const value of values) {
    cy.get(".ant-cascader-menus.data-ta-type_field")
      .contains(value)
      .should("be.visible");
    cy.get(".ant-cascader-menus.data-ta-type_field").contains(value).click();
  }

  cascader.should("not.be.visible");
}

function selectOperator(operator) {
  cy.get(`[data-ta-type="operator"]`).click();
  cy.get(".ant-select-dropdown:not(.ant-select-dropdown-hidden)")
    .contains(operator)
    .click();
}
