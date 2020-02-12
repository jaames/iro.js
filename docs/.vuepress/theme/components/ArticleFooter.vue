<template>
  <footer class="ArticleFooter">
    <div class="ArticleNav">
      <router-link v-if="prev" class="ArticleNav__prev" :to="prev.path">← {{ prev.title || prev.path }}</router-link>
      <router-link v-if="next" class="ArticleNav__next" :to="next.path">{{ next.title || next.path }} →</router-link>
    </div>
    <p class="ArticleFooter__editInfo">
      Caught a mistake or want to contribute to the documentation? <a v-if="editLink" :href="editLink" title="Edit page">Edit this page on github!</a>
    </p>
  </footer>
</template>
<script>
import { resolvePage, normalize, outboundRE, endingSlashRE } from '../util';

export default {
  props: ['items'],
  computed: {
    prev () {
      return resolvePageLink(LINK_TYPES.PREV, this)
    },
    next () {
      return resolvePageLink(LINK_TYPES.NEXT, this)
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

const LINK_TYPES = {
  NEXT: {
    resolveLink: resolveNext,
    getThemeLinkConfig: ({ nextLinks }) => nextLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.next
  },
  PREV: {
    resolveLink: resolvePrev,
    getThemeLinkConfig: ({ prevLinks }) => prevLinks,
    getPageLinkConfig: ({ frontmatter }) => frontmatter.prev
  }
}

function resolvePageLink (
  linkType,
  { $themeConfig, $page, $route, $site, items }
) {
  const { resolveLink, getThemeLinkConfig, getPageLinkConfig } = linkType

  // Get link config from theme
  const themeLinkConfig = getThemeLinkConfig($themeConfig)

  // Get link config from current page
  const pageLinkConfig = getPageLinkConfig($page)

  // Page link config will overwrite global theme link config if defined
  const link = pageLinkConfig == null ? themeLinkConfig : pageLinkConfig

  if (link === false) {
    return null;
  } else if (typeof link === 'string') {
    return resolvePage($site.pages, link, $route.path)
  } else {
    return resolveLink($page, items);
  }
}

function find (page, items, offset) {
  const res = []
  flatten(items, res)
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
      const match = res[i + offset];
      // check if result is an empty object. we dont want those
      if (typeof match === 'object' && Object.entries(match).length > 0) {
        return match;
      }
    }
  }
}

function flatten (items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === 'group') {
      flatten(items[i].children || [], res)
    } else {
      res.push(items[i])
    }
  }
}
</script>

<style lang="scss">
@import '@styles/config.scss';

.ArticleNav {
  display: flex;
  border: 1px solid mix($text-invert, $background-invert-alt, 25%);
  border-left-width: 0;
  border-right-width: 0;
  padding: 1.5em 0;
}

.ArticleNav__prev {
  margin-right: auto;
}

.ArticleNav__next {
  margin-left: auto;
}

.ArticleFooter__editInfo {
  font-size: .9em;
  color: $text-invert-alt;
  padding: 2em 0;
}
</style>