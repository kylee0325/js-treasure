export interface FormatOptions {
  parentKey: string
  childrenKey: string
  idKey: string
}

type ID = string | number | null

function getOptions(options: Partial<FormatOptions>): FormatOptions {
  return Object.assign({ parentKey: 'parent_id', childrenKey: 'children', idKey: 'id' }, options)
}

interface IdMap {
  [key: string]: any
}

export function arrayToTree<T>(list: T[], rootId: ID = null, options: Partial<FormatOptions>) {
  const { parentKey, childrenKey, idKey } = getOptions(options)
  const treeData: T[] = []
  const idMap: IdMap = {}

  list.forEach((item: any) => {
    const newItem = JSON.parse(JSON.stringify(item))
    const id = newItem[idKey]
    const parentId = newItem[parentKey]

    idMap[id] = {
      ...newItem,
      ...(idMap[id] && idMap[id][childrenKey] ? { [childrenKey]: idMap[id][childrenKey] } : null)
    }

    const treeItem = idMap[id]

    if (parentId === rootId) {
      treeData.push(treeItem)
    } else if (idMap[parentId]) {
      if (idMap[parentId][childrenKey]) {
        idMap[parentId][childrenKey].push(treeItem)
      } else {
        idMap[parentId][childrenKey] = [treeItem]
      }
    } else {
      idMap[parentId] = { [childrenKey]: [treeItem] }
    }
  })

  return treeData
}
