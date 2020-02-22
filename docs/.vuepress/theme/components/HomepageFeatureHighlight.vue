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

<style lang="scss" scoped>
@import '@styles/config.scss';

.FeatureHighlight {
  display: flex;
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

.FeatureHighlight__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  // max-width: 100%;
  max-width: $mobile-wrapper-width;
  width: 100%;
  margin: 0 auto;

  h3 {
    margin-bottom: 1em;
  }
}

.FeatureHighlight__secondary {
  padding-top: 3rem;
  max-width: 100%;
}

@media (min-width: $breakpoint-medium) {
  .FeatureHighlight {
    width: 100%;
    max-width: $wrapper-width;
    display: flex;
    flex-direction: row;
  }

  .FeatureHighlight__main {
    flex: 1;
    max-width: 100%;
    margin-right: 5%;
    display: default;
    text-align: left;
    align-items: flex-start;
  }

  .FeatureHighlight__secondary {
    padding: 0;
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .FeatureHighlight.FeatureHighlight--reverse {
    flex-direction: row-reverse;

    .FeatureHighlight__secondary {
      justify-content: flex-start;
    }

    .FeatureHighlight__main {
      margin-right: 0;
      margin-left: 5%;
    }
  }
}

.FeatureHighlight.FeatureHighlight--column {
  display: block;
  text-align: left;

  .FeatureHighlight__main, .FeatureHighlight__secondary {
    margin: 0 auto;
  }

  .FeatureHighlight__main {
    align-items: center;
    margin-bottom: 1em;
  }

  .FeatureHighlight__secondary {
    justify-content: normal;
  }

}
</style>