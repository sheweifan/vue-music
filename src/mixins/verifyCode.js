const verifyCodeMixin = {
  data () {
    return {
      verifyCodeTime: 0
    }
  },
  computed: {
    verifyCodeDisabled() {
      return this.verifyCodeTime !== 0
    }
  },
  methods: {
    verifyCodeStart() {
      if (this.verifyCodeTimer) {
        return
      }
      let count = 60
      this.verifyCodeTime = count;
      this.verifyCodeTimer = setInterval(() => {
        count--
        if (count < 0) {
          clearInterval(this.verifyCodeTimer)
          this.verifyCodeTimer = null
        } else{
          this.verifyCodeTime = count;
        }
      }, 1000)
    },

    phoneAvailable (str) {
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(str)
    }

  }
}

export default verifyCodeMixin
