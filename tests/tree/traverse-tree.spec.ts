import { describe, it, expect, vi } from 'vitest'
import { traverseTree } from '../../src'

const initialData = [
  {
    parent_id: null,
    id: '1',
    name: 'Label 1',
    children: [
      { parent_id: '1', id: '11', name: 'Label 1-1' },
      { parent_id: '1', id: '12', name: 'Label 1-2' },
      { parent_id: '1', id: '13', name: 'Label 1-3' }
    ]
  },
  {
    parent_id: null,
    id: '2',
    name: 'Label 2',
    children: [
      { parent_id: '2', id: '21', name: 'Label 2-1' },
      { parent_id: '2', id: '22', name: 'Label 2-2' },
      { parent_id: '2', id: '23', name: 'Label 2-3' }
    ]
  }
]

const initialData2 = [
  {
    parent_id: null,
    id: '1',
    name: 'Label 1',
    child: [
      { parent_id: '1', id: '11', name: 'Label 1-1' },
      { parent_id: '1', id: '12', name: 'Label 1-2' },
      { parent_id: '1', id: '13', name: 'Label 1-3' }
    ]
  },
  {
    parent_id: null,
    id: '2',
    name: 'Label 2',
    child: [
      { parent_id: '2', id: '21', name: 'Label 2-1' },
      { parent_id: '2', id: '22', name: 'Label 2-2' },
      { parent_id: '2', id: '23', name: 'Label 2-3' }
    ]
  }
]

const initialList = [
  { parent_id: null, id: '1', name: 'Label 1' },
  { parent_id: '1', id: '11', name: 'Label 1-1' },
  { parent_id: '1', id: '12', name: 'Label 1-2' },
  { parent_id: '1', id: '13', name: 'Label 1-3' },
  { parent_id: null, id: '2', name: 'Label 2' },
  { parent_id: '2', id: '21', name: 'Label 2-1' },
  { parent_id: '2', id: '22', name: 'Label 2-2' },
  { parent_id: '2', id: '23', name: 'Label 2-3' }
]

describe('utils/traverseTree', () => {
  it('传入树形结构数据，遍历次数准确', () => {
    const spy = vi.fn((node) => {})

    traverseTree(initialData, spy)
    expect(spy).toHaveBeenCalledTimes(8)
  })

  it('传入数组，遍历次数准确', () => {
    const spy = vi.fn((node) => {})

    traverseTree(initialList, spy)
    expect(spy).toHaveBeenCalledTimes(8)
  })

  it('传入树形结构数据，遍历数据齐全', () => {
    let arr = [] as any[]

    traverseTree(initialData, (node) => {
      const { children, ...rest } = node
      arr.push({ ...rest })
    })

    expect(arr).toEqual(initialList)
  })

  it('传入数组，遍历数据齐全', () => {
    let arr = [] as any[]

    traverseTree(initialList, (node) => {
      const { children, ...rest } = node
      arr.push({ ...rest })
    })

    expect(arr).toEqual(initialList)
  })

  it('传入树形结构数据，改变childKey，遍历功能正常', () => {
    const arr = [] as any[]
    const arr2 = [] as any[]

    const result = [
      { parent_id: null, id: '1', name: 'Label 1' },
      { parent_id: null, id: '2', name: 'Label 2' }
    ]

    traverseTree(
      initialData,
      (node) => {
        const { children, ...rest } = node
        arr.push({ ...rest })
      },
      'child'
    )

    traverseTree(
      initialData2,
      (node) => {
        const { child, ...rest } = node
        arr2.push({ ...rest })
      },
      'child'
    )

    expect(arr).toEqual(result)
    expect(arr2).toEqual(initialList)
  })
})
