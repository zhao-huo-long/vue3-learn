import { set } from 'lodash-es'
import { v4 } from 'uuid'

export function createByModels(target = {}, models) {
  for (const model of models) {
    if (model.type === 'text') {
      set(target, model.key, '')
    }
    if (model.type === 'image') {
      set(target, model.key, '')
    }
    if (model.type === 'list') {
      set(target, model.key, [
        createByModels({}, model.children || [])
      ])
    }
  }
  return target
}


export const MODEL_TYPE_OP = [{
  label: '列表',
  value: 'list'
}, {
  label: '文本',
  value: 'text',
}, {
  label: '图片',
  value: 'image',
}]

export const MODEL_TYPE = MODEL_TYPE_OP.map(i => i.value)

export function createModel(type, option) {
  return {
    ...option,
    type,
    uuid: v4(),
  }
}