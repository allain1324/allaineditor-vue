<template>
  <div style="display: flex; gap: 10px">
    <router-link to="/">
      <p>Preview</p>
    </router-link>
    <router-link to="/2json">
      <p>ToJSON</p>
    </router-link>
    <router-link to="/json2editor">
      <p>JSON2Editor</p>
    </router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BasicDemo from './pages/Preview.vue'
import VModelHTMLDemo from './pages/ToJSON.vue'

export default defineComponent({
  components: {
    BasicDemo,
    VModelHTMLDemo,
  },
  setup() {
    const type = ref('')

    function changeType(newType: string) {
      type.value = newType
    }

    return {
      type,
      changeType,
    }
  },
})
</script>

<style>
html {
  height: 100%;
}
</style>
