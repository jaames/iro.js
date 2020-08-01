<template>
  <div :class="{'LanguageSelect': true, 'LanguageSelect--isOpen': isOpen}" v-click-outside="hide" @click="toggleDropdown">
    <div class="LanguageSelect__button">
      {{ selectText }} &#9660;
    </div>
    <div class="LanguageSelect__list" v-show="isOpen">
      <router-link 
        class="LanguageSelect__listItem"
        v-for="link in links" 
        :to="link.path"
      >
        {{ link.label }}
      </router-link>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  directives: {
    ClickOutside
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    selectText() {
      const { locales } = this.$site.themeConfig;
      const currentLocalePath = this.$localePath;
      const currentLocale = locales[currentLocalePath];
      return currentLocale.selectText;
    },
    links() {
      const { routes } = this.$router.options;
      const { locales } = this.$site.themeConfig;
      const currentPath = this.$page.path;
      const currentLocalePath = this.$localePath;
    
      return Object.keys(locales).map(localePath => {
        const locale = locales[localePath];
        const { selectText, label, lang } = locale;
        let isCurrent = false;
        let pagePath;
        if (lang === this.$lang) {
          isCurrent = true;
          pagePath = currentPath;
        } else {
          // Try to stay on the same page
          pagePath = currentPath.replace(currentLocalePath, localePath);
          // fallback to homepage if that page doesn't exist (isn't translated);
          if (!routes.some(route => route.path === pagePath))
            pagePath = localePath;
        }
        return {
          isCurrent,
          selectText,
          label,
          lang,
          path: pagePath
        }
      });
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    hide() {
      this.isOpen = false;
    }
  },
};
</script>

<style lang="scss">
@import '@styles/config.scss';

$button-size: 44px;

.LanguageSelect {
  display: inline-block;
  font-size: 1rem;
  position: relative;
  z-index: 100;
}

.LanguageSelect__button {
  color: $text-invert;
  height: $button-size;
  border: 2px solid rgb(192, 196, 216);
  // background: rgb(89, 89, 99);
  border-radius: $button-size/2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  font-size: 1rem;
  transition: color .2s, border-color .2s, background-color .2s;
  cursor: pointer;
}

// .LanguageSelect__button:hover,
.LanguageSelect--isOpen .LanguageSelect__button {
  background-color: $text-invert;
  color: $text;
  border-color: $text-invert;
}

.LanguageSelect__list {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: -8px;
  padding: 8px;
  padding-top: $button-size + 12px;
  border-radius: ($button-size / 2) + 8px;
  text-align: left;
}

.LanguageSelect--isOpen .LanguageSelect__list {
  background: lighten($background-invert-alt, 12);
}

.LanguageSelect__listItem {
  display: block;
  padding: 8px 0px;
  padding-left: 20px;
  border: 0 !important;
  text-decoration: none;
}

.LanguageSelect__listItem:hover {
  background: $background-invert;
  color: $primary-color;
  border-radius: $button-size / 2;
}

</style>