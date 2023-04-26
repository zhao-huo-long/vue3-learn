<template>
  <div class="page-model">
    <div class="model-block">
      <ElCard>
        <el-tree ref="tree" :props="{ class: customNodeClass }" @current-change="change" :data="model" draggable
          default-expand-all node-key="key">
          <template #default="cfg">
            <div class="custom-tree-node">
              <span>{{ cfg.node.label }}</span>
              <span>
                <a v-if="canDel(cfg.data)" @click="remove(cfg.data, cfg.node, cfg)">
                  <el-icon>
                    <Minus />
                  </el-icon>
                </a>
                <a style="margin-left: 8px" @click="append(cfg.data)">
                  <el-icon>
                    <Plus />
                  </el-icon>
                </a>
              </span>
            </div>
          </template>
        </el-tree>
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
import { ElCard, ElTree, ElIcon } from 'element-plus'
import { Plus, Minus } from "@element-plus/icons-vue"
import { ref } from 'vue'
const tree = ref(null)

const customNodeClass = (data: Tree, node: Node) => {
  return 'model-item'
}

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

function change(data: any, node: any) {
  console.log(data, node);
}

function remove(a, b, cfg) {
  // model
  tree.value.remove(cfg.data)
}

function canDel(data: DataModel) {
  return !data.children?.length
}

function canAdd() {

}

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

  .custom-tree-node {
    // margin: 10px;
    flex-wrap: 2;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }

  .model-item {
    // height: 60px;
    // padding: 10px;
  }
}
</style>