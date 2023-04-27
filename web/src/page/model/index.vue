<template>
  <div class="page-model">
    <div class="model-block">
      <ElCard>
        <template #header>
          <div class="card-header">
            <el-icon>
              <MessageBox />
            </el-icon>
            <span style="margin-left: 6px;">model-名称</span>
            <el-icon @click="append(cfg.data)" style="margin-left: auto">
              <Plus />
            </el-icon>
          </div>
        </template>
        <el-tree ref="tree" @current-change="change" :data="model" draggable default-expand-all node-key="uuid">
          <template #default="cfg">
            <div class="custom-tree-node">
              <span>{{ cfg.node.label }}</span>
              <span>
                <a v-if="canDel(cfg.data)" @click="remove(cfg.data, cfg.node, cfg)">
                  <el-icon>
                    <Minus />
                  </el-icon>
                </a>
                <a style="margin-left: 8px" @click="append(cfg.data)">
                  <el-icon>
                    <Plus />
                  </el-icon>
                </a>
              </span>
            </div>
          </template>
        </el-tree>
      </ElCard>
    </div>
    <div class="model-block">
      <ElCard>
        <template #header>
          <div class="card-header">
            字段详情
          </div>
        </template>
        字段详情
      </ElCard>
    </div>
    <div class="model-block">
      <ElCard>
        <template #header>
          <div class="card-header">
            预览
          </div>
        </template>
        123123
        <RenderForm :value="mock"  :form-models="model" />
      </ElCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElCard, ElTree, ElIcon, } from 'element-plus'
import { Plus, Minus, MessageBox } from "@element-plus/icons-vue"
import { ref } from 'vue'
import RenderForm from '../../components/RenderForm.vue'
import { v4 as uuid } from 'uuid'
const tree = ref<(any)>()

const mock = ref({})


const model: DataModel[] = [
  {
    label: '名字',
    key: 'name',
    uuid: uuid(),
    type: 'text',
    require: false,
  },
  {
    label: '年龄',
    uuid: uuid(),
    key: 'age',
    type: 'text',
    require: false,
  },
  {
    label: '家庭成员',
    key: 'family',
    uuid: uuid(),
    type: 'list',
    children: [
      {
        label: '名字',
        key: 'name',
        uuid: uuid(),
        type: 'text',
        require: false,
      },
      {
        label: '年龄',
        key: 'age',
        uuid: uuid(),
        type: 'text',
        require: false,
      },
      {
        label: '学历',
        key: '学历',
        uuid: uuid(),
        type: 'list',
        children: [
          {
            label: '高中',
            key: '高中',
            uuid: uuid(),
            type: 'text',
          },
          {
            label: '初中',
            key: '初中',
            uuid: uuid(),
            type: 'text',
          },
        ]
      }
    ],
    require: false,
  }
]




function change(data: any, node: any) {
  console.log(data, node);
}

function remove(node, data, cfg) {
  tree.value?.remove(cfg.data)
}

function canDel(data: DataModel) {
  return !data.children?.length
}

function canAdd() {

}

</script>

<style lang="less">
.page-model {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 2;
  flex-shrink: 2;

  .model-block {
    width: 33%;
    border-radius: 5px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .custom-tree-node {
    // margin: 10px;
    flex-wrap: 2;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }


}
</style>