import express from 'express'
import path, { resolve } from 'path'
import busboy from 'busboy'
import fs from 'fs'
import YAML from 'yaml'
import { v4 as uuid } from 'uuid';
import { today } from './utils'
import { createWriteStream } from 'fs'
import cors from 'cors';

const configPath = './config.yaml';

interface Config {
  port?: string
  host?: string
  upload?: string
  bigFileSave?: string
}

const {
  port,
  host,
  upload = './upload',
  bigFileSave = './bigFileSave'
} = YAML.parse(fs.readFileSync(configPath, 'utf-8')) as Config

const app = express()
const URL_PRE = `http://${host}:${port}`

app.use(cors())

app.use(express.json({
  limit: '1024MB'
}))

app.get('/', function (_, res) {
  res.sendFile(path.resolve('./template/index.html'));
})

app.get('/file/item/:time/:id', function (req, res) {
  const { fileId, fileName } = req.query as any
  const { time, id } = req.params
  const filePath = resolve(upload, time, id)
  if (!fs.existsSync(filePath)) {
    res.status(404)
    res.send()
    return
  }
  const headers = {
    'Content-Disposition': 'inline',
  }
  if (fileName?.trim?.()) {
    headers['Content-Disposition'] = `attachment; filename="${fileName.trim()}"`
  }
  res.sendFile(filePath, {
    maxAge: '30day',
    headers,
  })
})

app.post('/upload/file/single', function (req, res) {
  const bb = busboy({ headers: req.headers });
  bb.on('file', (name, file, info) => {
    const id = uuid()
    const timeStr = today()
    const dir = resolve(upload, timeStr)
    fs.mkdirSync(dir, { recursive: true })
    file.pipe(createWriteStream(resolve(dir, id)));
    res.json({
      success: true,
      data: `${URL_PRE}/file/item/${timeStr}/${id}`
    })
  });
  req.pipe(bb);
})

/**
 * 获取大文件
 */
app.get('/b/file/item/:id', function (req, res) {
  const { fileName } = req.query as any
  const { id } = req.params
  const filePath = resolve(bigFileSave, id)
  if (!fs.existsSync(filePath)) {
    res.status(404)
    res.send()
    return
  }
  const headers = {
    'Content-Disposition': 'inline',
  }
  if (fileName?.trim?.()) {
    headers['Content-Disposition'] = `attachment; filename="${fileName.trim()}"`
  }
  res.sendFile(filePath, {
    maxAge: '30day',
    headers,
  })
})


app.post('/upload/file/chunk/declare', function (req, res) {
  const id = uuid()
  const target = resolve(bigFileSave, `${CHUNK_STR}${id}`)
  const {
    md5,
  } = req.body
  createWriteStream(target)
    .destroy()
  res.send({
    fileId: id,
    type: 'chunk-upload',
    body: req.body
  });
});

// append
app.post('/upload/file/chunk/append', function (req, res) {
  const bb = busboy({ headers: req.headers })
  const id = req.headers['x-file-id']
  // const md5 = req.headers['x-file-md5']
  const start = req.headers['x-chunk-start'] || 0
  // const size = req.headers['x-chunk-size'] || 0
  const dir = resolve(bigFileSave);
  bb.on('file', (name, file, info) => {
    file.pipe(createWriteStream(resolve(dir, `${CHUNK_STR}${id}`,), {
      flags: 'a',
      start: parseInt(start as string)
    }))
    res.send({ success: true })
  });
  req.pipe(bb);
})


app.post('/upload/file/chunk/finish', function (req, res) {
  const id = req.headers['x-file-id']
  // const md5 = req.headers['x-file-md5']
  const dir = resolve(bigFileSave);
  const filePath = resolve(dir, `__chunk__file__${id}`);
  if (fs.existsSync(filePath)) {
    fs.renameSync(filePath, resolve(dir, `${id}`,))
    res.send({
      success: true,
      data: `${URL_PRE}/b/file/item/${id}`
    })
    return
  }
  res.sendStatus(403)
})



app.listen(port, () => {
  console.log(`Example app listening on port ${URL_PRE}`)
},)