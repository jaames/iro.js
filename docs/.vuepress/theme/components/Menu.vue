<template>
  <aside class="Menu">
    <div class="MenuPanel">
      <h6 class="MenuPanel__title">Documentation</h6>
      <div 
        v-for="item in menuItems" 
        :class="{'MenuItem': true, 'MenuItem__active': item.isActivePage}" 
        :key="item.key"
      >
        <router-link 
          v-if="item.type === 'page' && !item.isActivePage"
          class="MenuItem__link"
          :to="item.regularPath"
        >
          {{ item.title }}
        </router-link>
        <span v-if="item.isActivePage" class="MenuItem__link">
          {{ item.title }}
        </span>
        <ul v-if="item.isActivePage" class="MenuItem__subItemList">
          <li class="MenuItem__subItem" v-for="header in item.headers" v-if="header.level < 3">
            <router-link class="MenuItem__subLink" :to="`${ item.regularPath }#${ header.slug }`">{{ header.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="MenuPanel">
      <h6 class="MenuPanel__title">Links</h6>
      <div v-for="item in $site.themeConfig.sidebarLinks"class="MenuItem">
        <a class="MenuItem__link" :href="item[0]">
          {{ item[1] }}
        </a>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  props: ['items'],
  computed: {
    menuItems() {
      return this.items.filter(item => Object.entries(item).length > 0).map(item => {
        item.isActivePage = item.type === 'page' && item.key === this.$page.key;
        return item;
      });
    }
  }
}
</script>

<style lang="scss">
@import '@styles/config.scss';

.Menu {
  a {
    color: $text-invert;
  }
}

.MenuPanel {
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 12px;
  color: $text-invert;
  background: $background-invert-alt;

  @media (min-width: $breakpoint-medium) {
    padding: 24px;
    margin-bottom: 24px;
  }
}

.MenuPanel__title {
  margin-bottom: 12px;
}

.MenuItem__subItemList {
  margin-left: 1em
}

.MenuItem__link, .MenuItem__subLink {
  color: $text-invert;
}

.MenuItem__active .MenuItem__link {
  display: inline-block;
  margin-left: -24px;
  padding-left: 24px;
  color: $anchor-color;
  border-left: 2px solid $anchor-color;
}

.MenuItem__active .MenuItem__link:last-child {
  margin-bottom: 0;
}

.MenuItem, .MenuItem__subItem {
  // padding: 0 1.2em;
  margin: .5em 0;
  line-height: 1.5;
}

.MenuItem, .MenuItem__subItem:last-child {
  margin-bottom: 0;
}

</style>