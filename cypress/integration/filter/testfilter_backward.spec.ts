/// <reference types="cypress" />

import { symbolName } from "typescript";
import { login } from "../utils";

let SESSION;
describe("The Filter 车主", () => {
  before(() => {
    login();

    cy.contains("吉利汽车").click();
    cy.contains("前端UI自动化").click();

    cy.window().then((window) => {
      window.location.hash = "/ws/ui_automation/dwData/dw_car_owner/list_page";
    });
    cy.wait(1000);
    cy.getCookie("SESSION").then((x) => {
      SESSION = x;
    });
  });

  beforeEach(() => {
    cy.setCookie("SESSION", SESSION.value);
    cy.contains("添加条件组").click();
  });

  afterEach(() => {
    cy.get('[data-ta-key="delete"]').first().click({ force: true });
    clickInPopover();
  });

  it("名称包含杰", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["属性字段", "名称"]);
    selectOperator("包含");

    cy.get('[data-ta-type="text"]').type("杰");

    cy.contains("查 询").click();
    cy.contains("杰哥").should("be.visible");
  });

  it("查找 我的爱车 默认选中不为空 -> 为空", () => {
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

  it("查找 我的爱车 业务单据 状态成功", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["属性字段", "我的爱车"]);
    selectConstraint("业务单据");

    cy.get('[data-ta-key="业务单据"]').find(`[data-ta-type="field"]`).click();
    selectField(["商品名称"]);

    cy.get('[data-ta-key="业务单据"]')
      .find('[data-ta-key="属性字段"]')
      .find(`[data-ta-type="field"]`)
      .click();
    selectField(["状态"]);
    cy.get('[data-ta-key="属性字段"]')
      .find('[data-ta-type="text"]')
      .type("成功");
    cy.contains("查 询").click();
    cy.contains("杰哥").should("be.visible");

    selectConstraint("统计指标", cy.get('[data-ta-key="业务单据"]'));
    cy.get('[data-ta-key="业务单据"]')
      .find('[data-ta-key="统计指标"]')
      .find(`[data-ta-type="field"]`)
      .click();

    selectField(["发生时间"]);
    selectOperator(
      "为空",
      cy.get('[data-ta-key="业务单据"]').find('[data-ta-key="统计指标"]')
    );

    cy.contains("查 询").click();
    cy.contains("杰哥").should("not.exist");
  });

  it("标签 有钱", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["标签"]);
    cy.get(`[data-ta-key="trait_id"]`).click();
    selectInSelectDropdown("有钱");
    cy.get('[data-ta-key="属性字段"]')
      .find('[data-ta-key="delete"]')
      .click({ force: true });

    cy.contains("查 询").click();
    cy.contains("杰哥").should("be.visible");
  });

  it("（反查-查找-普通） 买卖关系 车主不为空", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["其他关联表", "买卖关系"]);

    cy.get('[data-ta-key="属性字段"]').find('[data-ta-key="field"]').click();
    selectField(["车主"]);

    cy.get('[data-ta-key="属性字段"]').contains("限制属性字段").click();
    cy.get('[data-ta-key="属性字段"]').find('[data-ta-key="属性字段"]').click();
    cy.get('[data-ta-key="属性字段"]')
      .find('[data-ta-key="属性字段"]')
      .find('[data-ta-key="field"]')
      .click();
    selectField(["名称"]);
    cy.get('[data-ta-key="属性字段"]')
      .find('[data-ta-key="属性字段"]')
      .find('[data-ta-type="text"]')
      .type("龙哥");

    cy.contains("查 询").click();
    cy.contains("龙哥").should("be.visible");
  });

  it("（反查-普通）买卖关系 车主不为空", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["其他关联表", "买卖关系"]);

    cy.get('[data-ta-key="属性字段"]').find('[data-ta-key="field"]').click();
    selectField(["关系名称"]);

    selectOperator("包含", cy.get('[data-ta-key="属性字段"]'));

    cy.get('[data-ta-key="属性字段"]')
      .find('[data-ta-type="text"]')
      .type("第二次");

    cy.contains("查 询").click();
    cy.contains("杰哥").should("be.visible");
  });

  it("（查找-查找）客户 销售 经销商", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["属性字段", "所属销售"]);
    selectConstraint("属性字段");
    cy.get('[data-ta-key="属性字段"]').find('[data-ta-key="field"]').click();
    selectField(["所属经销商"]);

    cy.get('[data-ta-key="属性字段"]').contains("限制属性字段").click();
    cy.get('[data-ta-key="属性字段"]').find('[data-ta-key="属性字段"]').click();
    selectField(["名称"]);
    selectOperator(
      "包含",
      cy.get('[data-ta-key="属性字段"]').find('[data-ta-key="属性字段"]')
    );

    cy.get('[data-ta-key="属性字段"]')
      .find('[data-ta-key="属性字段"]')
      .find('[data-ta-type="text"]')
      .type("一店");

    cy.contains("查 询").click();
    cy.contains("杰哥").should("be.visible");
  });

  it("（查找-反查）销售 经销商 订单", () => {
    cy.window().then((window) => {
      window.location.hash = "/ws/ui_automation/dwData/dw_sales/list_page";
    });
    cy.wait(3000);
    cy.contains("添加条件组").click();

    cy.get(`[data-ta-type="field"]`).click();

    selectField(["属性字段", "所属经销商"]);
    selectConstraint("业务单据");
    cy.get('[data-ta-key="业务单据"]').find('[data-ta-key="field"]').click();
    selectField(["流水账"]);

    selectConstraint("统计指标", cy.get('[data-ta-key="业务单据"]'));
    cy.get('[data-ta-key="业务单据"]')
      .find('[data-ta-key="属性字段"]')
      .find('[data-ta-key="delete"]')
      .click({ force: true });

    cy.get('[data-ta-key="业务单据"]')
      .find('[data-ta-key="统计指标"]')
      .find('[data-ta-type="aggregation"]')
      .click();
    selectInSelectDropdown("COUNT(次数)");
    selectOperator(
      "大于(含)",
      cy.get('[data-ta-key="业务单据"]').find('[data-ta-key="统计指标"]')
    );

    cy.get('[data-ta-key="业务单据"]')
      .find('[data-ta-key="统计指标"]')
      .find('[data-ta-type="number"]')
      .type("1");

    cy.contains("查 询").click();
    cy.contains("小包").should("be.visible");
  });

  it("（反查-查找）车主 关注公众号", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["行为事件", "售前相关事件"]);
    cy.get('[data-ta-key="_event_type"]').click();
    selectInSelectDropdown("关注公众号");

    selectConstraint("统计指标");

    cy.get('[data-ta-key="属性字段"]')
      .find('[data-ta-key="delete"]')
      .click({ force: true });

    cy.get('[data-ta-key="统计指标"]')
      .find('[data-ta-type="aggregation"]')
      .click();
    selectInSelectDropdown("COUNT(次数)");
    selectOperator("大于(含)", cy.get('[data-ta-key="统计指标"]'));

    cy.get('[data-ta-key="统计指标"]')
      .find('[data-ta-type="number"]')
      .type("1");

    cy.contains("查 询").click();
    cy.contains("曹立").should("be.visible");
  });

  it("（查找-反查）车主 公司 业务单据", () => {
    cy.get(`[data-ta-type="field"]`).click();

    selectField(["属性字段", "上家公司"]);

    selectConstraint("业务单据");

    cy.get('[data-ta-key="业务单据"]').find('[data-ta-key="field"]').click();
    selectField(["买车车"]);

    cy.get('[data-ta-key="属性字段"]').find('[data-ta-key="field"]').click();
    selectField(["状态"]);

    cy.get('[data-ta-key="属性字段"]')
      .find('[data-ta-type="text"]')
      .type("成功");

    cy.contains("查 询").click();
    cy.contains("麦麦").should("be.visible");
  });
});

function selectField(values: string[]) {
  const cascader = cy.get(
    ".ant-cascader-menus:not(.ant-cascader-menus-hidden)"
  );

  for (const value of values) {
    cy.get(".ant-cascader-menus:not(.ant-cascader-menus-hidden)")
      .contains(value)
      .click();
  }

  cascader.should("not.be.visible");
}

function selectOperator(operator, parent?) {
  if (parent) {
    parent.find(`[data-ta-type="operator"]`).click();
  } else {
    cy.get(`[data-ta-type="operator"]`).click();
  }

  selectInSelectDropdown(operator);
}

function selectConstraint(constraint, parent: any = cy) {
  parent.contains("添加限制条件").click();
  selectInDropdown(constraint);
}

function selectInDropdown(text) {
  cy.get(".ant-dropdown:not(.ant-dropdown-hidden)").contains(text).click();
}

function selectInSelectDropdown(text) {
  cy.get(".ant-select-dropdown:not(.ant-select-dropdown-hidden)")
    .contains(text)
    .click();
}

function clickInPopover(text = "确 定") {
  cy.get(".ant-popover:not(.ant-popover-hidden)").contains(text).click();
}
