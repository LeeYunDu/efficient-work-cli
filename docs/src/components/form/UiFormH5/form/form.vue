<template>
  <section class="ui-component ui-form">
    <van-form
      ref="vanFormRef"
      v-model="model"
      v-bind="formProps"
      :class="attr.type"
    >
      <template v-for="(item, i) in useGroups" :key="i">
        <template v-if="item.type ==='select'">
          <SimpleSelect v-model:params="model" :field="item" @choose="setParams" />
        </template>
        <template v-else-if="item.type ==='datePicker'">
          <SimpleDatePicker v-model:params="model" :field="item" @choose="setParams" />
        </template>
        <template v-else-if="item.type ==='radio'">
          <SimpleRadio v-model:params="model" :field="item" @choose="setParams" />
        </template>
        <template v-else-if="item.type ==='upload'">
          <SimpleUpload v-model:params="model" :field="item" @choose="setParams" />
        </template>
        <template v-else>
          <van-field
            v-model="params[item.key]"
            :name="item.key"
            :label="item.label"
            :placeholder="usePlaceholder(item)"
            v-bind="item.props"
            :rules="useRules(item)"
          >
            <template v-if="item.label" #label>
              <slot :name="`${item.key}-label`" v-bind="item">
                <span>{{ item.label }} </span>
              </slot>
            </template>
            <template v-if="item.props.suffix" #extra>
              <span>{{ item.props.suffix }}</span>
            </template>

            <template v-if="item.type=='slot'" #input>
              <slot :name="item.slotName || `${item.key}-input`" v-bind="item"></slot>
            </template>
          </van-field>
        </template>
      </template>
    </van-form>
  </section>
</template>
<script lang="ts" setup>
import { computed, useAttrs, ref, watch, Ref } from 'vue'
import { cloneDeep, get, set } from 'lodash-es'
import SimpleSelect from './simpleSelect.vue'
import SimpleDatePicker from './simpleDatePicker.vue'
import SimpleRadio from './simpleRadio.vue'
import SimpleUpload from './simpleUpload.vue'
const attr = useAttrs()
const props = defineProps({
  groups: { type: Array, default: () => [] },
  params: { type: Object, default: () => ({}) },
  formProps: { type: Object, default: () => ({}) },
  options: { type: Object, default: () => ({}) },
})
const emits = defineEmits(['update:params','setParams'])

const model: Ref = ref<any>(get(props,'params',{}))
const useGroups = computed<any>(() => {
  props.groups.map((item: any) => {
    if (Array.isArray(item.key)) {
      item.originKey = item.key
      item.key = item.key.join('_')
    } else {
      item.originKey = item.key
    }
  })
  return props.groups
})

function setParams () {
  const paramsObj = cloneDeep(model.value)
  emits('update:params', paramsObj)
  emits('setParams',paramsObj)
}

const vanFormRef: any = ref(null)


const useRules = field=>{
  return get(field,'props.required',false)?[{ required: true, message: `请填写${field.label}` }].concat(get(field,'props.rules',[])):get(field,'props.rules',[])
}
const usePlaceholder = field=>{
  return get(field,'props.placeholder',`请填写${field.label}`)
}

async function validate () {
  try {
    await vanFormRef.value.validate()
    return true
  } catch {
    return false
  }
}

defineExpose({
  validate
})
</script>
<style lang="scss" scoped>
.ui-form {
  background-color: #fff;

  :deep {

    .van-field__label--required::before,
    .van-field__error-message {
      color: red;
    }

    &.van-cell-group:last-child {
      margin-bottom: 0;
    }

    .multiSelect {
      .placeholder {
        color: $primary-color-placeholder;
      }

      .pickerList>div {
        margin-bottom: 5px;
      }
    }

    div.labelPosition-top {
      display: flex;
      flex-direction: column;
      position: relative;

      .van-field__label {
        max-width: 100%;
        width: 100% !important;
        margin-bottom: 6px;
      }


    }
  }

  .inline {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .inline-field {
      padding: 5px 15px;
      margin: 5px;
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      &:not(:last-child) {
        position: relative;

        &:after {
          content: '';
          position: absolute;
          width: 0;
          right: -5px;
          height: 60%;
          top: 20%;
        }
      }

      img {
        width: 8px;
      }

      .text {
        display: inline-block;
        margin-right: 5px;

        &.placeholder {
          color: #c8c9cc;
        }

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }

    }
  }
}

.upload-box{
  width:100%;
  padding-right: 12px;
}
</style>
