

<script setup>


</script>
# SelectPanel




## 使用说明

移动端筛选弹窗

## 可用版本
vant 3.0+ 和 vant 4.0+ 都可以使用

## 示例

:::preview 

demo-preview=./demo.vue

:::



## Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| modelValue   | 弹窗是否显示的双向绑定        | string      |—  |
| groups   | 选项集合,支持数组或字典        | [groupsItem](#groupsitem-attributes) []       | []    |
| title   | 面板标题        | string      | 条件筛选  |
| params   | 参数        | Object      | —  |

## groupsItem Attributes

| 属性名      | 说明        |  类型         |  默认值       | 
| :---        | :---   |   :---  |:----: |
| label   | 名称      | string   |	'label' |
| key   | key       | string   |	'value' |
| children   | 选项集合       | {label:string,value:string}[]   |[] |

## SelectPanel 源代码
::: details 查看源代码

``` vue
<template>
  <div class="filter-panel">
    <van-popup
      v-model:show="state.show"
      :round="true"
      class="filter-popup"
      position="right"
    >
      <div class="filter-view">
        <div class="filter-panel-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
          >
            <g id="Keyboard arrow left" clip-path="url(#clip0_1699_1829)">
              <path id="Vector" d="M16.694 17.9725L11.7323 13L16.694 8.0275L15.1665 6.5L8.6665 13L15.1665 19.5L16.694 17.9725Z" fill="#ADADAD" />
            </g>
            <defs>
              <clipPath id="clip0_1699_1829">
                <rect width="26" height="26" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>{{ title }}</span>
        </div>
        <div v-for="(group,groupIndex) in groups" :key="groupIndex" class="filter-panel-group">
          <div class="item-title">{{ get(group,'label','') }}</div>
          <div class="filter-panel-group-item">
            <div class="group-options">
              <div
                v-for="(option,optionIndex) in get(group,'children',[])"
                :key="optionIndex"
                class="group-option"
                :class="{
                  'is-active':get(useParams,group.key) == option.value
                }"
                @click="onClick(option,group)"
              >
                <div class="group-main">
                  {{ option.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="filter-footer">
          <div class="buttons">
            <template v-for="(item,index) in useButtons" :key="index">
              <div
                class="button-item"
                :class="[item.key]"
                @click="item.click"
              >
                {{ item.label }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { get, set } from 'lodash-es'

let props = defineProps({
  params:{
    type:Array,
    default:()=>[]
  },
  title: {
    type: String,
    default: '条件筛选'
  },
  groups:{
    type:Array,default:()=>[]
  },
  modelValue: { type: Boolean, default: false },

})

const state = reactive({
  show: computed({
    get: () => {
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),

})

const emits = defineEmits(['update:params','update:modelValue','submit','cancel','change'])

let useParams = ref(props.params)

function onClick (option,group){
  let { id,value } = option
  let { key } = group
  let checkValue = value || id
  let params = useParams.value
  let curValue = get(params,key)
  if(curValue == checkValue){
    set(params,key,'')
  }else{
    set(params,key,checkValue)
  }
}

function onSubmit (){
  emits('update:params',useParams.value)
  emits('submit')
  state.show = false
}

let useButtons = ref([
  { label:'重置',key:'reset',click:()=>{
    let params = useParams.value
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        params[key] = ''
      }
    }

  } },
  { label:'确定',key:'submit',click:()=>{
    onSubmit()
  } },
])

</script>

<style lang="scss" scoped>
.filter-panel{
  padding: 14px;
  ::v-deep(.filter-popup){
    border-radius: 0px!important;
    width: 78%;
    height: 100vh;
  }
}

.filter-view{
  border-radius: 0px;
  padding: 14px 18px 22px 14px;
  display: flex;
  flex-direction: column;
  height: 100%;
  .filter-panel-title{
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-weight: 600;
    font-size: 16px;
    color: #323B47;
    display: flex;
    align-items: center;
  }

  .filter-panel-group{
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    flex: 1;
    .item-title {
      color: rgba(11, 22, 40, 1);
      font-size: 15px;
      font-weight: 600;
      position: relative;
      padding-left: 8px;
      display: flex;
      margin-bottom: 6px;
      &::after {
        content: '';
        width: 4px;
        height: 12px;
        background: #2E7CFD;
        border-radius: 3px 3px 3px 3px;
        opacity: 1;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -6px;
      }
    }
    .filter-panel-group-item{
      &~.filter-panel-group-item{
        margin-top: 11px;
      }
      .group-options{
        display: flex;
        margin-left: -5px;
        margin-right: -5px;
        flex-wrap: wrap;
        .group-option{
          width: 50%;
          flex: 0 0 50%;
          padding:5px;

          &.is-active{

            .group-main{
              background: #0366F1;
              border-radius: 4px 4px 4px 4px;
              color: white;
            }
          }
         .group-main{
            font-family: Source Han Sans CN, Source Han Sans CN;
            font-weight: 400;
            font-size: 13px;
            color: #686B73;
            padding: 6px 11px;
            background: rgba(132,143,155,0.07);
            text-align: center;
         }
        }
      }
    }

  }
}
.filter-footer{
  .buttons{
    display: flex;
    .button-item{
      flex: 1;
      width: 125px;
      height: 38px;

      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 400;
      font-size: 15px;
      color: #0366F1;
      text-align: center;
      line-height: 38px;
      cursor: pointer;
      border-radius: 8px 8px 8px 8px;

      &.reset{
        border: 1px solid #0366F1;
      }
      &.submit{
        background: #0366F1;
        color: #FFFFFF;
      }

      &~.button-item{
        margin-left: 5px;
      }
    }
  }
}
</style>

```

:::

<style module>
.button {
  color: red;
  font-weight: bold;
}

.moble-box{
  width:375px;
}
</style>