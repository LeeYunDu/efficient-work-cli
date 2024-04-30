<template>
  <RichTextEditor v-model="value"  > </RichTextEditor>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import RichTextEditor from './richTextEditor.vue'
let value = ref('')
</script>