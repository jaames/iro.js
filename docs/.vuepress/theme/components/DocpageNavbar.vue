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

  input {
    font-size: 1em;
    color: $text-invert;
    background-color: $background-invert-alt;
    border: 0;
    border-radius: 6px;
    width: 100% !important;
    height: 2.5em;
    background-position: 1em center;
    padding: 0;
    left: 0 !important;
    padding-left: 2.5em;
  }

  input.focused {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .suggestions {
    color: $text-invert;
    background-color: $background-invert-alt;
    border-radius: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    left: 0;
    right: 0;
    top: 100%;
    width: 100%;
    border: 0;

    a {
      color: $text-invert;
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