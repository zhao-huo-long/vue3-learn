<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <el-icon>
          <MessageBox />
        </el-icon>
        <span style="margin-left: 6px;">model名称</span>
        <el-icon @click="currentNode = model ; vis = true" style="margin-left: auto">
          <Plus />
        </el-icon>
      </div>
    </template>
    <el-tree ref="tree" @current-change=" change " :data=" model " default-expand-all node-key="uuid">
      <template #default=" cfg ">
        <div class="custom-tree-node">
          <span>{{ cfg.node.label }}</span>
          <a class="btw" style="column-gap: 10px;">
            <a v-if=" canDel(cfg.data) " @click=" remove(cfg.data, cfg.node, cfg) ">
              <el-icon>
                <Minus />
              </el-icon>
            </a>
            <a v-if=" canAdd(cfg.data) " @click=" e => { e.stopPropagation(); currentNode = cfg.data; vis = true } ">
              <el-icon>
                <Plus />
              </el-icon>
            </a>
          </a>
        </div>
      </template>
    </el-tree>
    <AddModel @confirm=" confirm " @close=" vis = false " :vis=" vis " />
  </ElCard>
</template>
<script setup>
import { ElCard, ElTree, ElIcon, ElForm } from 'element-plus'
import { Plus, Minus, MessageBox } from "@element-plus/icons-vue"
import AddModel from '../../components/AddModel.vue'
import { ref, watch, reactive, provide, inject } from 'vue'

const currentNode = ref();
const model = inject('model');
const vis = ref()

function confirm(data) {
  if (currentNode.value.push) {
    currentNode.value.push(data)
  } else {
    tree.value?.append(data, currentNode.value)
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