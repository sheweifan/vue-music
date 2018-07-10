<template>
  <ul class="time-line">
    <li
      v-for="(v, index) in list"
      :key="index"
      :class="['time-line-item', v.active ? 'active' : '']"
    >
      <i class="yxl-font yxl-font-agree" />
      <span class="title">{{ v.title || '' }}</span>
      <span class="desc">{{ v.desc || '' }}</span>
    </li>
  </ul>
</template>

<script>
// <TimeLine :list="[
//   { active: true, title: '壹心理同意退款', desc: '2018-03-13 17:38'},
//   { active: true, title: '壹心理同意退款', desc: '2018-03-13 17:38'},
//   { active: false, title: '壹心理同意退款'}
// ]" />
export default {
  name: 'TimeLine',
  props: {
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

.time-line-item {
  line-height: 20px;
  padding-top: 24px;
  text-align: left;
  position: relative;
  &:nth-child(1){
    padding-top: 0;
    &:before{
      display: none;
    }
  }
  &.active{
    .yxl-font-agree,
    .title{
      color: #FF745B;
    }
    &:before{
      background: #FF745B;
    }
  }
  &:before{
    position: absolute;
    content: "";
    width: 1px;
    background: #ccc;
    top: -13px;
    bottom: 6px;
    left: 6px;
  }
  .title{
    font-size: 14px;
    color: #666;
    padding-right: 10px;
  }
  .desc{
    font-size: 11px;
    color: #999;
  }
  .yxl-font-agree{
    font-size: 13px;
    color: #ccc;
    padding-right: 20px;
    background: #fff;
    position: relative;
    z-index: 1;
  }
}
</style>
