<template>
  <header class="ArticleHeader">
    <h1 class="ArticleHeader__title">
      {{ $page.title }}
    </h1>
  </header>
</template>

<style lang="scss">
@import '@styles/config.scss';

.ArticleHeader {
  padding-top: .25em;
}

.ArticleHeader__title {
  // this messes up rendering?
  // background: linear-gradient(45deg, $text-invert, $text-invert-alt);
  // background-clip: text;
  // -webkit-text-fill-color: transparent;
}
</style>