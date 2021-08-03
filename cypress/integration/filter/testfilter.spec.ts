/// <reference types="cypress" />

before(() => {
  cy.visit("/");
  cy.get("#username").type("24");
  cy.get("#password").type("Focuson789");
  cy.contains("登 录").click();

  cy.get(".ant-breadcrumb:contains('首页')").should("be.visible");

  // cy.on("url:changed", (url) => {
  //   console.log("url>>>>", url);
  //   if (url.indexOf("#/ws/Geely/home") > -1) {
  //     window.location.hash = "/test";
  //   }
  // });

  cy.wait(3000);
  cy.window().then((window) => {
    window.location.hash = "/test";
  });

  // cy.contains("标签").click();

  // cy.visit("/data/index.html/#/test");
  // cy.get(".organization-select").click();
  // cy.contains("吉利汽车").click();

  // cy.visit("/data/index.html/#/test");
  cy.contains("添加条件组").click();
  // cy.get(".can-delete-line").should("be.visible");
});
describe("The Home Page", () => {
  // beforeEach(() => {
  //   cy.visit('/data/login.html');
  //   cy.get('#username').type('24');
  //   cy.get('#password').type('Focuson789');
  //   cy.contains('登 录').click();

  //   cy.get('.organization-select').click();
  //   cy.contains('吉利汽车').click()
  // });

  it.skip("basic property text", () => {
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

  it("basic property date 昨 日", () => {
    clickBirthday();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.contains("昨 日").click();
      },
      checkName: "昨 日",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "equal",
          equal: {
            fieldExpression:
              "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValue:
              "date_sub(date_trunc('DAY',from_utc_timestamp(now(),'Asia/Shanghai')),1)",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("basic property date 周期时间 周六", () => {
    testFilterTemplate({
      tabName: "周期时间",
      clickTarget: () => {
        cy.get(
          "#rc-tabs-0-panel-range > :nth-child(5) > .ant-select > .ant-select-selector"
        ).click();
        cy.contains("周六").click();
      },
      checkName: "周 六",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "equal",
          equal: {
            fieldExpression:
              "dayofweek(from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValue: "7",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("basic property date 周期时间 10 号", () => {
    testFilterTemplate({
      tabName: "周期时间",
      clickTarget: () => {
        cy.get(
          "#rc-tabs-0-panel-range > :nth-child(3) > .ant-select > .ant-select-selector"
        ).click();
        cy.contains("10号").scrollIntoView().click();
      },
      checkName: "10号",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "equal",
          equal: {
            fieldExpression:
              "day(from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValue: "10",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("basic property date 今 日", () => {
    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.contains("今 日").click();
      },
      checkName: "今 日",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "equal",
          equal: {
            fieldExpression:
              "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValue:
              "date_trunc('DAY',from_utc_timestamp(now(),'Asia/Shanghai'))",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("basic property date 过去第3天", () => {
    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.get(
          ":nth-child(1) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input"
        ).type("3");
      },
      checkName: "过去第3天",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "equal",
          equal: {
            fieldExpression:
              "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValue:
              "date_sub(date_trunc('DAY',from_utc_timestamp(now(),'Asia/Shanghai')),3)",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("basic property date 未来第4天", () => {
    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.get(
          ":nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input"
        ).type("4");
      },
      checkName: "未来第4天",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "equal",
          equal: {
            fieldExpression:
              "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValue:
              "date_add(date_trunc('DAY',from_utc_timestamp(now(),'Asia/Shanghai')),4)",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("basic property date 过去第2年", () => {
    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.get(
          ":nth-child(3) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input"
        ).type("2");
      },
      checkName: "过去第2年",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "equal",
          equal: {
            fieldExpression:
              "year(from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValue:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))-2",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("basic property date 未来第14年", () => {
    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.get(
          ":nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input"
        ).type("14");
      },
      checkName: "未来第14年",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "equal",
          equal: {
            fieldExpression:
              "year(from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValue:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))+14",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("basic property date 绝对时间 16号", () => {
    clickBirthday();
    getDateSettingButton().click();
    cy.contains("相对时间").should("be.visible");
    cy.contains("绝对时间").click();
    // cy.contains('2021').click();
    // cy.contains('Aug').click();
    cy.contains("16").click();

    cy.contains("确 认").click();
    getDateSettingButton().should(($button) => {
      expect($button.text()).to.match(/\d{4}-\d{2}-16/);
    });

    checkData({
      type: "filter",
      filter: {
        dataTable: "dw_pq_profile",
        operator: "equal",
        equal: {
          fieldExpression:
            "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
          fieldExpressionValue: "'2021-08-16'",
          field: "_birthday",
        },
      },
    });
  });

  it("basic property date 周期时间 3 月", () => {
    testFilterTemplate({
      tabName: "周期时间",
      clickTarget: () => {
        cy.get(
          "#rc-tabs-0-panel-range > :nth-child(1) > .ant-select > .ant-select-selector"
        ).click();
        cy.contains("3 月").click();
      },
      checkName: "3 月",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "equal",
          equal: {
            fieldExpression:
              "month(from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValue: "3",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("date less than has no range date", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("早于").click();

    getDateSettingButton().click();
    cy.contains("相对时间").should("be.visible");

    cy.get(".ant-tabs-nav-list .ant-tabs-tab").then(($tabs) => {
      expect($tabs.children.length).to.eq(2);
    });
  });

  it("operator = between has no range date", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    getDateSettingButton().click();
    cy.contains("相对时间").should("be.visible");

    cy.get(".ant-tabs-nav-list .ant-tabs-tab").then(($tabs) => {
      expect($tabs.children.length).to.eq(2);
    });
  });

  it("operator = between 本 周", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.contains("本 周").click();
      },
      checkName: "本 周",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "date_trunc('WEEK', from_utc_timestamp(now(),'Asia/Shanghai'))",
            fieldExpressionValueRight:
              "date_trunc('WEEK',date_add(from_utc_timestamp(now(),'Asia/Shanghai'),7))",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("operator = between 上 周", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.contains("上 周").click();
      },
      checkName: "上 周",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "date_trunc('WEEK',date_sub(from_utc_timestamp(now(),'Asia/Shanghai'),7))",
            fieldExpressionValueRight:
              "date_trunc('WEEK', from_utc_timestamp(now(),'Asia/Shanghai'))",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("operator = between 上 月", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.contains("上 月").click();
      },
      checkName: "上 月",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "add_months(date_trunc('MONTH',from_utc_timestamp(now(),'Asia/Shanghai')),-1)",
            fieldExpressionValueRight:
              "date_trunc('MONTH',from_utc_timestamp(now(),'Asia/Shanghai'))",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("operator = between 本 月", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.contains("本 月").click();
      },
      checkName: "本 月",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "date_trunc('MONTH',from_utc_timestamp(now(),'Asia/Shanghai'))",
            fieldExpressionValueRight:
              "add_months(date_trunc('MONTH',from_utc_timestamp(now(),'Asia/Shanghai')),1)",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("operator = between 去 年", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.contains("去 年").click();
      },
      checkName: "去 年",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "year(from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))-1",
            fieldExpressionValueRight:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("operator = between 本 年", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.contains("本 年").click();
      },
      checkName: "本 年",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "year(from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))",
            fieldExpressionValueRight:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))+1",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("operator = between 过去 18 天", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.get(
          ":nth-child(3) > :nth-child(1) > .ant-row > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input"
        ).type("18");
      },
      checkName: "过去18天",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "date_sub(date_trunc('DAY',from_utc_timestamp(now(),'Asia/Shanghai')),18)",
            fieldExpressionValueRight:
              "date_trunc('DAY', from_utc_timestamp(now(),'Asia/Shanghai'))",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("operator = between 过去 20 年", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.get(
          ":nth-child(3) > :nth-child(2) > .ant-row > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input"
        ).type("20");
      },
      checkName: "过去20年",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "year(from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))-20",
            fieldExpressionValueRight:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("operator = between 未来31天", () => {
    clickBirthday();

    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.get(
          ":nth-child(5) > :nth-child(1) > .ant-row > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input"
        ).type("31");
      },
      checkName: "未来31天",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "date_add(date_trunc('DAY',from_utc_timestamp(now(),'Asia/Shanghai')),1)",
            fieldExpressionValueRight:
              "date_add(date_trunc('DAY',from_utc_timestamp(now(),'Asia/Shanghai')),31)",
            field: "_birthday",
          },
        },
      },
    });
  });

  it("operator = between 未来45年", () => {
    clickBirthday();
    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "相对时间",
      clickTarget: () => {
        cy.get(
          ":nth-child(5) > :nth-child(2) > .ant-row > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input"
        ).type("45");
      },
      checkName: "未来45年",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "year(from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))+1",
            fieldExpressionValueRight:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))+45",
            field: "_birthday",
          },
        },
      },
    });
  });

  it.skip("operator = between 绝对时间", () => {
    clickBirthday();
    cy.get(
      ".ant-row > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.contains("区间").click();

    testFilterTemplate({
      tabName: "绝对时间",
      clickTarget: () => {
        cy.get('[title="2021-08-18"]').click();
      },
      checkName: "未来45年",
      data: {
        type: "filter",
        filter: {
          dataTable: "dw_pq_profile",
          operator: "between",
          between: {
            fieldExpression:
              "year(from_utc_timestamp($_birthday,'Asia/Shanghai'))",
            fieldExpressionValueLeft:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))+1",
            fieldExpressionValueRight:
              "year(from_utc_timestamp(now(),'Asia/Shanghai'))+45",
            field: "_birthday",
          },
        },
      },
    });
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
