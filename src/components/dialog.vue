<template>
  <div class="common-dialog-box">
    <div class="dialog-mask" @touchmove.prevent></div>
    <div class="dialog-cont">
      <p v-if="title" class="txt" v-html="title">title</p>
      <slot v-else/>
      <div class="opt-group">
        <v-touch tag="span" class="btn" v-for="(v, index) in buttons" :key="index" @tap="handleClick({index: index})">
          {{v.label}}
        </v-touch>
      </div>
    </div>
  </div>
</template>

<script>
// <dialog
//   title="是否开始接单？"
//   v-if="dialogVisable"
//   :buttons="[{
//     label: '取消'
//   },
//   {
//     label: '确定',
//     onClick: function(){
//       console.log(1)
//     }
//   }]"
//   @close="dialogVisable = false"
// />
const defaultBtns = [
  {
    label: '取消',
    onClick: () => {}
  },
  {
    label: '确定',
    onClick: () => {
    }
  }
]
export default {
  name: 'dialog',
  props: {
    title: {
      type: String
    },
    buttons: {
      type: Array,
      default() {
        return defaultBtns
      }
    }
  },
  methods: {
    handleClick(obj) {
      const { index } = obj
      typeof this.buttons[index].onClick === 'function' && this.buttons[index].onClick()
      this.$emit('close', this.buttons[index], index)
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.common-dialog-box {
	.dialog-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.3);
		z-index: 12;
	}
	.dialog-cont {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-sizing: border-box;
		width: 280px;
		padding: 25px 7.5px;
		background-color: #fff;
		border-radius: 10px;
		z-index: 12;
		&.move-up {
			animation: moveUpWechat .3s ease-out forwards;
		}
		&.move-down {
			animation: moveDownWechat .3s ease-out forwards;
		}
		.txt {
      padding: 0 7.5px;
      font-size: 14px;
			color: #333;
			line-height: 24px;
      text-align: center;
		}
		.opt-group {
			margin-top: 23px;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
			.btn {
        margin: 0 12px;
        flex: 1;
				height: 34px;
				line-height: 34px;
				text-align: center;
				border-radius: 8px;
        font-size: 14px;
        border: 1px solid #999;
        color: #999;
        &:nth-last-child(1) {
          border: 1px solid #ff745b;
          color: #ff745b;
        }
			}
		}
	}
}
</style>
