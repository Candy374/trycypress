/// <reference types="cypress" />

import { login } from "../trait/utils";

before(() => {
  login();
  cy.window().then((window) => {
    window.location.hash = "/test";
  });

  cy.contains("添加条件组").click();
});

describe("The Filter level2", () => {
  it("basic property text", () => {
    cy.get(".ant-input.ant-cascader-input").click();
    cy.contains("属性字段").click();
    cy.contains("名称").click();
    cy.contains("查 询").click();

    cy.get(".logical-filter.logical-filter-level-2")
      .parent()
      .should("have.class", "show-error-status");
    cy.get(".ant-input.show-error").type("testEmail");
    cy.contains("查 询").click();
    cy.get(".logical-filter.logical-filter-level-2")
      .parent()
      .should("not.have.class", "show-error-status");
  });
});

function clickBirthday() {
  cy.get(".ant-input.ant-cascader-input").click();
  cy.contains("属性字段").click();
  cy.get(".ant-cascader-menu-item:contains('生日')").click();
}

function testFilterTemplate({ tabName, clickTarget, checkName, data }) {
  // cy.get(".ant-btn:nth-child(4)").click();
  getDateSettingButton().click();
  cy.contains("相对时间").should("be.visible");
  cy.contains(tabName).click();
  clickTarget();

  cy.contains("确 认").click();
  cy.get(".ant-popover").should("not.be.visible");
  getDateSettingButton().should(($button) => {
    expect($button.text()).to.eq(checkName);
  });

  checkData(data);
}

function checkData(data) {
  cy.contains("clear").click();
  cy.contains("查 询").click();

  cy.get("#filter-value").should(($div) => {
    const text = $div.text();

    expect(JSON.parse(text)).to.deep.eq(data);
  });
}

function getDateSettingButton() {
  return cy.get(".can-delete-line > :nth-child(1) > .ant-row > .ant-btn");
}
