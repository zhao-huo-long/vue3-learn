<template>
  <template v-if="Array.isArray(modelItem)">
    <render-model v-for="i in modelItem" :prop="`${prop}.${i.key}`" :modelItem="i" :key="i.key"></render-model>
  </template>
  <template v-if="!Array.isArray(modelItem) && Array.isArray(modelItem.children)">
    <el-sub-menu :index="`${prop}`">
      <template #title>
        {{ modelItem.label }}
      </template>
      <render-model :modelItem="modelItem.children" :prop="`${prop}`"></render-model>
    </el-sub-menu>
  </template>
  <template v-else-if="!Array.isArray(modelItem)">
    <el-menu-item :key="modelItem.key" :index="`${prop}.${modelItem.key}`">
      {{ modelItem.label }}
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
import { ElSubMenu, ElMenuItem } from 'element-plus'

const { modelItem, prop } = defineProps<{
  modelItem: DataModel[] | DataModel,
  prop?: string
}>();
</script>

