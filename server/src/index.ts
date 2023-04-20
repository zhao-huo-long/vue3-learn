import express from 'express'
import path from 'path'
import busboy from 'busboy'
import fs from 'fs'
import YAML from 'yaml'
import { v4 as uuid } from 'uuid';


const configPath = './config.yaml'

interface Config {
  port?: string
  host?: string
  upload?: string
}

const { port, host, upload = '.' } = YAML.parse(fs.readFileSync(configPath, 'utf-8')) as Config

const app = express()

app.get('/', function (_, res) {
  res.sendFile(path.resolve('./template/index.html'));
})

app.post('/upload/file/single', function (req, res) {
  const bb = busboy({ headers: req.headers });
  bb.on('file', (name, file, info) => {
    const target = `${path.resolve(upload)}${path.sep}${uuid()}`
    file.pipe(fs.createWriteStream(target));
  });
  bb.on('close', () => {
    res.writeHead(200, { 'Connection': 'close' });
    res.end(`That's all folks!`);
  });
  req.pipe(bb);
})

app.post('/upload/file/chunk/declare', function(req, res){
  // req.body
});

app.post('/upload/file/chunk', function(req, res){
  
})


app.listen(port, () => {
  console.log(`Example app listening on port http://${host}:${port}`)
},)