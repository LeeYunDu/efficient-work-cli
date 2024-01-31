<template>
  <UiForm
    v-bind="formOptions"
    ref="formRef"
    :model="state.params"
    :labels="formFields"
  >
    <template #upload="{item}">
      <upload-component
        v-model="state.params[item.key]"
        v-bind="item.props"
      />
    </template>
    <!-- label附带提示语 -->
    <template #label-address="{label,props}">
      
    </template>
</UiForm>
</template>
<script lang="ts" setup>
import { ref} from 'vue'
import { UiForm } from 'static/lib/entry'

const formOptions = {
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'top',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
  },
  options: {
    gridItem: { span: 24 }
  }
}

</script>