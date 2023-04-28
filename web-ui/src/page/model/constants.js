import { v4 as uuid } from 'uuid'

export const FakerModels = [
  {
    'type': 'text',
    "label": '拉屎人',
    "key": "name",
    "uuid": uuid(),
    "required": true,
  },
  {
    'type': 'boolean',
    "label": '隐藏记录',
    "key": "hide",
    "uuid": uuid(),
  },
  {
    type: 'list',
    label: '拉屎记录',
    key: 'log',
    "uuid": uuid(),
    children: [
      {
        type: 'text',
        key: 'in-time',
        label: '进去时间',
        "uuid": uuid(),
      },
      {
        type: 'text',
        key: 'out-time',
        label: '出去时间',
        "uuid": uuid(),
        "required": true,
      },
      {
        type: "list",
        key: 'wait',
        label: '等待列表',
        "uuid": uuid(),
        children: [
          {
            'type': 'text',
            "label": '等待',
            "key": "name",
            "uuid": uuid(),
          },
        ]
      }
    ]
  }
]