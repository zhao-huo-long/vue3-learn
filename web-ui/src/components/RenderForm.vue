<template>
  <template v-if="Array.isArray(formModels)" v-for="model in formModels">
    <RenderForm :parent-key="parentKey" :list-index="listIndex" :value="value" :form-models="model">
    </RenderForm>
  </template>
  <template v-else-if="formModels?.type === 'list'">
    <div style="
    margin-bottom: 30px;
    margin-top: 10px;
    border-left: 1px solid sandybrown;
    padding-left: 20px; ">
      <div class="btw">
        <code>"{{ keyLabel }}" / {{ formModels.label }}</code>
        <ElIcon @click="value[formModels.key].push(createByModels({}, formModels.children))">
          <Plus></Plus>
        </ElIcon>
      </div>
      <div style="
    margin-bottom: 30px;
    margin-top: 10px;
    border-left: 1px solid lightseagreen;
    padding-left: 20px; " :key="formModels.key + i" v-for="(v, i) in value[formModels.key]">
        <div class="btw"> <code>"{{ keyLabel + '.' + i }}"</code>
          <ElIcon @click="value[formModels.key].splice(i, 1)">
            <Minus />
          </ElIcon>
        </div>
        <RenderForm :parent-key="keyLabel" :list-index="i" :value="v" :form-models="formModels.children">
        </RenderForm>
      </div>
    </div>
  </template>
  <div v-else-if="formModels">
    <code>"{{ keyLabel }}" / {{ formModels.label }}</code>
    <ElFormItem :key="formModels.key" :prop="keyLabel" :rules="[{ required: formModels.required, message: '请输入', }]">
      <ElInput v-if="formModels.type === 'text'" v-model="value[formModels.key]">
      </ElInput>
      <ElSwitch v-if="formModels.type === 'boolean'" v-model="value[formModels.key]">
      </ElSwitch>
      <ElUpload v-if="formModels.type === 'image'" v-model="value[formModels.key]">
        <a type="primary">上传</a>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500KB.
          </div>
        </template>
      </ElUpload>
    </ElFormItem>
  </div>
</template>
<script setup>
import { ElFormItem, ElInput, ElUpload, ElIcon, ElSwitch } from 'element-plus'
import { Plus, Minus, } from "@element-plus/icons-vue"
import { computed } from 'vue';
import { createByModels } from '../utils'

const { listIndex, formModels, parentKey } = defineProps(['formModels', 'value', 'listIndex', 'parentKey'])

const keyLabel = computed(() => {
  const indexKey = typeof listIndex === 'number' ? listIndex + '.' + formModels.key : formModels
  return parentKey ? parentKey + '.' + indexKey : formModels.key
})
</script>
<style lang="less"></style>