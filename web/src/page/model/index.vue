<template>
  <div class="page-model">
    <div class="model-block">
      <ElCard>
        <ElMenu>
          <render-model :modelItem="model"></render-model>
        </ElMenu>
      </ElCard>
    </div>
    <div class="model-block">
      <ElCard>
        123123
      </ElCard>
    </div>
    <div class="model-block">
      <ElCard>
        123123
      </ElCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ElCard, ElMenu } from 'element-plus'
import RenderModel from './RenderModel.vue'
const model: DataModel[] = [
  {
    label: '名字',
    key: 'name',
    type: 'text',
    require: false,
  },
  {
    label: '年龄',
    key: 'age',
    type: 'text',
    require: false,
  },
  {
    label: '家庭成员',
    key: 'family',
    type: 'list',
    children: [
      {
        label: '名字',
        key: 'name',
        type: 'text',
        require: false,
      },
      {
        label: '年龄',
        key: 'age',
        type: 'text',
        require: false,
      },
      {
        label: '学历',
        key: '学历',
        type: 'list',
        children: [
          {
            label: '高中',
            key: '高中',
            type: 'text',
          },
          {
            label: '初中',
            key: '初中',
            type: 'text',
          },
        ]
      }
    ],
    require: false,
  }
]

</script>

<style lang="less" scoped>
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
}
</style>