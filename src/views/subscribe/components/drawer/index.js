import DialogPageMixin from 'mixins/dialogPageMixin'
import { mapGetters } from 'vuex'

export default {
  mixins: [DialogPageMixin],
  computed: {
    ...mapGetters([
      'id'
    ]),
  },
  data() {
    return {
      pageKey: 'subscribe',
      types: [],
      sports: [],
      subs: [],
      isClick: false,
      chosedArr: [],
      startItem: 0,
      finishItem: 0,
      morethan: 0,
      lessthan: 0,
      price:0
    }
  },

  methods: {
    // 添加 / 修改
    handleDialogData(item) {
      this.$api.type.getTypes().then(res => {
        this.types = res.data
      })
      if (this.isSearching) return
      this.isSearching = true
      this.errorForm = {}
      this.editForm = {
        venueId: this.id
      }
      this.chosedArr = []
      this.subs = []
      this.startItem = 0,
        this.finishItem = 0,
        this.morethan = 0,
        this.lessthan = 0
      this.dialogTitle = !item ? '添加预定记录' : '修改预定记录信息'
      this.isAdd = !item
      if (!item) {
        this.dialogVisible = true
        this.isSearching = false
        return
      }
      this.$api[this.pageKey].detail(item.id).then(res => {
        this.editForm = res.data
        this.getSports(res.data.typeId)
        this.getSubscrbes(res.data.id)
        const { startTime, finishTime } = res.data
        this.startItem = parseInt(startTime.slice(11, 13))
        this.finishItem = parseInt(finishTime.slice(11, 13))

        for (let i = 0; i < 14; i++) {
          if (this.subs.findIndex(obj => obj === this.startItem + i) !== -1) {
            this.morethan = this.startItem + i
            console.log(this.morethan, this.lessthan)

            break
          }

        }
        for (let i = 0; i < 14; i++) {
          if (this.subs.findIndex(obj => obj === this.startItem - i) !== -1) {
            this.lessthan = this.startItem - i
            console.log(this.morethan, this.lessthan)
            break
          }
        }
        for (let index = 0; index < parseInt(finishTime.slice(11, 13)) - this.startItem; index++) {

          this.chosedArr.push(this.startItem + index);
        }
        this.dialogVisible = true
      }).finally(() => this.isSearching = false)
    },

    //获取场地
    getSports(id) {
      this.sports = []
      if (this.isAdd) this.editForm.sportId = ''
      const params = {
        typeId: id,
        venueId: this.id
      }
      this.$api.sport.getSports(params).then(res => {
        this.sports = res.data
      })
    },

    getSubscrbes(id) {
      if (this.editForm.sportId && this.editForm.sportId !== '' && this.editForm.date && this.editForm.date !== '')
        this.subs = [];
      const params = {
        sportId: this.editForm.sportId,
        startTime: this.editForm.date,
        id: this.editForm.id
      }
      this.$api[this.pageKey].getSubscrbes(params).then(res => {
        this.subs = res.data
      })
    },


    setClick(item) {



      if (this.subs.findIndex(str => str === item) === -1) {
        if (this.isClick) {
          this.isClick = false
        } else {
          if (this.isAdd) {
            this.startItem = 0
            this.finishItem = 0
            this.morethan = 0;
            this.lessthan = 0
          }
          this.isClick = true
          this.chosedArr = [item]
          this.startItem = item
          this.finishItem = item
          for (let i = 0; i < 14; i++) {
            if (this.subs.findIndex(obj => obj === this.startItem + i) !== -1) {
              this.morethan = this.startItem + i
              console.log(this.morethan, this.lessthan)

              break
            }

          }
          for (let i = 0; i < 14; i++) {
            if (this.subs.findIndex(obj => obj === this.startItem - i) !== -1) {
              this.lessthan = this.startItem - i
              console.log(this.morethan, this.lessthan)
              break
            }
          }


        }

      }

    },
    setHover(item) {
      if (this.isClick) {
        if (this.subs.findIndex(str => str === item) !== -1) {
          if (this.startItem > item) {
            this.finishItem = item + 1
            this.setClick(item + 1)
          } else {

            this.finishItem = item - 1
            this.setClick(item - 1)
          }
        } else {
          if (this.morethan < item && this.morethan !== 0) {
            this.finishItem = this.morethan - 1
            this.setClick(this.morethan - 1)
          } else if (this.lessthan > item) {
            this.finishItem = this.lessthan + 1
            this.setClick(this.lessthan + 1)
          }

          else {
            this.finishItem = item
          }

        }
        this.chosedArr = []
        if (this.finishItem >= this.startItem) {
          for (let index = 0; index < this.finishItem - this.startItem + 1; index++) {
            this.chosedArr.push(this.startItem + index)
          }
        }
        else {
          for (let index = 0; index < this.startItem - this.finishItem + 1; index++) {
            this.chosedArr.push(this.finishItem + index)
          }
        }
      }



    },




    // 提交
    $_submitVerify() {
      console.log(this.startItem, this.finishItem)
      if (this.startItem < this.finishItem) {
        this.editForm.startTime = this.editForm.date + ' ' + (this.startItem) + ':00:00'
        this.editForm.finishTime = this.editForm.date + ' ' + (this.finishItem + 1) + ':00:00'
      }
      else {
        this.editForm.startTime = this.editForm.date + ' ' + this.finishItem + ':00:00'
        this.editForm.finishTime = this.editForm.date + ' ' + (this.startItem + 1) + ':00:00'
      }
    }
  }
}
