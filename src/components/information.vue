<template>
<div class="msg-modal-box" v-if="visable">
	<div
		class="modal-mask"
		@click="closeMsgs"
    @touchstart.prevent
  >
	</div>
	<div :class="['modal-cont', visable ? 'move-up' : 'move-down']">
		<div class="msg-header">
			<h5 class="title">{{title}}</h5>
			<span class="cancel-btn" @click="closeMsg">取消</span>
			<span class="send-btn" v-if="msgCont.length > 0" @click="sendMsg">{{comfirmBtnText}}</span>
		</div>
		<div class="msg-wrap">
			<textarea
        ref="msg-txt"
        class="msg-txt"
        :placeholder="placeholder"
        v-model="msgCont"
        :maxlength="maxlength"
      ></textarea>
			<p class="letter-limit">{{ msgCont.length }}/{{maxlength}}</p>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: 'Information',
	data() {
		return {
      msgCont: this.value
		}
	},
  props: {
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    visable: {
      type: Boolean,
      default: false,
      required: true
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    maxlength: {
      type: Number,
      default: 300
    },
    comfirmBtnText: {
      type: String,
      default: '完成'
    }
  },

	methods: {
		closeMsg() {
      this.$refs['msg-txt'].blur()
      this.$emit('close', this.msgCont)
		},
		sendMsg() {
      this.$refs['msg-txt'].blur()
      this.$emit('send', this.msgCont)
		}
  },
  watch: {
    visable(val) {
      document.body.classList[val ? 'add': 'remove']('fixInput')
    },
    msgCont(val) {
      this.$emit('input', val)
    }
  },
  destroyed() {
    document.body.classList.remove('fixInput')
  }
}
</script>

<style lang="scss" scoped>
@keyframes moveUpMsg {
	0% {
    opacity: 0;
    transform: translate(-50%, 30%);
	}
	100% {
		opacity: 1;
	  transform: translate(-50%, 0);
	}
}

@keyframes moveDownMsg {
	0% {
		opacity: 1;
	  transform: translate(-50%, 0);
	}
	100% {
		opacity: 0;
	  transform: translate(-50%, 30%);
	}
}

.msg-modal-box {
	// display: none;
	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.3);
		z-index: 10;
	}
	.modal-cont {
		position: fixed;
		bottom: 15px;
		left: 50%;
		transform: translate(-50%, 30%);
		width: 345px;
		height: 200px;
		background-color: #fff;
		border-radius: 10px;
		z-index: 11;
		&.move-up {
			animation: moveUpMsg .3s ease-out forwards;
		}
		&.move-down {
			animation: moveDownMsg .3s ease-out forwards;
		}
		.msg-header {
			position: relative;
			height: 48px;
			border-bottom: 1px solid #eaeaea;
			.title {
        font-size: 16px;
				line-height: 48px
				color: #333;
				text-align: center;
			}
			.cancel-btn {
				position: absolute;
				top: 0;
				left: 0;
				padding: 0 pxToRem(30);
				height: pxToRem(97);
				line-height: pxToRem(97);
				@include font-dpr(15px);
				color: #999;
			}
			.send-btn {
				position: absolute;
				top: 0;
				right: 0;
				padding: 0 15px;
				height: 48px;
				line-height: 48px;
        font-size: 15px;
				color: #ff745b;
			}
		}
		.msg-wrap {
			padding: 12px;
			.msg-txt {
				width: 100%;
				height: 110px;
				resize: none;
        font-size: 14px;
				color: #333;
        line-height: 22px;

        &::-webkit-input-placeholder{
          color: #ccc;
        }
			}
			.letter-limit {
        font-size: 12px;
				color: #ccc;
				text-align: right;
			}
		}
	}
}
</style>
