<template>
  <div class="list-query-component">
    <slot></slot>
    <div class="search-box">
      <div class="input-box">
        <input
          v-model="state.params.keyword"
          type="text"
          v-bind="$attrs"
          class="input"
        >
      </div>
      <div class="search-button" @click="onQuery">搜索</div>
    </div>
    <div class="select-box">
      <div v-for="(item,index) in fields" :key="index" class="select-item">
        <template v-if="item.type=='select'">
          <selectBox
            :options="getOptions(item)"
            :fields="item"
            @choose="(data)=>{onChoose(data,item.key)}"
          />
        </template>
        <template v-else-if="item.type == 'panel'">
          <div class="query-item" @click="onShowPopup(item)">
            <span>更多</span>
          </div>
        </template>

        <template v-else-if="item.type=='sort'">
          <itemSort :sort-item="[item]" @handleSearch="handleSearch" />
        </template>
      </div>
    </div>


    <van-popup
      v-model:show="state.rightPopupShow"
      position="right"
      :style="{
        width:'78%',
        height:'100%'
      }"
    >
      <div class="popup-main">
        <div class="popup-header">
          <img src="@static/images/common/icon-left.png" class="icon" alt="">
          <span class="name">条件筛选</span>
        </div>
        <div class="popup-items">
        </div>
        <div class="popup-footer">
          2
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import selectBox from './select.box.vue'
import itemSort from '../components/items/item.sort.vue'
import { isArray } from 'lodash-es'
import { useStore } from 'vuex'

let props = defineProps({
  fields:{
    type:Array,default:()=>{[]}
  }
})

let state = reactive({
  data:[],
  show:false,
  rightPopupShow:false,
  popupItems:[],
  params:{
    keyword:'',
    sort:''
  }
})


function onShowPopup (item){
  let options = item
  state.rightPopupShow = true
  state.popupItems = options
}
let emits = defineEmits(['query'])

function  onChoose (item,key){
  state.params[key] = item
  onQuery()
}
const store = useStore()
function getOptions (item){
  let { options } = item

  if(isArray(options)){
    return options
  }else{
    let arr = store.getters.dictDataOnly(options)||[]
    return arr
  }
}

function handleSearch (params){
  state.params.sort = params.sort
  onQuery()
}

function onQuery (){
  emits('query',state.params)
}
</script>

<style lang="scss" scoped>
.list-query-component{
  padding: 12px;
  background-color: #FFFFFF;
  border-radius: 2px 2px 2px 2px;
  margin-bottom: 12px;
  position: relative;
  .search-box{
    display: flex;
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 1px 14px 0px rgba(70,131,222,0.22);
    border-radius: 6px 6px 6px 6px;
    .input-box{
      flex: 1;
      display: flex;
      height: 36px;
      padding: 8px;
    }
    input{
      width: 100%;
      height: 100%;
      line-height: 36px;
      display: flex;
      font: normal;
      align-items: center;
      font: caption;
      &::placeholder{
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #B4C8E6;

      }
    }
    .search-button{
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      width: 60px;
      height: 36px;
      background: #0366F1;
      opacity: 1;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      padding: 8px 15px;
      color: white;
    }
  }
}



.select-box{
  display: flex;
  align-items: center;
  margin-top: 10px;
  .select-item{
    flex: 1;
    display: flex;
    justify-content: center;
    position: relative;
    &~.select-item{
      &::after{
        content: '';
        width: 1px;
        height: 8px;
        background: #C7D4E7;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -4px;
      }
    }
  }
}

.query-item{
  display: flex;
  align-items: center;
  border-radius: 2px 2px 2px 2px;
  opacity: 1;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  span{
    border-left: none!important;
    font-size: 12px!important;
    margin-right: 6px;
    white-space: nowrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  img{
    width: 10px;
    height: 10px;
  }
}

.popup-main{
  padding: 14px;
  display: flex;
  flex-direction: column;
  .popup-header{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .icon{
      width: 26px;
    }
    .name{
      font-size: 16px;
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 500;
      color: #323B47;
    }


  }

  .popup-items{
    flex: 1;
  }

  .footer{

  }

}
</style>

