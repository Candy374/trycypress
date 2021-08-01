describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/data/login.html');
    cy.get('#username').type('24');
    cy.get('#password').type('Focuson789');
    cy.contains('登 录').click();

    cy.url().should('include', 'home');
  });

  it('successfully loads', () => {
    // cy.contains('数据表').click();
    // cy.contains('模型表').click();
    cy.visit('/data/index.html#test').then(() => {
      console.log(window);
      cy.contains('添加条件组').click();
      cy.get('.can-delete-line').should('be.visible');

      cy.get('.ant-input.ant-cascader-input').click();
      cy.contains('属性字段').click();
      cy.contains('名称').click();
      cy.get('.ant-input.show-error').type('testEmail');
      cy.contains('查询').click();
    });

    // cy.visit('/data/index.html#test');
    // cy.location().should((loc) => {
    //   console.log(loc.hash);
    //   expect(loc.hash).to.eq('#/test');

    //   cy.contains('添加条件组').click();
    // });

    // cy.visit('/data/index.html#test');
    // cy.visit('/data/index.html#test');
    // cy.wait(200);
    // cy.visit('/data/index.html#test');
    // cy.contains('添加条件组').click();
  });
});
