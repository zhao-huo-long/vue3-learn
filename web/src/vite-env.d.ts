/// <reference types="vite/client" />


interface DataModel {
  uuid: string,
  type?: 'text' | 'image' | 'list'
  key: string
  label: string
  require?: boolean
  children?: DataModel[]
}