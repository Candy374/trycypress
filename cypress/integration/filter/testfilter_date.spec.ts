/// <reference types="cypress" />

import {
  clickInPopover,
  getTableValue,
  login,
  selectInDropdown,
  selectInSelectDropdown,
  Session,
} from "../utils";
import {
  checkApi,
  clickMenu,
  getByTaKey,
  injectApi,
  removeCondition,
  searchEntity,
  selectInGroupCascader,
  setBasicProperty,
} from "./utils";

describe("The filter date", () => {
  before(() => {
    login();
    clickMenu(["数据存储", "模型表"]);
    searchEntity("车主");
    getTableValue("车主").click();
    cy.contains("数据列表").click();

    cy.get(".ant-spin").should("not.exist");
  });

  beforeEach(() => {
    cy.setCookie("SESSION", Session.value);

    cy.contains("添加条件组").click();
    clickBirthday();
  });

  afterEach(() => {
    removeCondition();
  });

  describe("equal", () => {
    it("basic property date 昨 日", () => {
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          cy.contains("昨 日").click();
        },
        checkName: "昨 日",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
          selectXWeekDay("周 六");
        },
        checkName: "周 六",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
          selectXDate("10 号");
        },
        checkName: "10 号",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
            dataTable: "dw_car_owner",
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
          getByTaKey("relative", ["day"]).type("3");
        },
        checkName: "过去第3天",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
          getByTaKey("relative", ["day"], 1).type("4");
        },
        checkName: "未来第4天",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
          getByTaKey("relative", ["year"]).type("2");
        },
        checkName: "过去第2年",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
          getByTaKey("relative", ["year"], 1).type("14");
        },
        checkName: "未来第14年",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      testFilterTemplate({
        tabName: "绝对时间",
        clickTarget: () => {
          clickInCalendar("2021-08-16");
        },
        checkName: "2021-08-16",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
            operator: "equal",
            equal: {
              fieldExpression:
                "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
              fieldExpressionValue: "'2021-08-16'",
              field: "_birthday",
            },
          },
        },
      });
    });

    it("basic property date 周期时间 3 月", () => {
      testFilterTemplate({
        tabName: "周期时间",
        clickTarget: () => {
          getByTaKey("month").click();
          cy.contains("3 月").scrollIntoView().click();
        },
        checkName: "3 月",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      setBasicProperty({ operator: "早于" });

      getByTaKey("date").click();
      cy.contains("相对时间").should("be.visible");
      cy.contains("周期时间").should("not.exist");
      // cy.get(".ant-tabs-nav-list .ant-tabs-tab").then(($tabs) => {
      //   expect($tabs.children.length).to.eq(2);
      // });
    });
  });

  describe("between", () => {
    beforeEach(() => {
      setBasicProperty({ operator: "区间" });
    });

    it("operator = between has no range date", () => {
      getByTaKey("date").click();
      cy.contains("相对时间").should("be.visible");
      cy.contains("周期时间").should("not.exist");
    });

    it("operator = between 本 周", () => {
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          cy.contains("本 周").click();
        },
        checkName: "本 周",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          cy.contains("上 周").click();
        },
        checkName: "上 周",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          cy.contains("上 月").click();
        },
        checkName: "上 月",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          cy.contains("本 月").click();
        },
        checkName: "本 月",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          cy.contains("去 年").click();
        },
        checkName: "去 年",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          cy.contains("本 年").click();
        },
        checkName: "本 年",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          getByTaKey("relative", ["day"]).type("18");
        },
        checkName: "过去18天",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          getByTaKey("relative", ["year"]).type("20");
        },
        checkName: "过去20年",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          getByTaKey("relative", ["day"], 1).type("31");
        },
        checkName: "未来31天",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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
      testFilterTemplate({
        tabName: "相对时间",
        clickTarget: () => {
          getByTaKey("relative", ["year"], 1).type("45");
        },
        checkName: "未来45年",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
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

    it("operator = between 绝对时间 2021-08-18 - 2021-09-15", () => {
      testFilterTemplate({
        tabName: "绝对时间",
        clickTarget: () => {
          clickInRangeCalendar("2021-08-18", "2021-09-15");
        },
        checkName: "2021-08-18 ~ 2021-09-15",
        data: {
          type: "filter",
          filter: {
            dataTable: "dw_car_owner",
            operator: "between",
            between: {
              fieldExpression:
                "date_trunc('DAY', from_utc_timestamp($_birthday,'Asia/Shanghai'))",
              fieldExpressionValueLeft: "'2021-08-18'",
              fieldExpressionValueRight: "'2021-09-15'",
              field: "_birthday",
            },
          },
        },
      });
    });
  });
});

function clickBirthday() {
  selectInGroupCascader(["属性字段", "生日"]);
}

function testFilterTemplate({ tabName, clickTarget, checkName, data }) {
  getByTaKey("date").click();
  cy.contains("相对时间").should("be.visible");
  cy.contains(tabName).click();
  clickTarget();

  clickInPopover("确 认", true);

  getByTaKey("date").should("have.text", checkName);

  cy.contains("查 询").click();

  cy.intercept("POST", "/data/impala/gdm/dataTable/data/filter/*", (req) => {
    req.body.should("deep.equal", {
      filter: data,
    });
  });
}

function clickInCalendar(text: string) {
  cy.contains("16").click();
}

function clickInRangeCalendar(from: string, to: string) {
  cy.get('[title="2021-08-18"]').click();
  cy.get('[title="2021-09-15"]').click();
}

function selectXDate(text) {
  cy.get(`[data-ta-key="date"][data-ta-type="Select"]`).click();
  cy.contains(text).scrollIntoView().click();
}

function selectXWeekDay(text) {
  getByTaKey("week").click();
  selectInSelectDropdown(text);
}
