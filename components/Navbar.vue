<template>
  <nav class="navbar " role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="@/static/logo.png" />
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Главная
        </a>

        <a class="navbar-item">
          О развитии ребенка
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Направления кружков
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              Школьная программа
            </a>
            <a class="navbar-item">
              Дополнительное образование
            </a>
            <a class="navbar-item">
              Искуство
            </a>
            <a class="navbar-item">
              Спорт
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field has-addons search">
            <p class="control">
              <input class="input" type="text" placeholder="Найти..." />
            </p>
          </div>
        </div>

        <a class="navbar-item">
          Связаться с нами
        </a>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Город
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              Запорожье
            </a>
            <a class="navbar-item">
              Киев
            </a>
          </div>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary has-background-success">
              <strong>Регистрация</strong>
            </a>
            <a class="button is-light">
              Вход
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.search {
  max-width: 100px;
}
</style>
