<template>
  <div class="cool-cms">
    <template v-for="model in formModels">
      <ElFormItem :label="model.key" :prop="model.key">
        <ElInput v-if="model.type === 'input'" v-model="value[model.key]">
        </ElInput>
      </ElFormItem>
      <RenderForm v-if="model.type === 'list'" :value="value[model.key]" 
        :form-models="model.children">
      </RenderForm>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { ElFormItem, ElInput } from 'element-plus'

defineProps<{
  value: any,
  formModels: any
}>()

</script>
<style lang="less">
.cool-cms {
  margin: 10px;
  height: 100%;
  // background-color: #eee;
}

.n-menu .n-menu-item-content .n-menu-item-content-header {
  font-size: 16px;
}
</style>