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
            <el-icon @click="currentNode = model ;vis = true" style="margin-left: auto">
              <Plus />
            </el-icon>
          </div>
        </template>
        <el-tree ref="tree" @current-change="change" :data="model" draggable
          default-expand-all node-key="uuid">
          <template #default="cfg">
            <div class="custom-tree-node">
              <span>{{ cfg.node.label }}</span>
              <span>
                <a v-if="canDel(cfg.data)" @click="remove(cfg.data, cfg.node, cfg)">
                  <el-icon>
                    <Minus />
                  </el-icon>
                </a>
                <a v-if="canAdd(cfg.data)" style="margin-left: 8px"
                  @click="e => { e.stopPropagation(); currentNode = cfg.data; vis = true }">
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
        <div>
          <ElForm :label-width="140" label-position="top">
            <RenderForm :value="mock" :form-models="model" />
          </ElForm>
        </div>
      </ElCard>
    </div>
    <AddModel @confirm="confirm" @close="vis = false" :vis="vis" />
  </div>
</template>
<script lang="ts" setup>
import { ElCard, ElTree, ElIcon, ElForm } from 'element-plus'
import { Plus, Minus, MessageBox } from "@element-plus/icons-vue"
import { ref, watch, reactive } from 'vue'
import RenderForm from '../../components/RenderForm.vue'
import AddModel from '../../components/AddModel.vue'
import { v4 as uuid } from 'uuid'
import { createByModels } from '../../utils'

const vis = ref<(boolean)>(false)

const tree = ref<(any)>()

const model: DataModel[] = reactive([] || [
  {
    label: '名字',
    key: 'name',
    uuid: uuid(),
    type: 'text',
    require: false,
  },
  {
    label: '头像',
    key: 'avatar',
    uuid: uuid(),
    type: 'image',
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
        label: '头像',
        key: 'avatar',
        uuid: uuid(),
        type: 'image',
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
])

const mock = ref(createByModels({}, model))

watch(mock, () => {
  console.log(mock)
}, { deep: true })

watch(mock, () => {
  console.log(mock)
}, { deep: true })

const currentNode = ref()

function confirm(data: any) {
  // console.log(data, currentNode)
  if(currentNode.value.push){
    // currentNode.value.push(data)
  }else{
    tree.value?.append(data, currentNode.value)
  }
}

function change(e) {
  console.log(e)
}

function add(parent: any, data: any) {

}

function remove(_node: any, _data: any, cfg: any) {
  tree.value?.remove(cfg.data)
}

function canDel(data: DataModel) {
  return !data.children?.length
}


function canAdd(data: DataModel) {
  return ['list'].includes(data.type!)
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