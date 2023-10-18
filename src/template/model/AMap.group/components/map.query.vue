<template>
  <div class="map-query-box">
    <div class="search-box">
      <div class="search-input">
        <el-input v-model="curParams.name" placeholder="请输入空间名称">
          <template #prefix>
          </template>
          <template #suffix>
            <div @click="onFormChange">搜索</div>
          </template>
        </el-input>
      </div>

      <UiForm
        v-bind="addFormOptions"
        ref="formRef"
        :labels="mapQueryFields"
        :model="curParams"
        @change="onFormChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {  ref } from 'vue'
import { UiForm } from '@static/lib/entry'
import { mapQueryFields } from '../json'


function onFormChange (opts:any){
  let { params } = opts

  PubSub.publish('map-query', Object.assign(curParams.value,params,{ pageNum:1 }))

}
const addFormOptions = {
  props: {
    inline: false,
    labelWidth: 'auto',
    labelPosition: 'left',
    rules: []
  },
  options: {
    gridItem: { span: 24 }
  }
}

const curParams:any = ref({
  pageNum: 1,
})

</script>

<style lang="scss" scoped>

.map-query-box{
  position: absolute;
  left: 12px;
  z-index: 999;
  top: 16px;

  ::v-deep(.el-form){
    width: 172px;
    .el-form-item__label-wrap{
      display: none;
    }

    .el-form-item{
      margin-bottom: 5px;
      width: 100%;
    }
    .el-form-item__content,.el-select{
      width: 172px;
    }

    .el-select{
      box-shadow: 0px 2px 6px 0px #DAE3F0;
      border-radius: 4px 4px 4px 4px;
      background: #FFFFFF;

    }
    .el-input__wrapper{
      padding: 1px 8px;


    }

    .el-input__inner {
      border-radius: 0px;
      padding-right: 0px;
      font-size: 16px;
      background: transparent;

      &::placeholder {
        color: rgba(148, 187, 218, 1);

      }
    }
  }
}

.search-input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  ::v-deep(.el-input) {
    height: 44px;

    .el-input__wrapper {
      background: transparent;
      box-shadow: none;
      border-radius: 0px;
      opacity: 1;
      box-shadow: 0px 2px 6px 0px #DAE3F0;
      // border: 1px solid #0085EE;
      // background: linear-gradient(180deg, #01214A 0%, #042C60 100%);
      padding: 0;
      background: white;
    }

    .el-input__inner {
      border-radius: 0px;
      padding-right: 0px;
      font-size: 16px;
      background: transparent;

      &::placeholder {
        color: rgba(148, 187, 218, 1);
      }
    }

    .el-input__prefix {
      left: 0px;
      display: flex;
      align-items: center;
      color: rgba(148, 187, 218, 1);
      font-size: 20px;
      margin-left: 10px;
    }

    .el-input__suffix {
      cursor: pointer;
      height: 100%;
      width: 60px;
      height: 44px;
      background: #0366F1;
      opacity: 1;
      line-height: 44px;
      display: block;
      display: flex;
      justify-content: center;
      color: white;
      right: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      border-radius: 0px 4px 4px 0px;
      text-align: center;
      .el-input__suffix-inner{
        div{
          margin-left: 0;
        }

      }
    }
  }

  .search-onOff {
    margin-left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    border-radius: 8px;
    background: rgba(0, 133, 238, 0.13);

    height: 100%;
    padding: 0 14px;

    .onOff {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(81, 178, 255, 1);
      margin-right: 5px;
    }
  }


}
</style>
