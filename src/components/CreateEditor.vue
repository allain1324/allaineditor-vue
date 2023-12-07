<template>
  <div style="border: 1px solid #ccc">
    <Toolbar v-bind="$attrs" style="border-bottom: 1px solid #ccc" />
    <Editor ref="refEditor" v-bind="$attrs" :defaultConfig="editorConfig" style="height: 500px" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef, onBeforeUnmount, onMounted } from 'vue'
import { IDomEditor } from '@wangeditor/editor'
import Editor from './Editor.vue'
import Toolbar from './Toolbar.vue'

export default defineComponent({
  components: {
    Editor,
    Toolbar,
  },
  setup() {
    // 编辑器相关配置
    const editorConfig = {
      placeholder: '请输入内容...',
    }
    const refEditor = ref(null)

    const setJSONToEditor = (contentApi: string) => {
      if (refEditor.value) {
        (refEditor.value as any).setJSONToEditor(contentApi)
      }
    }

    return {
      editorConfig,
      setJSONToEditor,
      refEditor,
    }
  },
})
</script>
