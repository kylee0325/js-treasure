type ID = string | number | null
export interface FormatOptions {
  parentKey: string
  idKey: string
  rootId: ID
}

function getOptions(options?: Partial<FormatOptions>): FormatOptions {
  return Object.assign({ parentKey: 'parent_id', idKey: 'id', rootId: null }, options)
}

const cloneDeep = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data))
}

export type FormatResult<T> = T & { children?: FormatResult<T>[] }

export function arrayToTree<T extends Record<string, any>>(
  list: T[],
  options?: Partial<FormatOptions>
): FormatResult<T>[] {
  const { parentKey, idKey, rootId } = getOptions(options)
  const treeData: FormatResult<T>[] = []
  const idMap: Record<string, any> = {}

  list.forEach((item: T) => {
    const newItem = cloneDeep(item)
    const id = newItem[idKey]
    const parentId = newItem[parentKey]

    idMap[id] = {
      ...newItem,
      ...(idMap[id] && idMap[id].children ? { children: idMap[id].children } : null)
    }

    const treeItem = idMap[id]

    if (parentId === rootId) {
      treeData.push(treeItem)
    } else if (idMap[parentId]) {
      if (idMap[parentId].children) {
        idMap[parentId].children.push(treeItem)
      } else {
        idMap[parentId].children = [treeItem]
      }
    } else {
      idMap[parentId] = { children: [treeItem] }
    }
  })

  return treeData
}
