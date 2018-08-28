<template>
  <transition name="sw-update-popup">
    <div
      v-if="enabled"
      class="sw-update-popup"
    >
      {{message}}<br>
      <button @click="reload">{{buttonText}}</button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    updateEvent: {
      type: Object,
      default: null
    }
  },

  computed: {
    popupConfig () {
      for (const config of [this.$themeLocaleConfig, this.$site.themeConfig]) {
        const sw = config.serviceWorker
        if (sw && sw.updatePopup) {
          return typeof sw.updatePopup === 'object' ? sw.updatePopup : {}
        }
      }
      return null
    },

    enabled () {
      return Boolean(this.popupConfig && this.updateEvent)
    },

    message () {
      const c = this.popupConfig
      return (c && c.message) || 'New content is available.'
    },

    buttonText () {
      const c = this.popupConfig
      return (c && c.buttonText) || 'Refresh'
    }
  },

  methods: {
    reload () {
      if (this.updateEvent) {
        this.updateEvent.skipWaiting().then(() => {
          location.reload(true)
        })
        this.updateEvent = null
      }
    }
  }
}
</script>
