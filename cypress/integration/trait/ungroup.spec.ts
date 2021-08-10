/// <reference types="cypress" />

import { clickInPopover, login, Session } from "../utils";
import { gotToTraitList } from "./utils";

describe("The Trait Page - unGroup", () => {
  beforeEach(() => {
    login();
    gotToTraitList();
  });

  // beforeEach(() => {
  //   cy.setCookie("SESSION", Session.value);
  // });

  it("默认显示未分组", () => {
    cy.contains("未分组").should("be.visible");
  });

  it("未分组不可编辑", () => {
    cy.contains("未分组")
      .parent()
      .find(".tree-node-title-actions")
      .should("not.exist");
    cy.contains("group1").parent().find(".tree-node-title-actions");
  });

  it("新建标签, 显示到未分组", () => {
    const traitId = createTrait();

    cy.contains("未分组").click();
    cy.get(`[data-row-key="${traitId}"]`).should("be.visible");

    deleteTrait(traitId);
  });

  it("编辑group1标签, 显示到未分组", () => {
    const traitId = createTrait("group1");
    cy.contains("group1").click();

    cy.get(`[data-row-key="${traitId}"]`).contains("编辑").click();
    cy.contains("标签分组").should("be.visible");
    saveTraitGroup();

    cy.contains("未分组").click();
    cy.get(`[data-row-key="${traitId}"]`).should("be.visible");

    deleteTrait(traitId);
  });

  it("group1标签 移动到未分组", () => {
    const traitId = createTrait("group1");
    cy.contains("group1").click();

    cy.get(`[data-row-key="${traitId}"]`).get('[type="checkbox"]').click();
    cy.contains("移动到分组").should("be.visible");
    cy.contains("移动到分组").click();
    cy.get(".ant-popover").contains("未分组").click();
    cy.contains("确 认").click();

    // 未分组高亮
    cy.get(".ant-tree-treenode-selected:contains('未分组')").should(
      "be.visible"
    );
    cy.get(`[data-row-key="${traitId}"]`).should("be.visible");

    deleteTrait(traitId);
  });
});

function setTrait({ traitId }) {
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

function createTrait(groupName?: string) {
  const traitId = getRandomTraitId();
  cy.contains("新建").click();
  cy.contains("计算值标签").click();
  cy.contains("标签分组").should("be.visible");
  setTrait({ traitId });
  saveTraitGroup(groupName);
  return traitId;
}

function deleteTrait(traitId) {
  cy.get(`[data-row-key="${traitId}"]`).contains("删除").click();
  clickInPopover("确 定", true);
  cy.get(`[data-row-key="${traitId}"]`).contains("删除中");
}
