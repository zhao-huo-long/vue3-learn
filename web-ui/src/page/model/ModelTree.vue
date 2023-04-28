<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <el-icon>
          <MessageBox />
        </el-icon>
        <span style="margin-left: 6px;">model名称</span>
        <el-icon @click="currentNode = model ; vis = true; type = 'add'" style="margin-left: auto">
          <Plus />
        </el-icon>
      </div>
    </template>
    <el-tree class="model-tree" ref="tree" @current-change=" change " :data=" model " default-expand-all node-key="uuid">
      <template #default=" cfg ">
        <div class="custom-tree-node">
          <span style="margin-right: 10px;">
            {{ cfg.node.label }}
            <code> / "{{ cfg.data.key }}" / {{ MODEL_MAP[cfg.data.type] }}</code>
          </span>
          <a class="btw" style="column-gap: 10px;">
            <a @click=" e => { e.stopPropagation(); type = 'edit'; currentNode = cfg.data; vis = true } ">
              <el-icon>
                <Edit />
              </el-icon>
            </a>
            <a v-if=" canDel(cfg.data) " @click=" remove(cfg.data, cfg.node, cfg) ">
              <el-icon>
                <Minus />
              </el-icon>
            </a>
            <a v-if=" canAdd(cfg.data) "
              @click=" e => { e.stopPropagation(); type = 'add'; currentNode = cfg.data; vis = true } ">
              <el-icon>
                <Plus />
              </el-icon>
            </a>
          </a>
        </div>
      </template>
    </el-tree>
    <AddModel  @confirm=" confirm " :data="currentNode" v-if="vis" :type=" type " @close=" vis = false "  />
  </ElCard>
</template>
<script setup>
import { ElCard, ElTree, ElIcon } from 'element-plus'
import { Plus, Minus, MessageBox, Edit } from "@element-plus/icons-vue"
import AddModel from './AddModel.vue'
import { ref, inject } from 'vue'
import { MODEL_MAP } from '../../utils';

const currentNode = ref();
const model = inject('model');
const type = ref('add')
const vis = ref()
const tree = ref()

function confirm(data) {
  if (currentNode.value.push) {
    currentNode.value.push(data)
  } else if(type.value === 'add') {
    tree.value.append(data, currentNode.value)
  }else if(type.value === 'edit'){
    // console.log(data)
    Object.assign(currentNode.value, data)
  }
}

function change(e) {
  console.log(e)
}

function remove(_node, _data, cfg) {
  tree.value?.remove(cfg.data)
}

function canDel(data) {
  return !data.children?.length
}


function canAdd(data) {
  return ['list'].includes(data.type)
}
</script>

<style lang="less">
.custom-tree-node {
  // margin: 10px;
  flex-wrap: 2;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
}

.model-tree {
  .el-tree-node__content {
    margin: 5px 0;
  }
}
</style>