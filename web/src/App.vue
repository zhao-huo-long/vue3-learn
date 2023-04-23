<!-- <script setup lang="ts">
import axios from 'axios'
import { FileSliceCls } from 'js-utils-collection/esm/lib/file-slice'
import { ref } from 'vue';

const file = ref(null)

// console.log(s)

function fileChange(v: Event) {
  console.log(v?.target?.files?.[0])
  file.value = v?.target?.files?.[0]
}

async function click() {
  const { data: { fileId } } = await axios('http://localhost:9000/upload/file/chunk/declare', { method: 'post' })
  const slice = new FileSliceCls(file.value!, 1024 * 1024,)
  slice.chunkHandlerAsync(({ size, chunk, index }) => {
    const data = new FormData()
    data.append('file', chunk);
    return axios('http://localhost:9000/upload/file/chunk/append',
      {
        method: 'post',
        headers: {
          'x-file-id': fileId,
          'x-chunk-start': 1024 * 1024 * index,
          'x-chunk-size': size
        },
        data,
      })
  }).then(() => {
    axios('http://localhost:9000/upload/file/chunk/finish',
      {
        method: 'post',
        headers: {
          'x-file-id': fileId,
        },
      })
  })

}

</script>

<template>
  <div>
    <div>
      <input @change="fileChange" type="file">
      <button @click="click" class="fs">upload</button>
    </div>
  </div>
</template>

<style scoped></style> -->
