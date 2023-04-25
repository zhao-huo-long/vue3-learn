<template>
  <div class="cool-cms">
    <!-- <ElForm  :label-position="'right'" :model="form">
      <RenderForm :value="form" :form-models="models" />
    </ElForm> -->
    <model-page />
  </div>
</template>
<script lang="ts" setup>
import RenderForm from './components/RenderForm.vue';
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import ModelPage from './page/model/index.vue'
import { reactive, watch } from 'vue';
// import { ref } from 'vue';
const form = reactive<Record<string, string>>({})

watch(form, () => {
  console.log(form)
}, { deep: true })

const models = [
  {
    type: 'input',
    prop: 'name',
  },
  {
    type: 'enum',
    prop: 'enum',
  },
  {
    type: 'image',
    prop: 'img'
  },
  {
    type: 'list',
    prop: 'list',
    children: [
      {
        type: 'input',
        prop: 'name',
      },
      {
        type: 'enum',
        prop: 'enum',
      },
      {
        type: 'image',
        prop: 'img'
      },
      {
        type: 'list',
        prop: 'list',
        children: [
          {
            type: 'input',
            prop: 'name',
          },
          {
            type: 'enum',
            prop: 'enum',
          },
          {
            type: 'image',
            prop: 'img'
          },
        ]
      }
    ]
  }
]

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