<template>
  <div class="qingsu-message-list" v-if="list.length > 0">
    <div class="qingsu-message-item" v-for="(item, index) in list" :key="index">
      <span class="title"
        :style="{width: titleW}"
      >
        {{item.title}}
      </span>
      <span class="label"
        :style="[
          {textAlign: item.align || align},
          item.style || {}
        ]"
      >
      {{item.label}}
    </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QingsuMessageList',
  props: {
    list: { // 数据
      type: Array,
      default() {
        return []
      }
    },
    align: { // 对齐方式
      type: String,
      default: 'left'
    },
    titleWidth: { // 设计稿标题宽度
      type: Number,
      default: 150
    }
  },
  computed: {
    titleW() {
      return this.titleWidth/75 + 'rem'
    }
  }
}
</script>


<style lang="scss" scoped>
  .qingsu-message-list{
    padding: 12px 15px;
    background: #fff;
    .qingsu-message-item{
      display: flex;
      padding: 12px 0;
      font-size: 15px;
      line-height: 21px;
      .title{
        // width: pxToRem(150);
        color: #999;
      }
      .label{
        flex: 1;
        color: #333;
        &.high {
          color: #FF745B;
        }
      }
    }
  }

</style>
