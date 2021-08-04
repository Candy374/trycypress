/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("http://localhost:3000/");
  cy.get("#username").type("24");
  cy.get("#password").type("Focuson789");
  cy.contains("登 录").click();

  cy.get(".ant-breadcrumb:contains('首页')").should("be.visible");

  cy.wait(3000);
  cy.window().then((window) => {
    window.location.hash = "/ws/Geely/trait_manage/dw_pq_profile/list";
  });

  Cypress.on("uncaught:exception", (err) => {
    /* returning false here prevents Cypress from failing the test */
    const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
    if (resizeObserverLoopErrRe.test(err.message)) {
      return false;
    }
  });
});

describe("The Trait Page - unGroup", () => {
  it("默认显示未分组", () => {
    cy.contains("未分组").should("be.visible");
  });

  it.only("未分组不可编辑", () => {
    // cy.contains("未分组").trigger("mouseover");
    cy.contains("未分组")
      .parent()
      .find(".tree-node-title-actions")
      .should("not.exist");
    cy.contains("group1").parent().find(".tree-node-title-actions");
  });

  it("切换到未分组, 右侧列出未分组的 标签", () => {
    cy.contains("未分组").click();
    cy.get(".ant-empty ").should("be.visible");
  });

  it("新建标签, 显示到未分组", () => {
    cy.contains("新建").click();
    cy.contains("计算值标签").click();
    cy.contains("标签分组").should("be.visible");
    const traitId = getRandomTraitId();
    createTrait({ traitId });
    setTrait();
    cy.contains("标签图谱").should("be.visible");
    cy.contains("未分组").click();
    cy.contains(traitId).should("be.visible");

    cy.contains("删除").click();
    cy.contains("确 定").click();
  });

  it("编辑标签, 显示到未分组", () => {
    cy.contains("group1").click();

    cy.contains("编辑").first().click();
    cy.contains("标签分组").should("be.visible");
    setTrait();
    cy.contains("标签图谱").should("be.visible");
    cy.contains("未分组").click();
    cy.contains("aa1").should("be.visible");

    // cy.contains("删除").click();
    // cy.contains("确 定").click();
  });

  it("移动到未分组", () => {
    cy.contains("group1").click();
    cy.get('[data-row-key="aa2"] [type="checkbox"]').click();
    cy.contains("移动到分组").should("be.visible");
    cy.contains("移动到分组").click();
    // cy.get(".ant-popover:contains('未分组')").click();
    cy.get(".ant-popover").contains("未分组").click();
    cy.contains("确 认").click();

    cy.get(".ant-tree-treenode-selected:contains('未分组')").should(
      "be.visible"
    );
    cy.contains("aa2").should("be.visible");
  });
});

// 3. 选中右侧多个标签， 移动至 【未分组】 ， 左侧未分组高亮， 右侧显示未分组下所有标签
// 4。 编辑已有标签， 改变 标签分组， 设置为 未分组， 保存后回到列表页， 选中列表页的 【未分组】， 查看刚才的标签 出现在未分组中
// 5. 创建新标签， 从步骤4的设置未分组开始 再跑一次。
// 6. 从未分组中吧标签移出去， 查看移动成功
// 7. 从未分组中删除标签，查看标签已删除
// 8. 查看未分组不可移动 不可删除，不可创建子分组

function createTrait({ traitId }) {
  cy.get('[data-ta-key="traitName"]').type(traitId);
  cy.get('[data-ta-key="traitId"]').type(traitId);
  cy.contains("编辑公式").click();
  cy.contains("建立公式").should("be.visible");

  cy.get(".view-lines.monaco-mouse-cursor-text").type("1");
  cy.contains("确 认").click();
}

function setTrait() {
  cy.get('[data-ta-key="traitGroupPath"]').click();
  cy.contains("未分组").click();
  cy.contains("确 定").click();
}

function getRandomTraitId() {
  return "test" + Math.floor(Math.random() * 1000) + "";
}
