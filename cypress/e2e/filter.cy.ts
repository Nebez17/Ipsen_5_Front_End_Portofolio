describe('FilterComponent', () => {
  beforeEach(() => {
    cy.visit('/home');
    cy.visit('/official_selection');

  })

  it('should filter on title', () => {
    let title;
    cy.get('#bigPost').get('#bigPostTitle').then(($title) => {
      title = $title.text();
      cy.get('input[formControlName="search"]').type(title);

      cy.get('button[type="submit"]').click();

      cy.get('#bigPost').click({force: true});
      cy.get('#title').should('contain', title);
    })

  });

  it('Should filter on genre', () => {
    cy.get('#genreCheckboxFantasy').check();
    cy.get('button[type="submit"]').click();
    cy.get('#bigPost').click({force: true});
    cy.get('#genreTags').should('contain', 'Fantasy');
  });

  it('Should filter on rating', () => {
    cy.get('#ratingSlider .ngx-slider-pointer-min').type('{rightarrow}');

    cy.get('#ratingSlider .ngx-slider-pointer-max').type('{leftarrow}');


    cy.get('button[type="submit"]').click();
    cy.get('#bigPost').click({force: true});
    cy.get('#starsComponent').within(() => {
      cy.get('img[src$="Full_Star.png"]').should('have.length', 3);
    });
  });

  it('Should filter on date', () => {
    cy.get('input[formControlName="date"]').type('2024-06-19');
    cy.get('button[type="submit"]').click();
    cy.get('#bigPost').click({force: true});
    cy.get('#date').then(($date) => {
      const postDate = new Date($date.text().trim());
      const selectedDate = new Date('2024-06-19');
      expect(postDate).to.be.gte(selectedDate);
    });
  });

});
