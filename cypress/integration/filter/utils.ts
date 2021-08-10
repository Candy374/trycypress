import {
  clickInPopover,
  selectInDropdown,
  selectInSelectDropdown,
} from "../utils";

export function selectConstraint(constraint, parentKeys?: string[]) {
  clickConstraint(parentKeys);
  selectInDropdown(constraint);
}
export function clickConstraint(parentKeys?: string[]) {
  getByTaKey("constraint", parentKeys).click();
}
export function selectInGroupCascader(
  values: string[],
  parentKeys?: string[],
  index?: number
) {
  getByTaKey("field", parentKeys, index).click();

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
export function getByTaKey(taKey: string, parentKeys?: string[], index = 0) {
  const taKeys = (parentKeys || []).concat([taKey]);
  let i = 0;
  let cyObject;
  for (const key of taKeys) {
    if (i == 0) {
      cyObject = cy.get(`[data-ta-key="${key}"]`);
    } else {
      cyObject = cyObject.find(`[data-ta-key="${key}"]`);
    }
    i++;
  }

  return cyObject.eq(index);
}
export function getOperator(parentKeys?: string[]) {
  return getByTaKey("operator", parentKeys);
}
export function setBasicProperty({
  operator,
  parentKeys,
  taKey,
  value,
}: {
  parentKeys?: string[];
  operator?: string;
  taKey?: "text" | "number" | "tags";
  value?: string;
}) {
  if (operator) {
    getOperator(parentKeys).click();
    selectInSelectDropdown(operator);
  }

  if (taKey) {
    getByTaKey(taKey, parentKeys).type(value);
  }
}
export function removeCondition(
  parentKeys?: string[],
  hasPopup?: { text?: string; waitInVisible?: boolean }
) {
  getByTaKey("delete", parentKeys).click({ force: true });

  if (hasPopup) {
    clickInPopover(hasPopup.text, hasPopup.waitInVisible);
  }
}
export function startSearch() {
  cy.contains("查 询").click();
}
export function selectInTableDetail(text: string) {
  cy.get(`[data-ta-key="table_detail"]`).click();
  selectInSelectDropdown(text);
}
export function selectInAggregation(text, parentKeys?: string[]) {
  getByTaKey("aggregation", parentKeys).click();

  selectInSelectDropdown(text);
}
export function clickMenu(menus: string[]) {
  for (const menu of menus) {
    getByTaKey(menu).click();
  }
}
export function searchEntity(text) {
  const cyObject = getByTaKey("search");
  cyObject.type(text);
  cyObject.parents(".ant-input-search").find('[type="button"]').click();
}

export function injectApi() {
  cy.intercept({
    method: "POST",
    url: "/data/impala/gdm/dataTable/data/filter/*",
  }).as("apiCheck");
}

export function checkApi(filter: {}) {
  cy.get("@apiCheck").its("request.body").should("deep.equal", {
    filter,
  });
}
