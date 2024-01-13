import type { DataItem } from './data'

export interface DataMeta {
  key: string
  isFirst: boolean
  isLast: boolean
  isLeaf: boolean
  expanded: boolean
  visible: boolean
  level: number
  parent?: string
  children: string[]
  ancestors: string[]
  descendants: string[]
}

export type DataMetaMap = Record<string, DataMeta>

export const getDataMetaMap = (data: DataItem[]) => {
  const dataMetaMap = {} as DataMetaMap

  const walk = (list: DataItem[], ancestors: string[] = []) => {
    const len = list.length
    const level = ancestors.length
    const parent = ancestors[level - 1]
    const visible = level === 0 || (dataMetaMap[parent]?.expanded && dataMetaMap[parent]?.visible)

    list.forEach(({ key, children = [] }, i) => {
      const isLeaf = children.length === 0
      const isLast = i === len - 1

      dataMetaMap[key] = {
        key,
        isFirst: i === 0,
        isLast,
        isLeaf,
        expanded: !isLeaf,
        level,
        parent,
        visible: !!visible,
        ancestors,
        descendants: [],
        children: children.map(item => item.key)
      }

      ancestors.forEach(ancestor => {
        dataMetaMap[ancestor].descendants.push(key)
      })

      if (children.length > 0) {
        walk(children, ancestors.concat(key))
      }
    })
  }

  walk(data, [])

  return dataMetaMap
}

export const flatten = (data: DataItem[]) => {
  const res = [] as DataItem[]

  const walk = (list: DataItem[]) => {
    list.forEach(item => {
      res.push(item)

      if (item.children?.length) {
        walk(item.children)
      }
    })
  }

  walk(data)

  return res
}
