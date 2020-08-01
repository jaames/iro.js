<template>
  <nav class="Navbar">
    <search-box class="SearchBox"/>
  </nav>
</template>

<script>
import SearchBox from '@SearchBox';

export default {
  components: { SearchBox }
}
</script>

<style lang="scss">
@import '@styles/config.scss';

$input-height: 44px;

.Navbar {
  display: flex;
  align-items: center;
  padding: 12px 0;

  @media (min-width: $breakpoint-medium) {
    height: 128px;
    padding: 0;
  }
}

.SearchBox {
  width: 100%;
  display: block;
  margin: 0;
  position: relative;
  z-index: 0;

  input {
    font-size: 1rem;
    color: $text-invert;
    background-color: $background-invert-alt;
    border: 0;
    width: 100% !important;
    height: $input-height;
    border-radius: $input-height / 2;
    background-position: 1em center;
    padding: 0;
    left: 0 !important;
    padding-left: $input-height;
  }

  input.focused {
    background-color: $text-invert;
    color: $text;
    border-color: $text-invert;
    // border-bottom-left-radius: 0;
    // border-bottom-right-radius: 0;
  }

  .suggestions {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    color: $text-invert;
    width: auto;
    border: 0;
    background: lighten($background-invert-alt, 12);
    margin: -8px;
    padding: 8px;
    border-radius: calc(#{$input-height / 2} + 8px);
    padding-top: $input-height * 1.5;

    a {
      color: $text-invert;
    }

    .suggestion {
      border-radius: $input-height / 2;
      padding: 8px 20px;
    }

    .suggestion.focused {
      background: $background-invert;
    }

    .suggestion.focused a {
      color: $primary-color;
    }
  }

}
</style>