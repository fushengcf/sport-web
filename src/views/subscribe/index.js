import TablePageMixin from 'mixins/tablePageMixin'
import ModalDrawer from './components/drawer/index.vue'

export default {
  name: 'Major',

  mixins: [TablePageMixin],

  components: { ModalDrawer },

  data() {
    return {
      pageKey: 'subscribe',
      columns: [
        {
          label: '预定人',
          prop: 'username',
          align: 'center'
        },

        {
          prop: 'phone',
          label: '联系方式',
          align: 'center'
        },
        {
          prop: 'type',
          label: '运动类型',
          align: 'center'
        },
        {
          prop: 'sport',
          label: '运动场地名称',
          align: 'center'
        },
        {
          prop: 'startTime',
          label: '开始时间',
          align: 'center'
        },
        {
          prop: 'finishTime',
          label: '结束时间',
          align: 'center'
        },
        {
          prop: 'price',
          label: '价格',
          align: 'center'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          align: 'center'
        },
        {
          label: '操作',
          align: 'center',
          scopedSlots: { customRender: 'action' },
          width: 250
        }
      ],
      types:[]
    }
  },

  mounted() {
    this.$getData()
    this.$api.type.getTypes().then(res => {
      this.types = res.data
    })
  },

}
