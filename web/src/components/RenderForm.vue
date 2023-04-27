<template>
  <template v-if="formModels.length" v-for="model in formModels">
    <RenderForm :value="value" :form-models="model">
    </RenderForm>
  </template>
  <template v-else-if="formModels.type === 'list'">
    <div v-if="formModels?.children?.length" style="margin-left:35px">
      {{ formModels.label + ' / ' + formModels.key }}
      <RenderForm :key="formModels.key + i" v-for="(v, i) in value[formModels.key]" :value="v"
        :form-models="formModels.children">
      </RenderForm>
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
<script lang="ts" setup>
import { ElFormItem, ElInput, ElUpload } from 'element-plus'

defineProps<{
  value: any,
  formModels: any
}>()

</script>
<style lang="less">
.cool-cms {
  margin: 10px;
  height: 100%;
}
</style>