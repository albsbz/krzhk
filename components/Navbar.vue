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
        :class="{ 'is-active': isHamburgerOpen }"
        @click="openHamburger"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isHamburgerOpen }"
    >
      <div class="navbar-start">
        <NuxtLink to="/" class="navbar-item"> Главная </NuxtLink>

        <NuxtLink to="/articles" class="navbar-item">
          О развитии ребенка
        </NuxtLink>

        <div class="navbar-item has-dropdown is-hoverable">
          <NuxtLink to="/schools" class="navbar-item">
            Направления кружков
          </NuxtLink>
          <div class="navbar-dropdown">
            <a
              v-for="tag of tags"
              :key="tag"
              class="navbar-item"
              @click.prevent="setTag(tag)"
            >
              {{ tag }}
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

        <div class="navbar-item">
          <div class="buttons">
            <a
              class="button is-primary has-background-success"
              @click.prevent="showModal = !showModal"
              >Написать нам</a
            >
          </div>
        </div>

        <!-- <NuxtLink to="/contacts" class="navbar-item" @click>
          Написать нам
        </NuxtLink> -->
        <!-- <div class="navbar-item has-dropdown is-hoverable">
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
        -->
        <!-- <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary has-background-success">
              <strong>Регистрация</strong>
            </a>
            <a class="button is-light">
              Вход
            </a>
          </div>
        </div>  -->
      </div>
    </div>
    <!-- Modal -->
    <div :class="{ 'is-active': showModal }" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Что бы вы хотели написать нам?</p>
          <button
            class="delete"
            aria-label="close"
            @click="showModal = !showModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <form
            action="https://mailthis.to/krzhk"
            method="POST"
            encType="multipart/form-data"
          >
            <div class="field">
              <label class="label">Имя</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="name"
                  placeholder="Ваше имя"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Ваш E-mail</label>
              <div class="control">
                <input
                  type="email"
                  name="_replyto"
                  class="input"
                  placeholder="Електронная почта"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Ваше сообщение</label>
              <div class="control">
                <textarea
                  name="message"
                  class="input"
                  placeholder="Сообщение"
                ></textarea>
              </div>
            </div>
            <input
              type="hidden"
              name="_subject"
              value="Contact form submitted"
            />
            <input type="hidden" name="_after" value="/" />
            <input type="hidden" name="_honeypot" value="" />
            <input type="hidden" name="_confirmation" value="" />
            <input type="submit" value="Send" class="hidden" id="myform" />
          </form>
        </section>
        <footer class="modal-card-foot">
          <label class="button is-success" for="myform" tabindex="0"
            >Отправить</label
          >
        </footer>
      </div>
    </div>
    <!-- Modal end-->
  </nav>
</template>

<script>
export default {
  // async asyncData(context) {
  //   await context.store.dispatch("schools/fetchSchools");
  // },
  // async fetch() {
  //   console.log("fetch");
  //   await this.$store.dispatch("schools/fetchSchools");
  // },
  // fetchOnServer: false,
  data() {
    return {
      isHamburgerOpen: false,
      tags: [],
      showModal: false
    };
  },
  // computed: {
  //   tags() {
  //     return
  //   }
  // },
  async created() {
    await this.$store.dispatch("schools/fetchSchools");
    this.tags = this.$store.getters["schools/tags"];
  },
  methods: {
    openHamburger() {
      this.isHamburgerOpen = !this.isHamburgerOpen;
    },
    setTag(tag) {
      this.$store.commit("schools/setFilterTag", tag);
      this.$router.push({ path: "schools" });
    }
  }
};
</script>

<style>
.search {
  max-width: 100px;
}
.hidden {
  display: none;
}
</style>
