<template>
  <div class="Tutorial">
    <div v-if="useTabs" class="Tutorial__head">
      <ul class="Tutorial__tabs TabGroup">
        <li :class="['TabGroup__item', tab === activeTab ? 'TabGroup__item--active' : '']" v-for="tab in tabs" @click="setActiveTab(tab)">
          {{ tab }}
        </li>
      </ul>
    </div>
    <div class="Tutorial__body Markdown Markdown--invert">
      <slot v-if="useTabs" :name="activeTab"></slot>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    useTabs: {
      type: Boolean,
      default: true
    },
    tabs: {
      type: Array,
      default: () => ['a', 'b', 'c']
    },
    defaultTab: String
  },
  data: (vm) => ({
    activeTab: vm.defaultTab
  }),
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/config.scss';

.Tutorial {
  @media (max-width: $breakpoint-small) {
    margin: 0 -12px;
  }
}

.Tutorial__body {
  font-size: 18px;
  color: mix($text-invert, $text-invert-alt, 50%);
  background-color: $background-invert-alt;
  border-radius: 12px;
  padding: 24px;
  margin-top: 32px;
  @media (max-width: $breakpoint-small) {
    border-radius: 0;
    padding: 12px;
  }
}

.TabGroup {
  width: 320px;
  margin: 0 auto;
  display: flex;
  list-style-type: none;
  background-color: $background-invert-alt;
  border-radius: 12px;
  padding: 12px 0;
}

.TabGroup__item {
  flex: 1;
  position: relative;
  text-align: center;
  color: $text-invert-alt;
  border-right: 1px solid rgba($text-invert-alt, .75);
  cursor: pointer;

  &:last-of-type {
    border: 0;
  }
}

.TabGroup__item.TabGroup__item--active {
  color: $text-invert;

  &::after {
    content: ' ';
    display: block;
    width: 16px;
    height: 16px;
    position: absolute;
    bottom: -52px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    background: $background-invert-alt;
  }
}

.Tutorial .header-anchor {
  display: none;
}
</style>