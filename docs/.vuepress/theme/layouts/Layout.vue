<template>
  <div class="Page">
    <div class="Sidebar">
      <header class="SidebarHeader">
        <router-link class="ProjectTitle" to="/">
          <h1>iro.js <sub>v5</sub></h1>
        </router-link>
      </header>
      <sidebar-menu class="SidebarBody" :items="sidebarItems"/>
    </div>
    <main class="Content">
      <docpage-navbar/>
      <article-header/>
      <article class="Article">
        <Content class="Markdown Markdown--invert-alt" />
      </article>
      <article-footer :items="sidebarItems"/>
    </main>
    <!-- <Navbar
      v-if="shouldShowNavbar && !$page.frontmatter.home"
      @toggle-sidebar="toggleSidebar"
    /> -->

    <!-- <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    ></div> -->

    <!-- <Sidebar
      v-if="!$page.frontmatter.home"
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <slot
        name="sidebar-top"
        #top
      />
      <slot
        name="sidebar-bottom"
        #bottom
      />
    </Sidebar> -->
<!-- 
    <Article
      v-else
      :sidebar-items="sidebarItems"
    >
    </Article> -->
  </div>
</template>

<script>
import SidebarMenu from '@components/Menu.vue';
import DocpageNavbar from '@components/DocpageNavbar.vue';
import ArticleHeader from '@components/ArticleHeader';
import ArticleFooter from '@components/ArticleFooter';
import { resolveSidebarItems } from '../util'

export default {
  components: {
    SidebarMenu,
    DocpageNavbar,
    ArticleHeader,
    ArticleFooter,
  },

  data () {
    return {
      isSidebarOpen: false
    }
  },

  computed: {
    sidebarItems () {
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
}

.Sidebar {
  // flex: 0 1 0;
  margin-left: 3em;
  width: 300px;
  max-height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: scroll;
  // padding: 24px;
}

.SidebarHeader {
  height: 128px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  // margin-bottom: 24px;
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
  width: 100%;
  padding: 0 24px;
  margin-left: 6em;
  // padding-top: 70px;
  max-width: 752px;
}

.Content__head {
  h1 {
    background: linear-gradient(45deg, $text-invert, $text-invert-alt);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
