/// <reference types="cypress" />

import { login } from "../utils";
import { gotToTraitList } from "./utils";

beforeEach(() => {
  login();
  gotToTraitList();
});

describe("The Trait Page - unGroup", () => {
  it("默认显示未分组", () => {
    cy.contains("未分组").should("be.visible");
  });

  it("未分组不可编辑", () => {
    // cy.contains("未分组").trigger("mouseover");
    cy.contains("未分组")
      .parent()
      .find(".tree-node-title-actions")
      .should("not.exist");
    cy.contains("group1").parent().find(".tree-node-title-actions");
  });

  it("切换到未分组, 右侧列出未分组的 标签 test40", () => {
    cy.contains("未分组").click();
    cy.contains("test40").should("be.visible");
  });

  it("新建标签, 显示到未分组", () => {
    cy.contains("新建").click();
    cy.contains("计算值标签").click();
    cy.contains("标签分组").should("be.visible");
    const traitId = getRandomTraitId();
    createTrait({ traitId });
    saveTraitGroup();

    cy.contains("未分组").click();
    cy.get(`[data-row-key="${traitId}"]`).should("be.visible");

    cy.get(`[data-row-key="${traitId}"]`).contains("删除").click();
    cy.contains("确 定").click();
    cy.get(`[data-row-key="${traitId}"]`).should("not.exist");
  });

  it("编辑group1标签test3, 显示到未分组", () => {
    cy.contains("group1").click();
    const traitId = "test3";

    cy.get(`[data-row-key="${traitId}"]`).contains("编辑").click();
    cy.contains("标签分组").should("be.visible");
    saveTraitGroup();

    cy.contains("未分组").click();
    cy.get(`[data-row-key="${traitId}"]`).should("be.visible");

    // 移动回去
    cy.get(`[data-row-key="${traitId}"]`).contains("编辑").click();
    cy.contains("标签分组").should("be.visible");
    saveTraitGroup("group1");
  });

  it("group1标签test3移动到未分组", () => {
    cy.contains("group1").click();
    const traitId = "test3";
    cy.get(`[data-row-key="${traitId}"]`).get('[type="checkbox"]').click();
    cy.contains("移动到分组").should("be.visible");
    cy.contains("移动到分组").click();
    cy.get(".ant-popover").contains("未分组").click();
    cy.contains("确 认").click();

    cy.get(".ant-tree-treenode-selected:contains('未分组')").should(
      "be.visible"
    );
    cy.get(`[data-row-key="${traitId}"]`).should("be.visible");

    // 移动回去
    cy.get(`[data-row-key="${traitId}"]`).contains("编辑").click();
    cy.contains("标签分组").should("be.visible");
    saveTraitGroup("group1");
  });
});

function createTrait({ traitId }) {
  cy.get('[data-ta-key="traitName"]').type(traitId);
  cy.get('[data-ta-key="traitId"]').type(traitId);
  cy.contains("编辑公式").click();
  cy.contains("建立公式").should("be.visible");

  cy.get(".view-lines.monaco-mouse-cursor-text").type("1");
  cy.contains("确 认").click();
}

function saveTraitGroup(groupName = "未分组") {
  cy.get('[data-ta-key="traitGroupPath"]').click();
  cy.contains(groupName).click();
  cy.contains("确 定").click();
  cy.contains("标签图谱").should("be.visible");
}

function getRandomTraitId() {
  return "test" + Math.floor(Math.random() * 1000) + "";
}
