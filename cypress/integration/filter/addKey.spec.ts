/// <reference types="cypress" />

import { getTableValue, login, Session } from "../utils";
import {
  clickMenu,
  getByTaKey,
  removeCondition,
  searchEntity,
  selectInGroupCascader,
  setBasicProperty,
  startSearch,
} from "./utils";

describe("添加key for logic filter", () => {
  before(() => {
    login();
    clickMenu(["数据存储", "模型表"]);
    searchEntity("车主");
    getTableValue("车主").click();
    cy.contains("数据列表").click();
    cy.contains("添加条件组").click();
  });

  beforeEach(() => {
    cy.setCookie("SESSION", Session.value);
  });

  afterEach(() => {
    removeCondition([], { waitInVisible: false });
  });

  it("条件1收起， 条件2展开，删除条件1保持展开", () => {
    selectInGroupCascader(["行为事件", "相关事件"]);
    getByTaKey("collapse").click();
    cy.contains("添加条件").click();
    selectInGroupCascader(["行为事件", "相关事件"], [], 2);

    removeCondition([], {});

    isExpand();
  });

  it.only("条件1收起， 条件2收起，删除条件1保持收起", () => {
    selectInGroupCascader(["行为事件", "相关事件"]);
    getByTaKey("collapse").click();
    cy.contains("添加条件").click();
    selectInGroupCascader(["行为事件", "相关事件"], [], 2);
    getByTaKey("collapse", [], 1).click();
    removeCondition([], {});
    isCollapsed();
  });

  it("条件1展开， 条件2收起，删除条件1保持收起", () => {
    selectInGroupCascader(["行为事件", "相关事件"]);
    cy.contains("添加条件").click();
    selectInGroupCascader(["行为事件", "相关事件"], [], 2);
    getByTaKey("collapse", [], 1).click();
    removeCondition([], {});
    isCollapsed();
  });

  it("条件1展开， 条件2展开，删除条件1保持展开", () => {
    selectInGroupCascader(["行为事件", "相关事件"]);
    cy.contains("添加条件").click();
    selectInGroupCascader(["行为事件", "相关事件"], [], 2);
    removeCondition([], {});
    isExpand();
  });
});

function isCollapsed() {
  getByTaKey("collapse").find(".anticon-plus-square").should("be.visible");
}

function isExpand() {
  getByTaKey("collapse").find(".anticon-minus-square").should("be.visible");
}
