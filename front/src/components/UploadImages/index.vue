<template>
  <div>
    <div class="list">
      <div v-for="(item, index) in props.modelValue" :key="item" class="image-list">
        <van-image :src="item" class="base" @click="preview(index)" />
        <van-icon
          name="clear"
          class="clear"
          size="20"
          color="#5D8AA3"
          @click="del(index)"
          v-if="!disabled"
        />
      </div>
      <Uploader
        :after-read="afterRead"
        :disabled="loadingUpload || disabled"
        v-if="props.modelValue.length < limit"
      >
        <div class="base uplaod">
          <van-icon name="plus" color="#5D8AA3" class="icon" v-if="!loadingUpload" />
          <loading v-else vertical>上传中...</loading>
        </div>
      </Uploader>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, PropType, defineEmits } from 'vue'
import { Uploader } from 'vant'
import { UploaderFileListItem } from 'vant/lib/uploader/types'
import { upload } from '@/api/resources'
import { Loading } from 'vant'
import { ImagePreview } from 'vant'
const props = defineProps({
  modelValue: {
    type: Array as PropType<string[]>,
    default: () => {
      return []
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 6
  }
})
const emit = defineEmits(['update:modelValue'])
const loadingUpload = ref(false)
// const imageList = ref<string[]>(props.modelValue)
const preview = (index: number) => {
  ImagePreview(props.modelValue, index)
}
const afterRead = async (
  file: UploaderFileListItem | UploaderFileListItem[],
  detail: {
    name: string | number
    index: number
  }
) => {
  const formData = new FormData()
  if (!Array.isArray(file)) {
    formData.append('file', file.file as Blob)
  }
  loadingUpload.value = true
  const res = await upload(formData)
  loadingUpload.value = false
  const newList = [...props.modelValue, res?.data?.result as string]
  console.log(newList)
  emit('update:modelValue', newList)
  console.log(res, detail)
}
const del = (index: number) => {
  const newList = [...props.modelValue]
  newList.splice(index, 1)
  emit('update:modelValue', newList)
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
}
.image-list {
  position: relative;
  .clear {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, -50%);
  }
  .base {
    position: relative;
    border-radius: 8px;
  }
}
.base {
  border-radius: 8px;
  overflow: hidden;
  height: 84px;
  width: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  margin-bottom: 16px;
}
.uplaod {
  border: 1px dashed rgba(0, 0, 0, 0.18);
  .icon {
    font-size: 21px;
  }
}
</style>
