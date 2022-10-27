<template>
  <div class="code-block" :style="style">
    <button class="copy" @click="copy">Copy</button>
    <pre style="text-align: left" v-html="highlight"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Prism from 'prismjs';
import 'prismjs/components';

@Options({
  props: {
    code: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '500px',
    },
    height: {
      type: String,
      default: '350px',
    },
  },
})
export default class HomeView extends Vue {
  code!: string;

  width!: string;

  height!: string;

  get style(): unknown {
    return {
      width: this.width,
      height: this.height,
    };
  }

  get highlight(): string {
    return Prism.highlight(this.code, Prism.languages.javascript, 'Javascript');
  }

  copy() {
    navigator.clipboard.writeText(this.code)
      .catch(() => console.error('Failed to copy.'));
  }
}
</script>

<style lang="scss" scoped>
.code-block {
  position: relative;
  overflow: auto;
  padding: 0 16px;
  background: white;
  filter: drop-shadow(0 0 5px rgba(68, 68, 68, 0.25));
}

.copy {
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  padding: 4px 8px;
  border-radius: 8px;
  cursor: pointer;
  background: #e1e1e1;
  color: #1e1e1e;
  transition: background 125ms ease-out;
}

.copy:hover {
  background: #c5c5c5;
}
</style>
