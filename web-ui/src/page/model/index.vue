<template>
  <div class="page-model">
    <div class="model-block">
      <ModelTree />
    </div>
    <div class="model-block">
      <ElCard>
        <template #header>
          <div class="card-header">
            表单预览
          </div>
        </template>
        <div>
          <ElForm :model="mockVal" size="small" :label-width="140" label-position="top">
            <RenderForm :value="mockVal" :form-models="model" />
          </ElForm>
        </div>
      </ElCard>
    </div>
    <div class="model-block">
      <ElCard>
        <template #header>
          <div class="card-header">
            内容预览
          </div>
        </template>
        <pre><code class="language-json" v-html="preCode"></code></pre>
      </ElCard>
    </div>
  </div>
</template>
<script setup>
import { ElCard, ElForm } from 'element-plus'
import { ref, watch, reactive, provide, computed } from 'vue'
import RenderForm from '../../components/RenderForm.vue'
import ModelTree from './ModelTree.vue'
import { createByModels } from '../../utils'
import { FakerModels } from './constants'

const model = reactive(FakerModels || [])

provide('model', model)

const mockVal = ref(createByModels({}, model))

provide('mockVal', mockVal)

watch(model, () => {
  mockVal.value = createByModels({}, model);
}, { deep: true });

watch(mockVal, () => {
  hljs.highlightAll()
}, { deep: true });

const preCode = computed(() => hljs.highlight(JSON.stringify(mockVal.value, null, 2), { language: 'json' }).value)

</script>

<style lang="less">
.page-model {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  // column-gap: 10px;
  flex-grow: 2;
  flex-shrink: 2;

  .model-block {
    width: 33%;
    border-radius: 5px;
    // min-width: 400px;
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
}
</style>