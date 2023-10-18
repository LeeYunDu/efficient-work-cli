<template>
  <div class="offset-box">
    <div id="screen-area-tooltip" class="tooltip">
      <div class="tooltip-main">
        <div class="title-box">
          <img class="tag" src="@static/images/map/tag-01.png" alt="">
          <div class="title">{{ get(data,'name','-') }}</div>
          <div class="address">地址：{{ get(data,'address','-') }}</div>
        </div>


        <div class="count-box">
          <div class="item">
            <div class="label" style="margin-bottom: 10px;">建筑面积</div>
            <div class="value">
              <span class="number">{{ get(data,'countResult.childCount',0) }}</span>栋
              <span class="number">{{ get(data, `countResult.totalBuildCovered`, 0) }}</span> ㎡
            </div>
          </div>
          <div class="item">
            <div class="left" style="width: 96px;">
              <div class="label" style="margin-bottom: 10px;">办公面积</div>
              <div class="value">
                <span class="number">{{ get(data, `countResult.busiCovered`, 0) }}</span> ㎡
              </div>
            </div>
            <div class="right">
              <div class="right-item">
                <span class="icon-fk"></span>
                <span class="label">已用面积</span>
                <span class="value">
                  <span class="number">{{ get(data, `countResult.usedCovered`, 0) }}</span>㎡
                </span>
              </div>

              <div class="right-item">
                <span class="icon-fk ky"></span>
                <span class="label">可用面积</span>
                <span class="value">
                  <span class="number">{{ get(data, `countResult.availableCovered`, 0) }}</span>㎡
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="bar-box">
          <div
            class="bar"
            :style="{
              width:percentage + '%'
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from 'lodash-es'
const router = useRouter()
const props = defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  // fields: {
  //   type: Array,
  //   default: () => ([])
  // },
  name: {
    type: String,
    default: ''
  }
})

const fields = ref([
  { label: '营业收入', key: 'revenueTotal' },
  // { label:'利润总额',key:'y2' },
  { label: '工业产值', key: 'moneyTotal' },
  { label: '累计税收', key: 'taxRevenueTotal' },
])

function goDetail () {
  router.push({
    path: '/portrait',
    query: {
      name: props.data.name,
      companyId: props.data.id
    }
  })
}


let percentage = computed(()=>{
  return Number(get(props.data,'countResult.usedCovered',0) / get(props.data,'countResult.busiCovered',0)).toFixed(2)*100
})
</script>

<style lang="scss" scoped>
@keyframes opacity {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}


.count-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .count-item {
    flex: 0 0 calc(50% - 13px);
    margin-bottom: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 20px;
    background: linear-gradient(180deg, rgba(0, 133, 238, 0) 0%, rgba($color: #0085EE, $alpha: 0.2) 100%);
    border-radius: 8px 8px 8px 8px;
    opacity: 1;
    border: 2px solid rgba(0, 133, 238, 0.45);
    font-size: 36px;

    .label {
      color: #B7E0FF;
    }

    .value {
      color: #ffffff;
    }
  }
}

.tooltip {
  position: relative;
  width: 586px;
  height: 240px;
  background-image: url(static/images/map/panel-bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 17px 15px 13px 15px;

  .tooltip-main {
    height: 100%;
    padding: 20px;
    position: relative;
  }

  .title-box {
    position: relative;
    padding-left: 50px;
    margin-bottom: 20px;

    .tag {
      width: 68px;
      height: 37px;
      position: absolute;
      left: -30px;
    }
  }

  .title {
    top: 18px;
    font-weight: bold;
    left: 38px;
    font-size: 48px;
    color: #fff;
    z-index: 99;
    font-size: 18px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 600;
    line-height: 21px;
    color: #363A44;
    height: 27px;
  }

  .address {
    height: 21px;
    font-size: 14px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #686B73;
    line-height: 16px;
  }

  .arrow {
    position: absolute;
    right: 5%;
    width: 25%;
    top: 50px;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    img {
      width: 15px;
    }

    @for $i from 1 through 10 {
      img:nth-child(#{$i}) {
        animation: opacity 3s infinite linear;
        animation-delay: #{$i*3/15}s;
      }
    }
  }



}

.offset-box {
  position: relative;
  top: -9999px;
}

.count-box {
  height: 76px;
  padding: 13px 10px;
  background: #F4F6F9;
  border-radius: 4px 4px 4px 4px;

  .item {
    &~.item {
      padding-left: 30px;
      margin-left: 30px;
      position: relative;
      display: flex;

      &::after {
        content: '';
        height: 30px;
        border-left: 1px dashed #9DA4B5;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -15px;
      }
    }
  }

}

.label {
  height: 21px;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #717B98;
  line-height: 16px;
}

.value {
  height: 21px;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #363A44;
  line-height: 16px;

  .number {
    height: 17px;
    font-size: 16px;
    font-family: D-DIN Exp-DINExp-Bold, D-DIN Exp-DINExp;
    font-weight: bold;
    color: #363A44;
    line-height: 19px;
  }
}

.right-item {
  display: flex;
  align-items: center;

  .label {
    margin: 0 4px;
    height: auto;

  }

  .value {
    height: auto;
    margin-left: 19px;
  }

  &~.right-item {
    margin-top: 10px;

  }

  .icon-fk {
    width: 8px;
    height: 8px;
    background: #0366F1;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;

    &.ky{

background: #E2EEFF;
    }
  }

  align-items: center;
}

.right {
  margin-left: 22px;
}

.bar-box {
  height: 8px;
  background: #C7D2E2;
  display: flex;
  border-radius: 80px 80px 80px 80px;

  .bar {
    border-radius: 80px 80px 80px 80px;

    background: #0366F1;
  }
}
</style>
