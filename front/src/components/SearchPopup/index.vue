<template>
  <!-- 弹出框搜索小区 -->
  <van-popup
    v-model:show="show"
    :style="{ height: '100%', background: '#f9f9f9' }"
    position="bottom"
    closeable
    get-container="body"
  >
    <div class="fixed-top" style="z-index: 5">
      <van-search
        class="popup-van-search"
        v-model.trim="searchVal"
        :placeholder="placeholder"
        @update:model-value="onSearch"
        @clear="onClear"
        show-action
        :maxlength="15"
      >
        <template #left>
          <van-icon name="arrow-left" @click="close" size="16" class="left-back" />
        </template>
        <template #action>
          <van-button type="primary" color="#7AB439" @click="onConfirm" class="search-btn">{{
            confirmText
          }}</van-button>
        </template>
      </van-search>
    </div>
    <div class="margin-bg"></div>
    <van-list class="list-container popup-list-container" v-if="data.length > 0">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="popup-list-item"
        @click="clickSelect(item)"
      >
        <div class="item-name">{{ item.name }}</div>
        <van-icon name="success" class="item-check" v-if="inSelect.code === item.code" />
      </div>
    </van-list>
    <div v-else class="list-container no-data-text">
      {{
        searchVal && listData.length > 0 ? '搜不到内容，请重新输入或者点击确定提交!' : noDataText
      }}
    </div>
    <div style="height: 46px"></div>
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watchEffect, PropType, watch } from 'vue'
import { Toast } from 'vant'
export type ListItem = { name: string; code: string }

const emit = defineEmits(['selectCallback', 'update:visible'])
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '请输入小区名称'
  },
  confirmText: {
    type: String,
    default: '确定'
  },
  noInputToastText: {
    type: String,
    default: '请输入小区名称!'
  },
  noDataText: {
    type: String,
    default: '暂无小区，您可以直接输入小区名称后确定提交!'
  },
  listData: {
    type: Array as PropType<ListItem[]>,
    default() {
      return []
    }
  },
  inSelect: {
    type: Object as PropType<ListItem>,
    default() {
      return {}
    }
  }
})

const show = ref(false)
const data = ref<ListItem[]>([])
const searchVal = ref('')

watch(
  () => props.inSelect.name,
  (val: string) => {
    searchVal.value = val
  },
  { immediate: true }
)
watch(
  () => props.visible,
  (val: boolean) => {
    if (val) {
      data.value = props.listData
    }
  },
  { immediate: true }
)

const onSearch = () => {
  if (!searchVal.value) {
    onClear()
    return
  }
  data.value = props.listData.filter((item: ListItem) => {
    return item.name.indexOf(searchVal.value) > -1
  })
}

const onClear = () => {
  data.value = props.listData
}

const onConfirm = () => {
  if (searchVal.value) {
    emit('selectCallback', {
      name: searchVal.value,
      code: ''
    })
    close()
  } else {
    Toast.fail(`${props.noInputToastText}`)
  }
}
const clickSelect = (selectItem: ListItem) => {
  emit('selectCallback', selectItem)
  close()
}

const close = () => {
  emit('update:visible', false)
}

watchEffect(() => {
  show.value = props.visible
})
</script>

<style lang="scss" scoped>
.list-container {
  margin-top: 50px;
  z-index: 2;
}
.margin-bg {
  position: fixed;
  top: 40px;
  left: 0px;
  height: 10px;
  width: 100%;
  background: #f9f9f9;
  z-index: 99;
}
</style>
