<template>
  <v-app id="app">
    <div class="menu row">
      <div class="col-lg-3">
        <router-link to="/">
          <button class="btn btn-tertiary bottom-cut active">
            Potentiescan
          </button>
        </router-link>
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-tertiary bottom-cut dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Noord-Brabant
          </button>
          <div class="dropdown-menu">
            <router-link class="dropdown-item" to="/brabant/modalsplit">
              Modal Split
            </router-link>
            <!-- <router-link class="dropdown-item" to="/brabant"> -->
            <!-- Intensity -->
            <!-- </router-link> -->
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </v-app>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import "./assets/scss/app.scss";
</style>
