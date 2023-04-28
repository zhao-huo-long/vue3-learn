<template>
  <el-dialog width="600" destroy-on-close @close="$emit('close')" v-model="dialogFormVisible" title="新增字段">
    <el-form ref="formRef" :model="form">
      <el-form-item prop="type" :rules="[req]" label="类型:" label-width="100">
        <el-select :disabled="type === 'edit'
          && form.type === 'list'
          && form.children?.length" style="width: 400px" v-model="form.type" placeholder="选择类型">
          <el-option v-for="i in MODEL_TYPE_OP" :key="i.value" :label="i.label" :value="i.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="label" :rules="[req]" label="描述:" label-width="100">
        <el-input style="width: 400px" v-model="form.label" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="key" :rules="[req]" label="属性名:" label-width="100">
        <el-input style="width: 400px" v-model="form.key" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="required" label="必填:" label-width="100">
        <el-switch v-model="form.required" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary" @click="ok">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElDialog, ElForm, ElFormItem, ElSelect, ElOption, ElInput, ElButton, ElSwitch } from 'element-plus'
import { reactive, ref, watch, } from 'vue'
import { MODEL_TYPE_OP, createModel } from '../../utils'

const req = { required: true, message: '请输入' }

const dialogFormVisible = ref(true)
const formRef = ref()

const props = defineProps(['vis', 'type', 'data'])

const emit = defineEmits(['close', 'confirm',])

const form = reactive({ ...(props.data || {}) })

const ok = async () => {
  const res = await formRef.value?.validate?.()
  if (res) {
    console.log(res)
    const data = createModel(form.type, form)
    emit('confirm', data)
  }
}

</script>