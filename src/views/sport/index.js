import TablePageMixin from 'mixins/tablePageMixin'
import ModalDrawer from './components/drawer/index.vue'

export default {
  name: 'Major',

  mixins: [TablePageMixin],

  components: { ModalDrawer },

  data() {
    return {
      pageKey: 'sport',
      columns: [
        {
          label: '场地名称',
          prop: 'name',
          align: 'center'
        },

        {
          prop: 'price',
          label: '价格',
          align: 'center'
        },
        {
          prop: 'type',
          label: '运动类型',
          align: 'center'
        },
        {
          prop: 'venue',
          label: '场馆名称',
          align: 'center'
        },
        {
          // prop: 'status',
          label: '状态',
          align: 'center',
          scopedSlots: { customRender: 'status' },
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

  methods:{
    setStatus(id,status){
      const params={
        id,
        status
      }
      this.$api[this.pageKey].handleStatus(params).then(res => {
        this.$getData();
      })
    }
  }
}
