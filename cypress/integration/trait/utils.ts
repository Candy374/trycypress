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
