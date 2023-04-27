<template>
  <template v-if="Array.isArray(formModels)" v-for="model in formModels">
    <RenderForm :value="value" :form-models="model">
    </RenderForm>
  </template>
  <template v-else-if="formModels?.type === 'list'">
    <div v-if="formModels?.children?.length" style="">
      {{ formModels.label + ' / ' + formModels.key }}
      <div style="margin-left:35px">
        <RenderForm :key="formModels.key + i" v-for="(v, i) in value[formModels.key]" :value="v"
          :form-models="formModels.children">
        </RenderForm>
      </div>
    </div>
  </template>
  <ElFormItem v-else-if="formModels" :key="formModels.key" :label="formModels.label + ' / ' + formModels.key"
    :prop="formModels.key">
    <ElInput v-if="formModels.type === 'text'" v-model="value[formModels.key]">
    </ElInput>
    <ElUpload v-if="formModels.type === 'image'" v-model="value[formModels.key]">
      <a type="primary">上传</a>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </ElUpload>
  </ElFormItem>
</template>
<script setup>
import { ElFormItem, ElInput, ElUpload } from 'element-plus'

defineProps(['formModels', 'value'])

</script>
<style lang="less">
.cool-cms {
  margin: 10px;
  height: 100%;
}
</style>