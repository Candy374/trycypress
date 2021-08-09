export let Session;
export function login() {
  cy.visit("https://data.dmhub.cn/data/login.html");
  cy.get("#username").type("24");
  cy.get("#password").type("Focuson789");
  cy.contains("登 录").click();

  cy.wait(3000);
  cy.contains("吉利汽车").click();
  cy.contains("前端UI自动化").click();
  Cypress.on("uncaught:exception", (err) => {
    /* returning false here prevents Cypress from failing the test */
    const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
    if (resizeObserverLoopErrRe.test(err.message)) {
      return false;
    }
  });

  cy.getCookie("SESSION").then((x) => {
    Session = x;
  });
}

export function checkTableData(values: string[]) {
  for (const value of values) {
    getTableValue(value).should("be.visible");
  }
}

export function getTableValue(value: string) {
  return cy.get(".ant-table").contains(value);
}

export function checkTableDataNotExist(values: string[]) {
  for (const value of values) {
    getTableValue(value).should("not.exist");
  }
}

export function selectInDropdown(text) {
  cy.get(".ant-dropdown:not(.ant-dropdown-hidden)").contains(text).click();
}

export function selectInSelectDropdown(text) {
  cy.get(".ant-select-dropdown:not(.ant-select-dropdown-hidden)")
    .contains(text)
    .click();
}

export function clickInPopover(text = "确 定") {
  const cyObject = cy.get(".ant-popover:not(.ant-popover-hidden)");
  cyObject.contains(text).click();
  cyObject.should("not.exist");
}
