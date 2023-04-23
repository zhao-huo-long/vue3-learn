import dayjs from 'dayjs'
import { sep } from 'path'
import { resolve } from 'path'
import fs from 'fs'
import { v4 as uuid } from 'uuid'


export const today = () => dayjs().format('YYYY-MM-DD')

export const createFileStream = (upload: string) => {
  const dir = `${resolve(upload)}${sep}${today()}`
  fs.mkdirSync(dir, { recursive: true })
  const id = uuid()
  const target = `${dir}${sep}${id}`
  return {
    id,
    dir,
    stream: fs.createWriteStream(target),
  }
}

export const createTargetPath = (save: string) => {
  const dir = resolve(save, today())
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

export const createChunkPath = (save: string) => {
  const dir = resolve(save, today())
  fs.mkdirSync(dir, { recursive: true })
  return dir
}
