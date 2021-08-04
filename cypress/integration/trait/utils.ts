export function login() {
  cy.visit("http://localhost:3000/");
  cy.get("#username").type("24");
  cy.get("#password").type("Focuson789");
  cy.contains("登 录").click();

  cy.get(".ant-breadcrumb:contains('首页')").should("be.visible");

  cy.wait(3000);
  Cypress.on("uncaught:exception", (err) => {
    /* returning false here prevents Cypress from failing the test */
    const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
    if (resizeObserverLoopErrRe.test(err.message)) {
      return false;
    }
  });
}

export function gotToTraitList() {
  cy.window().then((window) => {
    window.location.hash = "/ws/Geely/trait_manage/dw_pq_profile/list";
  });
}

export function gotToComputeValueTraitDetail() {
  cy.window().then((window) => {
    window.location.hash =
      "/ws/Geely/trait_manage/dw_customer/detail/rule/compute_value/_new";
  });
}
