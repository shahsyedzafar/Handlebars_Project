(function() {

  renderPage();
  renderDogs();

  function renderPage() {
    var rendered = App.templates.index(window.language);
    $('#main').html(rendered);

    $('#languageSwitch').click(function() {
      DogPack.switchLanguage();
    });

  }

  function renderDogs() {
    var filteredDogs = DogPack.getFilteredDogs(DogPack.dogs),
        rendered = App.templates.dogs({
          dogs: DogPack.getPaginatedDogs(filteredDogs),
          language: window.language
        });
    $('#theDogs').html(rendered);
    attachDogButtons();
    renderPages(filteredDogs);
    renderScore();
  }

  function renderScore() {
    var rendered = App.templates.score({
          dogs: DogPack.dogs,
          language: window.language
        });
    $('#score').html(rendered);
    $('#score').find('small').click(function() {
      DogPack.clearDogs();
      window.location.href = '?' +
        Handlebars.helpers.getLanguageFilter(window.language.langId);
    });
  }

  function renderPages(dogs) {
    var rendered = App.templates.page({ dogs: dogs });
    $('#pagination').html(rendered);
  }

  function attachDogButtons() {
    $('.dog-button').click(function() {
      var id = $(this).closest('.dog-card').data('dog-id');
      DogPack.chooseDog(id);
      renderDogs();
    });

    $('.not-dog-button').click(function() {
      var id = $(this).closest('.dog-card').data('dog-id');
      DogPack.chooseNotDog(id);
      renderDogs();
    });
  }
})();
