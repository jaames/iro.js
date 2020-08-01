<template>
  <div class="Page">
    <div :class="{'Sidebar': true, 'Sidebar--isOpen': isSidebarOpen}">
      <header class="SidebarHeader">
        <router-link class="ProjectTitle" to="/">
          <h1>iro.js <sub>v5</sub></h1>
        </router-link>
        <div class="SidebarHeader__sidebarToggle" @click="toggleSidebar">
          <span :class="['menuIcon', isSidebarOpen ? 'menuIcon--active' : '']"></span>
        </div>
      </header>
      <sidebar-menu class="SidebarBody" :items="sidebarItems"/>
    </div>
    <main class="Content">
      <div class="Content__nav">
        <docpage-navbar class="Content__search"/>
        <LanguageSelect class="Content__language"/>
      </div>
      <article-header/>
      <article class="Article">
        <Content class="Markdown Markdown--invert-alt" />
      </article>
      <article-footer :items="sidebarItems"/>
    </main>
  </div>
</template>

<script>
import SidebarMenu from '@components/Menu.vue';
import LanguageSelect from '@components/LanguageSelect';
import DocpageNavbar from '@components/DocpageNavbar.vue';
import ArticleHeader from '@components/ArticleHeader';
import ArticleFooter from '@components/ArticleFooter';
import { resolveSidebarItems } from '../util'

export default {
  components: {
    SidebarMenu,
    LanguageSelect,
    DocpageNavbar,
    ArticleHeader,
    ArticleFooter,
  },
  data () {
    return {
      isSidebarOpen: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  },
  watch: {
    isSidebarOpen(isOpen) {
      if (document !== undefined) {
        if (isOpen) {
          document.body.classList.add('no-scroll');
        } else {
          document.body.classList.remove('no-scroll')
        }
      }
    }
  },
  computed: {
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      ).filter(item => {
        return !(item.frontmatter && item.frontmatter.home === true)
      })
    },
  },

  mounted () {
    // clear styles applied by the homepage color picker demo
    document.body.style.background = 'none';
    // close the sidebar when navigating to another route
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },
}
</script>

<style src="../styles/theme.scss" lang="scss"></style>
<style lang="scss">
@import '@styles/config.scss';

.Page {
  color: $text-invert;
  background: $background-invert;
  display: flex;
  font-size: 18px;
  max-width: 100vw;
  align-items: flex-start;
}

.Sidebar {
  
  @media (min-width: $breakpoint-medium) {
    width: 260px;
    max-height: 100vh;
    position: sticky;
    top: 0px;
    overflow-y: scroll;
  }

  @media (min-width: $breakpoint-large) {
    width: 300px;
    margin-left: 3em;
  }
  

  // padding: 24px;
}

.SidebarHeader {
  height: $mobile-navbar-height;
  display: flex;
  background: $background-invert-alt;
  align-items: center;
  padding: 0 12px;

  .SidebarHeader__sidebarToggle {
    margin-left: auto;
  }

  @media (min-width: $breakpoint-medium) {
    height: $navbar-height;
    padding: 0 12px;
    background: none;

    .SidebarHeader__sidebarToggle {
      display: none;
    }
  }

  @media (max-width: $breakpoint-medium) {
    position: fixed;
    left: 0;
    width: 100%;
    z-index: 1000;
  }
  // margin-bottom: 24px;
}

.SidebarHeader__sidebarToggle {
  .menuIcon {
    position: relative;
    margin: ($mobile-navbar-toggle-height / 3) 0;
  }

  .menuIcon, .menuIcon:before, .menuIcon:after {
    transition: background-color, transform 0.2s ease;
    background-color: $primary-color;
    display: block;
    width: $mobile-navbar-toggle-height;
    height: 2px; 
  }

  .menuIcon:before, .menuIcon:after { position: absolute; content: ""; }
  .menuIcon:before { top: -$mobile-navbar-toggle-height / 3; }
  .menuIcon:after { top: $mobile-navbar-toggle-height / 3; }

  .menuIcon.menuIcon--active { background-color: transparent; }
  .menuIcon.menuIcon--active:before { transform: translateY($mobile-navbar-toggle-height / 3) rotate(45deg); }
  .menuIcon.menuIcon--active:after { transform: translateY(-$mobile-navbar-toggle-height / 3) rotate(-45deg); }
}

.SidebarBody {
  padding: 0 12px;

  @media (max-width: $breakpoint-medium) {
    background: $background-invert;
    position: fixed;
    top: $mobile-navbar-height;
    width: 100%;
    height: calc(100% - #{$mobile-navbar-height});
    z-index: 1000;
    overflow-y: scroll;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    padding: 12px;

    .Sidebar--isOpen & {
      left: 0;
      transform: translateX(0);
    }
  }
}

.ProjectTitle {
  color: inherit;

  h1 {
    font-weight: 700;
    font-size: 2em;
    margin-bottom: 0;
    line-height: 1;
  }

  sub {
    color: $text-invert-alt;
    font-size: .5em;
    font-weight: 400;
    bottom: 0;
    margin-left: .1em;
  }
}


.Content {
  // width: 100%;
  padding: 0 12px;
  padding-top: $mobile-navbar-height;
  max-width: 752px;

  @media (min-width: $breakpoint-medium) {
    padding: 0 24px;
  }

  @media (min-width: $breakpoint-large) {
    margin-left: 6em;
  }
}

.Content__head {
  h1 {
    background: linear-gradient(45deg, $text-invert, $text-invert-alt);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.Content__nav {
  display: flex;
  align-items: center;
}

.Content__search {
  flex: 1;
  margin-right: 16px;
}
</style>
