<template>
  <el-drawer
    v-if="dialogVisible"
    :visible.sync="dialogVisible"
    :title="dialogTitle"
    :wrapper-closable="false"
    size="500px"
  >
    <div class="drawer-container">
      <div class="content-container">
        <el-form
          ref="editForm"
          label-width="100px"
          :model="editForm"
          label-suffix=":"
        >
          <el-row :gutter="10">
            <el-col :span="23">
              <el-form-item
                label="预定人姓名"
                prop="username"
                :error="errorForm.username"
                :rules="[
                  {
                    required: true,
                    message: '请填写专预定人姓名',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model="editForm.username"
                  placeholder="请填写预定人姓名"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="23">
              <el-form-item
                label="联系方式"
                prop="phone"
                :error="errorForm.phone"
                :rules="[
                  {
                    required: true,
                    message: '请填写联系方式',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input
                  v-model.number="editForm.phone"
                  placeholder="请填写联系方式"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="23">
              <el-form-item
                label="运动类型"
                prop="typeId"
                :error="errorForm.typeId"
                :rules="[
                  {
                    required: true,
                    message: '请选择运动类型',
                    trigger: 'change',
                  },
                ]"
              >
                <el-select
                  v-model="editForm.typeId"
                  filterable
                  placeholder="请选择运动场地"
                  style="width: 100%"
                  @change="getSports"
                >
                  <el-option
                    v-for="item in types"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="23">
              <el-form-item
                label="运动场地"
                prop="sportId"
                :error="errorForm.sportId"
                :rules="[
                  {
                    required: true,
                    message: '请选择运动场地',
                    trigger: 'change',
                  },
                ]"
              >
                <el-select
                  v-model="editForm.sportId"
                  placeholder="请选择运动场地"
                  filterable
                  style="width: 100%"
                  @change="getSubscrbes"
                >
                  <el-option
                    v-for="item in sports"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    :disabled="item.status===0"

                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="23">
              <el-form-item
                label="选择日期"
                prop="date"
                :error="errorForm.date"
                :rules="[
                  {
                    required: true,
                    message: '请选择日期',
                    trigger: 'change',
                  },
                ]"
              >
                <el-date-picker
                  v-model="editForm.date"
                  style="width: 100%"
                  type="date"
                  @change="getSubscrbes()"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-card class="card-countainer" shadow="always">
              <div @click="setClick(item+7)" @mouseover="setHover(item+7)" :class="subs.findIndex(str=>str===(item+7))===-1?chosedArr.findIndex(i=>i===(item+7))===-1?'':'active':'chosed'" v-for="item in 14" :key="item">
                {{ item + 7 }}:00
              </div>
            </el-card>
          </el-row>
        </el-form>
      </div>
      <div class="footer-container">
        <el-button type="info" @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="submitLoading" type="primary" @click="$confirmData"
          >确 认</el-button
        >
      </div>
    </div>
  </el-drawer>
</template>

<script>
import Index from "./index";

export default Index;
</script>
<style scoped lang="scss">
@import "~@/styles/drawer";
.card-countainer {
  /deep/ .el-card__body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    div {
      text-align: center;
      width: 95px;
      height: 50px;
      line-height: 50px;
      border-radius: 5px;
      margin: 5px;
      border: 2px solid grey;
    }
  }
}

.chosed{
  background-color: #909399
;
}
.active{
  background-color: #67C23A
;
}
</style>
