<template>
  <div class="container" :class="pageClasses">
    <Sidebar v-if="!$page.frontmatter.home" :items="sidebarItems">
      <slot name="sidebar-top" slot="top"/>
      <slot name="sidebar-bottom" slot="bottom"/>
    </Sidebar>

    <div class="custom-layout" v-if="$page.frontmatter.layout">
      <component :is="$page.frontmatter.layout"/>
    </div>

    <Home v-else-if="$page.frontmatter.home"/>

    <Page v-else :sidebar-items="sidebarItems">
      <slot name="page-top" slot="top"/>
      <slot name="page-bottom" slot="bottom"/>
    </Page>

    <SWUpdatePopup :updateEvent="swUpdateEvent"/>
  </div>
</template>

<script>
import Vue from 'vue'
import Home from './Home.vue'
import Page from './Page.vue'
import Sidebar from './Sidebar.vue'
import SWUpdatePopup from './SWUpdatePopup.vue'
import { resolveSidebarItems } from './util'

export default {
  components: { Home, Page, Sidebar, SWUpdatePopup },

  data () {
    return {
      swUpdateEvent: null
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false ||
        themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.layout &&
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },

    sidebarItems () {

      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  mounted () {
    window.addEventListener('scroll', this.onScroll)
    this.$on('sw-updated', this.onSWUpdated)
  },

  methods: {
    onSWUpdated (e) {
      this.swUpdateEvent = e
    }
  }
}
</script>
<style src="./styles/theme.scss" lang="scss"></style>
