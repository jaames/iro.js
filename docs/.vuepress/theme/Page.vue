<template>
  <div class="page">
    <slot name="top"/>

    <h1 class="title">{{$page.title}}</h1>

    <Content class="markdown" :custom="false"/>

    <div class="pageNav" v-if="prev || next">
      <router-link v-if="prev" :to="prev.path" class="pageNav__prev">
        ← {{ prev.title || prev.path }}
      </router-link>
      <router-link v-if="next" :to="next.path" class="pageNav__next">
        {{ next.title || next.path }} →
      </router-link>
    </div>

    <div class="pageFooter">
      Caught a mistake or want to contribute to the documentation?
      <a :href="editLink" target="_blank" rel="noopener noreferrer">
        Edit this page on GitHub<OutboundLink/>
      </a>
    </div>

    <slot name="bottom"/>
  </div>
</template>

<script>
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'

export default {
  props: ['sidebarItems'],

  computed: {
    prev () {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },

    next () {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },

    editLink () {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }
      if (docsRepo && editLinks) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, path)
      }
    }
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : repo
        return (
          base.replace(endingSlashRE, '') +
           `/${docsBranch}` +
           (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
           path +
           `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`

      return (
        base.replace(endingSlashRE, '') +
        `/edit/${docsBranch}` +
        (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
        path
      )
    }
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = []
  items.forEach(item => {
    if (item.type === 'group') {
      res.push(...item.children || [])
    } else {
      res.push(item)
    }
  })
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === page.path) {
      return res[i + offset]
    }
  }
}
</script>
<style lang="scss">
  @import "./styles/config.scss";

  .page {
    width: 100%;
    padding: 0 16px;
    padding-top: $mobile-navbar-height;
    max-width: 720px + 16px * 2;

    @include breakpoint(medium) {
      flex: 1;
      margin-left: 240px;
      padding: 0 24px;
      max-width: 720px + 24px * 2;
    }
    @include breakpoint(large) {
      margin-left: 320px;
    }
  }

  .title {
    display: inline-block;
    // color: $primary-color;
    font-size: 2rem;
    margin: 2rem 0;
    @include breakpoint(medium) {
      margin: 4rem 0 2rem 0;
    }
  }

  .pageNav {
    margin: 2rem 0;
    display: flex;
  }

  .pageNav__prev {
    margin-right: auto;
  }

  .pageNav__next {
    margin-left: auto;
  }

  .pageFooter {
    color: $dark-gray;
    padding: 2em 0;
    border-top: 1px solid $medium-gray;
    font-size: .9em;
  }
</style>

