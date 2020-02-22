<template>
  <a class="GithubCard" :href="`https://github.com/${ author }/${ repo }`">
    <h4 class="GithubCard__title">{{ repo }}</h4>
    <div class="GithubCard__description">
      <slot></slot>
    </div>
    <div class="GithubCard__meta">
      <span class="GithubCard__path">
        {{ author }}/{{ repo }}
      </span>
      <span v-if="success" class="GithubCard__stars">
        {{ stars }} ★
      </span>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    author: {
      type: String,
      default: ''
    },
    repo: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    success: false,
    stars: 0
  }),
  mounted() {
    fetch(`https://api.github.com/repos/${ this.author }/${ this.repo }`)
      .then(res => {
        if (!res.ok) throw `Repo data could not be fetched`;
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.success = true;
        this.stars = data['stargazers_count'];
      }).catch(() => {
        this.success = false;
      })
  }
}
</script>

<style lang="scss" scoped>
  @import '@styles/config.scss';

  .GithubCard {
    display: flex;
    flex-direction: column;
    background: $background-invert-alt;
    color: $text-invert;
    padding: 24px;
    border-radius: 12px;
    transition: transform .2s;

    &:hover {
      color: $text-invert;
      transform: scale(1.025);
    }
  }

  .GithubCard__description {
    color: mix($text-invert, $text-invert-alt, 50%);
    // margin-top: 4px
  }

  .GithubCard__meta {
    margin-top: auto;
    padding-top: 12px;
    font-size: .75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>