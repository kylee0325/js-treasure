import { describe, it, expect } from 'vitest'
import { arrayToTree, FormatResult } from './array-to-tree'

interface Item {
  parent_id: any
  id: string
  name: string
}

const initialData: Item[] = [
  { parent_id: null, id: '1', name: 'Label 1' },
  { parent_id: '1', id: '2', name: 'Label 2' },
  { parent_id: '1', id: '3', name: 'Label 3' },
  { parent_id: '2', id: '4', name: 'Label 4' },
  { parent_id: '2', id: '5', name: 'Label 5' }
]

const initialData2: Item[] = [
  { parent_id: '1', id: '2', name: 'Label 2' },
  { parent_id: '1', id: '3', name: 'Label 3' },
  { parent_id: '2', id: '4', name: 'Label 4' },
  { parent_id: '2', id: '5', name: 'Label 5' },
  { parent_id: null, id: '1', name: 'Label 1' }
]

describe('utils/arrayToTree', () => {
  it('给定数组，转换树形结构数据正常', () => {
    const result = arrayToTree<Item>(initialData)

    const res: FormatResult<Item>[] = [
      {
        id: '1',
        name: 'Label 1',
        parent_id: null,
        children: [
          {
            id: '2',
            name: 'Label 2',
            parent_id: '1',
            children: [
              {
                id: '4',
                name: 'Label 4',
                parent_id: '2'
              },
              {
                id: '5',
                name: 'Label 5',
                parent_id: '2'
              }
            ]
          },
          {
            id: '3',
            name: 'Label 3',
            parent_id: '1'
          }
        ]
      }
    ]
    expect(result).toEqual(res)
  })

  it('给定乱序数组，转换树形结构数据正常', () => {
    const result = arrayToTree(initialData2)
    const res2: FormatResult<Item>[] = [
      {
        id: '1',
        name: 'Label 1',
        parent_id: null,
        children: [
          {
            id: '2',
            name: 'Label 2',
            parent_id: '1',
            children: [
              {
                id: '4',
                name: 'Label 4',
                parent_id: '2'
              },
              {
                id: '5',
                name: 'Label 5',
                parent_id: '2'
              }
            ]
          },
          {
            id: '3',
            name: 'Label 3',
            parent_id: '1'
          }
        ]
      }
    ]
    expect(result).toEqual(res2)
  })

  it('给定数组，改变parentId的值，转换树形结构数据正常', () => {
    const result = arrayToTree(initialData, {
      rootId: '1'
    })

    const res3: FormatResult<Item>[] = [
      {
        id: '2',
        name: 'Label 2',
        parent_id: '1',
        children: [
          {
            id: '4',
            name: 'Label 4',
            parent_id: '2'
          },
          {
            id: '5',
            name: 'Label 5',
            parent_id: '2'
          }
        ]
      },
      {
        id: '3',
        name: 'Label 3',
        parent_id: '1'
      }
    ]
    expect(result).toEqual(res3)
  })
})
