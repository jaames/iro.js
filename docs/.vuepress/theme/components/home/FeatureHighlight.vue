<template>
  <div :class="{
    'FeatureHighlight': true,
    'FeatureHighlight--column': column,
    'FeatureHighlight--reverse': reverse,
  }">
    <div class="FeatureHighlight__main">
      <slot name="header"></slot>
    </div>
    <div class="FeatureHighlight__secondary">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    'reverse': Boolean,
    'column': Boolean
  }
}
</script>

<style lang="scss">
@import '@styles/config.scss';

.FeatureHighlight {
  display: flex;
  max-width: $mobile-wrapper-width;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  padding-top: 5rem;
  padding-bottom: 5rem;
  align-items: center;

  &:last-child {
    padding-bottom: 0;
  }
}

.FeatureHighlight__title {
  font-size: 1.25rem;
  margin-bottom: 18px;
}

.FeatureHighlight.FeatureHighlight--column {
  display: block;
  text-align: left;

  .FeatureHighlight__secondary {
    justify-content: normal;
  }
}

.FeatureHighlight__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

@media (min-width: $breakpoint-medium) {
  .FeatureHighlight {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .FeatureHighlight__main {
    flex: 1;
    display: default;
    text-align: left;
  }

  .FeatureHighlight__secondary {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .FeatureHighlight.FeatureHighlight--reverse {
    flex-direction: row-reverse;

    .FeatureHighlight__secondary {
      justify-content: flex-start;
    }
  }
}
</style>