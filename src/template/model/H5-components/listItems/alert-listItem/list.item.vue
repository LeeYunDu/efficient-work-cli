<template>
  <div
    v-for="(item,index) in data"
    :key="index"
    class="info-box"
    @click="goDetail(item)"
  >
    <div
      class="header flex f-aic"
      :class="[`level-${get({
        '高风险':'1',
        '风险':'2',
        '利好':'3',
      },item.level)}`]"
    >
      <img class="state-img" :src="$metaFilePath(get(iconMap,item.level,''))">
      <div class="title">{{ item.companyName }}</div>
    </div>
    <div class="main">
      <div class="tag-group">
        <div v-if="item.typeOne" class="tag-item">{{ item.typeOne }}</div>
        <div v-if="item.typeTwo" class="tag-item">{{ item.typeTwo }}</div>
      </div>
      <div class="content">
        {{ item.content }}
      </div>
    </div>
    <div class="footer flex f-aic">
      <div class="item flex f-aic">
        <img src="" alt="">
        <span>{{ parseTime(item.warnTime,'{y}-{m}-{d}') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AwrRo } from '@/api/types/WarnRecord.type'
import { getImage, parseTime } from '@/utils'
import { computed, PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { get } from 'lodash-es'
let props = defineProps({
  data:{
    type:Array as PropType<AwrRo[]>,
    default:()=>[]
  },
})
let router = useRouter()

let levelMap = {
  '高风险':'1',
  '风险':'2',
  '利好':'3',
}

let iconMap = {
  '利好':'risk-rank-2.png',
  '高风险':'risk-rank-3.png',
  '风险':'risk-rank-1.png',
}

function goDetail (item:any){
  let { id } = item
  router.push({
    path:'/activity/detail',
    query:{ id }
  })
}

</script>

<style lang="scss" scoped>

.info-box{
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  &~.info-box{
    margin-top: 12px;
  }

  .header{
    padding: 10px 12px;
    color: rgba($color: #50B132, $alpha: 0.1);
    &.level-1{
      background: linear-gradient(90deg, rgba($color: #FF5555, $alpha: 0.1) 0%, rgba(255,85,85,0) 100%);
    }

    &.level-2{
      background: linear-gradient(90deg, rgba($color: #FF992E, $alpha: 0.1) 0%, rgba(255,153,46,0) 100%);
    }
    &.level-3{
      background: linear-gradient(90deg, rgba($color: #50B132, $alpha: 0.1) 0%, rgba(80,177,50,0) 100%);
    }
    .state-img{
      width: 59px;
      height: 22px;
    }
    .title{
      height: 21px;
      font-size: 14px;
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: bold;
      color: #363A44;
      line-height: 16px;
      margin-left: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }

  .main{
    padding: 10px 12px;
    .content{
      font-size: 12px;
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 400;
      color: #686B73;
      line-height: 14px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .tag-group{
      margin-bottom: 10px;
      display: flex;
      .tag-item{
        padding: 3px 6px;
        background: #F3F6F7;
        border-radius: 2px 2px 2px 2px;
        opacity: 1;
          position: relative;
          font-size: 12px;
font-family: Source Han Sans CN, Source Han Sans CN;
font-weight: 400;
color: #7E8897;
          &~.tag-item{
            margin-left: 7px;
          }
      }
    }
  }

  .footer{
    border-top: 1px solid #E6ECF1;
    padding: 10px 12px;
    .item{
      .icon{
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
      span{
        height: 18px;
        font-size: 12px;
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-weight: 400;
        color: #888888;
        line-height: 14px;
      }
    }

  }

}

</style>
