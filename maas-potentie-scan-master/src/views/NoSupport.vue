<template>
  <div class="no-support container">
    <div class="row">
      <div class="col-md-12 text-center">
        <h1 class="cyan--text super-title">MaaS</h1>
        <h3 class="pink--text sub-title">Potentie Scan</h3>
      </div>
    </div>
    <div class="row text-center">
      <div class="col-md-12 mt-5 mb-5">
        <h2>Browser wordt niet ondersteund</h2>
        <p>
          De huidige internet browser wordt niet ondersteund door de MaaS
          potentiescan. Gebruik hiervoor een van de onderstaande browsers
        </p>
      </div>
      <div class="col-xl-3 col-lg-6 mb-5">
        <h2>Chrome</h2>
        <img width="img-responsive" src="../assets/img/icon/chrome.png" />
        <br />
        <span> Chrome 68 of hoger</span><br />
        <a href="https://www.google.com/chrome/" class="btn white--text pink"
          >Download</a
        >
      </div>
      <div class="col-xl-3 col-lg-6 mb-5">
        <h2>FireFox</h2>
        <img width="img-responsive" src="../assets/img/icon/firefox.png" />
        <br />
        <span> FireFox 61 of hoger</span><br />
        <a
          href="https://www.mozilla.org/firefox/new/"
          class="btn white--text pink"
          >Download</a
        >
        <br />
      </div>
      <div class="col-xl-3 col-lg-6">
        <h2>Edge</h2>
        <img width="img-responsive" src="../assets/img/icon/edge.png" /> <br />
        <span class="h4 mt-3"
          >Standaard Meegeleverd met laatste Windows 10</span
        >
        <br />
        <span>Edge 15.0 of hoger</span>
      </div>
      <div class="col-xl-3 col-lg-6">
        <h2>Safari</h2>
        <img width="img-responsive" src="../assets/img/icon/safari.png" />
        <br />
        <span class="h4 mt-3">Standaard Meegeleverd met laatste Mac OS </span>
        <br />
        <span> Safari 11 of hoger</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.no-support {
  h1 {
    font-size: 3.5rem;
  }
  p {
    font-size: 1.6rem;
  }
  body {
    font-size: 2rem;
  }
  .pink {
    font-size: 1.5rem;
  }
  img {
    width: 50%;
  }
}
</style>
