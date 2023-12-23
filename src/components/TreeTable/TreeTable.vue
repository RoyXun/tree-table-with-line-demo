<template>
  <div class="wrapper">
    <el-table :data="tableData" class="tree-table" border>
      <el-table-column class-name="tree-cell" width="200">
        <template #default="{ row }">
          <div class="row-indent">
            <div class="row-indent-unit" v-for="num in getLevel(row.key)" :key="num"
              :class="getIndentClass(row.key, num)"></div>
          </div>
          <div class="row-switcher" :class="getSwitcherClass(row.key)">
            <template v-if="!isLeaf(row.key)">
              <el-icon v-if="isExpanded(row.key)" class="row-switcher__icon" @click="toggleExpand(row.key, false)">
                <Minus></Minus>
              </el-icon>
              <el-icon v-else class="row-switcher__icon" @click="toggleExpand(row.key, true)">
                <Plus></Plus>
              </el-icon>
            </template>
          </div>
          <div>{{ row.key }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="key" label="Key">
      </el-table-column>
      <el-table-column label="Level">
        <template #default="{ row }">
          {{ getLevel(row.key) }}
        </template>
      </el-table-column>
      <el-table-column label="expanded">
        <template #default="{ row }">
          {{ isExpanded(row.key) }}
        </template>
      </el-table-column>
      <el-table-column label="isFirst">
        <template #default="{ row }">
          {{ isFirst(row.key) }}
        </template>
      </el-table-column>
      <el-table-column label="isLast">
        <template #default="{ row }">
          {{ isLast(row.key) }}
        </template>
      </el-table-column>
      <el-table-column label="isLeaf">
        <template #default="{ row }">
          {{ isLeaf(row.key) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Plus, Minus } from '@element-plus/icons-vue'
import { getDataMetaMap, flatten, type DataMetaMap } from './utils'
import data from './data'

const flatTableData = flatten(data)
const dataMetaMap = ref<DataMetaMap>(getDataMetaMap(data))
const tableData = computed(() => flatTableData.filter(({ key }) => isVisible(key)))

function toggleExpand(key: string, expanded: boolean) {

  const walk = (list: string[]) => {
    list.forEach(item => {
      const meta = getDataMeta(item)!
      const parentMeta = getDataMeta(meta.parent)

      meta.visible = !!(parentMeta?.visible && parentMeta.expanded)


      if (meta.children.length) {
        walk(meta.children)
      }
    })
  }

  const dataMeta = getDataMeta(key)

  if (dataMeta) {
    dataMeta.expanded = expanded
    walk(dataMeta.children)
  }
}

function getDataMeta(key?: string) {
  return key ? dataMetaMap.value[key] : null
}

function isVisible(key: string) {
  return dataMetaMap.value[key]?.visible
}

function isFirst(key: string) {
  return dataMetaMap.value[key]?.isFirst
}

function isLast(key: string) {
  return dataMetaMap.value[key]?.isLast
}

function isExpanded(key: string) {
  return dataMetaMap.value[key].expanded
}


function isLeaf(key: string) {
  return dataMetaMap.value[key]?.isLeaf
}

function getLevel(key: string) {
  return dataMetaMap.value[key]?.level
}

function getSwitcherClass(key: string) {
  const leaf = isLeaf(key)
  const expanded = isExpanded(key)
  const level = getLevel(key)

  return {
    leaf,
    collapsed: !leaf && !expanded,
    expanded: !leaf && expanded,
    root: level === 0
  }
}

function getIndentClass(key: string, num: number) {
  const last = isLast(key)
  const level = getLevel(key)

  return {
    last: last && num === level,
    invisible: dataMetaMap.value[key].hideFirstIndentLine && num === 1,
  }
}

</script>

<style lang="less" scoped>
.wrapper {
  width: 800px;
  margin: 80px auto;
}

.tree-table {
  --tree-table-line-color: #999;
}

:deep(.tree-cell) {

  .cell {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    padding: 8px 12px;
    overflow: visible;
    align-items: flex-start;

  }
}

.row-indent {
  display: inline-flex;
  flex: none;
  align-self: stretch;

  &-unit {
    position: relative;
    width: 24px;
    height: 100%;

    &::before,
    &::after {
      content: '';
      position: absolute;
      background-color: var(--tree-table-line-color);
    }

    // vertical
    &::before {
      left: 50%;
      top: -9px;
      bottom: -9px;
      width: 1px;
    }

    // horizontal
    &:last-child::after {
      height: 1px;
      left: 50%;
      right: 0;
      top: 12px;
    }

    &.last::before {
      bottom: auto;
      height: 21px;
    }

    &.invisible::before {
      display: none;
    }
  }
}

.row-switcher {
  position: relative;
  display: inline-flex;
  align-self: stretch;
  justify-content: center;
  flex: none;
  width: 24px;
  margin-right: 3px;

  &__icon {
    width: 12px;
    height: 12px;
    margin-top: 5px;
    border: 1px solid #999;
    color: #999;
    cursor: pointer;

    svg {
      width: 10px;
      height: 10px;
    }
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: var(--tree-table-line-color);
  }


  &.leaf {

    // horizontal
    &::after {
      left: 0;
      right: 5px;
      top: 12px;
      height: 1px;
    }
  }

  &.expanded {

    // vertical
    &::before {
      left: 50%;
      top: 24px;
      bottom: -9px;
      width: 1px;
    }
  }

  &.root {
    &::after {
      display: none;
    }
  }


}
</style>