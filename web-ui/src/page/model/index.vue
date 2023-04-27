<template>
  <div class="page-model">
    <div class="model-block">
      <ModelTree />
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
            <RenderForm :value="mockVal" :form-models="model" />
          </ElForm>
        </div>
      </ElCard>
    </div>
  </div>
</template>
<script setup>
import { ElCard, ElTree, ElIcon, ElForm } from 'element-plus'
import { Plus, Minus, MessageBox } from "@element-plus/icons-vue"
import { ref, watch, reactive, provide } from 'vue'
import RenderForm from '../../components/RenderForm.vue'
import ModelTree from './ModelTree.vue'
import { createByModels } from '../../utils'

const tree = ref()

const model = reactive([])

provide('model', model)

const mockVal = ref(createByModels({}, model))

provide('mockVal', mockVal)

watch(model, () => {
  mockVal.value = createByModels({}, model);
}, { deep: true });

watch(mock, () => {
}, { deep: true });

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
    color: #606266;
  }

  .el-icon {
    height: 100%;
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