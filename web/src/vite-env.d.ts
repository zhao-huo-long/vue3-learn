/// <reference types="vite/client" />


interface DataModel {
  type?: 'text' | 'image' | 'list'
  key: string
  label: string
  require?: boolean
  children?: DataModel[]
}