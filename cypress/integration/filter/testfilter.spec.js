before(() => {
  cy.visit('/');
    cy.get('#username').type('24');
    cy.get('#password').type('Focuson789');
    cy.contains('登 录').click();

    cy.get('.organization-select').click();
    cy.contains('吉利汽车').click();
    cy.request('https://data.dmhub.cn/data/index.html#/test');

    cy.contains('添加条件组').click();
    cy.get('.can-delete-line').should('be.visible');
})
describe('The Home Page', () => {
  // beforeEach(() => {
  //   cy.visit('/data/login.html');
  //   cy.get('#username').type('24');
  //   cy.get('#password').type('Focuson789');
  //   cy.contains('登 录').click();

  //   cy.get('.organization-select').click();
  //   cy.contains('吉利汽车').click()
  // });

  it('basic property text', () => {
    cy.get('.ant-input.ant-cascader-input').click();
    cy.contains('属性字段').click();
    cy.contains('名称').click();
    cy.contains('查 询').click();

    cy.get('.logical-filter.logical-filter-level-2').parent().should('have.class', 'show-error-status')
    cy.get('.ant-input.show-error').type('testEmail');
    cy.contains('查 询').click();
    cy.get('.logical-filter.logical-filter-level-2').parent().should('not.have.class', 'show-error-status')
  });

  it('basic property date 昨 日', () => {
    cy.get('.ant-input.ant-cascader-input').click();
    cy.contains('属性字段').click();
    cy.contains('生日').click();
    cy.get('.ant-btn:nth-child(4)').click();
    cy.contains('昨 日').click();
    cy.contains('确 认').click();
    cy.get('.ant-btn:nth-child(4)').should(($button) => {
      expect($button.text()).to.eq('昨 日');
    })
  });


  it('basic property date 周期时间 周六', () => {
    cy.get('.ant-btn:nth-child(4)').click();
    cy.contains('相对时间').should('be.visible');
    cy.contains('周期时间').click();
    cy.get('#rc-tabs-0-panel-range > :nth-child(5) > .ant-select > .ant-select-selector').click();
    cy.contains('周六').click();
    
    cy.contains('确 认').click();
    cy.get('.ant-btn:nth-child(4)').should(($button) => {
      expect($button.text()).to.eq('周 六');
    })
  });

  it('basic property date 周期时间 31 号', () => {
    cy.get('.ant-btn:nth-child(4)').click();
    cy.contains('相对时间').should('be.visible');
    cy.contains('周期时间').click();
    cy.get('#rc-tabs-0-panel-range > :nth-child(3) > .ant-select > .ant-select-selector').click();
    cy.contains('31 号').scrollIntoView().click();
    
    cy.contains('确 认').click();
    cy.get('.ant-btn:nth-child(4)').should(($button) => {
      expect($button.text()).to.eq('31 号');
    })
  });

  it('basic property date 今 日', () => {
    // cy.get('.ant-input.ant-cascader-input').click();
    // cy.contains('属性字段').click();
    // cy.contains('生日').click();
    cy.get('.ant-btn:nth-child(4)').click();
    cy.contains('相对时间').should('be.visible');
    cy.contains('相对时间').click();
    cy.contains('今 日').click();
    cy.contains('确 认').click();
    cy.get('.ant-btn:nth-child(4)').should(($button) => {
      expect($button.text()).to.eq('今 日');
    })
  });

  it('basic property date 过去第3天', () => {
    // cy.get('.ant-input.ant-cascader-input').click();
    // cy.contains('属性字段').click();
    // cy.contains('生日').click();
    cy.get('.ant-btn:nth-child(4)').click();
    cy.contains('相对时间').should('be.visible');
    cy.contains('相对时间').click();
    cy.get(':nth-child(1) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type(3);
    cy.contains('确 认').click();
    cy.get('.ant-btn:nth-child(4)').should(($button) => {
      expect($button.text()).to.eq('过去第3天');
    })
  });

  it('basic property date 未来第4天', () => {
    cy.get('.ant-btn:nth-child(4)').click();
    cy.contains('相对时间').should('be.visible');
    cy.contains('相对时间').click();
    cy.get(':nth-child(2) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type(4);
    cy.contains('确 认').click();
    cy.get('.ant-btn:nth-child(4)').should(($button) => {
      expect($button.text()).to.eq('未来第4天');
    })
  });

  it('basic property date 过去第2年', () => {
    cy.get('.ant-btn:nth-child(4)').click();
    cy.contains('相对时间').should('be.visible');
    cy.contains('相对时间').click();
    cy.get(':nth-child(3) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type(2);
    cy.contains('确 认').click();
    cy.get('.ant-btn:nth-child(4)').should(($button) => {
      expect($button.text()).to.eq('过去第2年');
    })
  });

  it('basic property date 未来第14年', () => {
    cy.get('.ant-btn:nth-child(4)').click();cy.contains('相对时间').should('be.visible')
    cy.get(':nth-child(4) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').type(14);
    cy.contains('确 认').click();
    cy.get('.ant-btn:nth-child(4)').should(($button) => {
      expect($button.text()).to.eq('未来第14年');
    })
  });

  it('basic property date 绝对时间 16号', () => {
    cy.get('.ant-btn:nth-child(4)').click();
    cy.contains('相对时间').should('be.visible');
    cy.contains('绝对时间').click();
    // cy.contains('2021').click();
    // cy.contains('Aug').click();
    cy.contains('16').click();
    
    cy.contains('确 认').click();
    cy.get('.ant-btn:nth-child(4)').should(($button) => {
      expect($button.text()).to.match(/\d{4}-\d{2}-16/);
    })
  });

  it('basic property date 周期时间 3 月', () => {
    cy.get('.ant-btn:nth-child(4)').click();
    cy.contains('相对时间').should('be.visible');
    cy.contains('周期时间').click();
    cy.get('#rc-tabs-0-panel-range > :nth-child(1) > .ant-select > .ant-select-selector').click();
    cy.contains('3 月').click();
    
    cy.contains('确 认').click();
    cy.get('.ant-btn:nth-child(4)').should(($button) => {
      expect($button.text()).to.eq('3 月');
    })
  });
});
