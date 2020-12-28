import material, {
  materialAdded,
  materialDeleted,
  materialsDeleted,
  materialUpdated,
  selectMaterial,
} from '../material';

import { nodeDeleted, nodesDeleted } from '../nodes';
import { elementDeleted, elementsDeleted } from '../elements';

describe('selectMaterial', () => {
  it('should select material', () => {
    expect(selectMaterial({'material': []})).toEqual([]);
  });
});

describe('material reducers', () => {
  it('should handle initial state', () => {
    expect(material([], {})).toEqual([]);
  });

  it('should handle MATERIAL_ADDED', () => {
    expect(
      material([], {
        type: materialAdded.type,
        payload: {
          ele: 'ele1',
          E: 10,
          A: 10,
        }
      })
    ).toEqual([
      {
        ele: 'ele1',
        E: 10,
        A: 10,
      }
    ]);
  });

  it('should handle duplicate MATERIAL_ADDED', () => {
    expect(
      material([
        {
          ele: 'ele1',
          E: 10,
          A: 10,
        }
      ], {
        type: materialAdded.type,
        payload: {
          ele: 'ele1',
          E: 10,
          A: 10,
        }
      })
    ).toEqual([
      {
        ele: 'ele1',
        E: 10,
        A: 10,
      }
    ]);
  });

  it('should handle MATERIAL_DELETED', () => {
    expect(
      material([
        {
          ele: 'ele1',
          E: 10,
          A: 10,
        }
      ], {
        type: materialDeleted.type,
        payload: {
          ele: 'ele1',
          E: 10,
          A: 10,
        }
      })
    ).toEqual([]);
  });

  it('should handle non-existent MATERIAL_DELETED', () => {
    expect(
      material([], {
        type: materialDeleted.type,
        payload: {
          ele: 'ele1',
          E: 10,
          A: 10,
        }
      })
    ).toEqual([]);
  });

  it('should handle MATERIALS_DELETED', () => {
    expect(
      material([
        {
          ele: 'ele1',
          E: 10,
          A: 10,
        }, {
          ele: 'ele2',
          E: 10,
          A: 10,
        }
      ], {
        type: materialsDeleted.type,
        payload: [
          {
            ele: 'ele1',
            E: 10,
            A: 10,
          }, {
            ele: 'ele2',
            E: 10,
            A: 10,
          }
        ]
      })
    ).toEqual([]);
  });

  it('should handle MATERIAL_UPDATED', () => {
    expect(
      material([
        {
          ele: 'ele1',
          E: 10,
          A: 10,
        }
      ], {
        type: materialUpdated.type,
        payload: {
          'old': {
            ele: 'ele1',
            E: 10,
            A: 10,
          }, 'new': {
            ele: 'ele1',
            E: 11,
            A: 11,
          }
        }
      })
    ).toEqual([
      {
        ele: 'ele1',
        E: 11,
        A: 11,
      }
    ]);
  });

  it('should handle ELEMENT_DELETED', () => {
    expect(
      material([
        {
          ele: 'ele1',
          E: 10,
          A: 10,
        }, {
          ele: 'ele2',
          E: 10,
          A: 10,
        }
      ], {
        type: elementDeleted.type,
        payload: {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }
      })
    ).toEqual([
      {
        ele: 'ele2',
        E: 10,
        A: 10,
      }
    ]);
  });

  it('should handle ELEMENTS_DELETED', () => {
    expect(
      material([
        {
          ele: 'ele1',
          E: 10,
          A: 10,
        }, {
          ele: 'ele2',
          E: 10,
          A: 10,
        }
      ], {
        type: elementsDeleted.type,
        payload: [
          {
            id: 'ele1',
            i: 'node1',
            j: 'node2',
          }, {
            id: 'ele2',
            i: 'node1',
            j: 'node2',
          }
        ]
      })
    ).toEqual([]);
  });

  it('should handle NODE_DELETED', () => {
    expect(
      material([
        {
          ele: 'ele1',
          E: 10,
          A: 10,
        }, {
          ele: 'ele2',
          E: 10,
          A: 10,
        }
      ], {
        type: nodeDeleted.type,
        payload: {
          id: 'node2',
          x: 0,
          y: 0,
          z: 0,
          eles: [
            {
              id: 'ele1',
              i: 'node1',
              j: 'node2',
            }, {
              id: 'ele2',
              i: 'node2',
              j: 'node3',
            }
          ],
        }
      })
    ).toEqual([]);
  });

  it('should handle NODES_DELETED', () => {
    expect(
      material([
        {
          ele: 'ele1',
          E: 10,
          A: 10,
        }, {
          ele: 'ele2',
          E: 10,
          A: 10,
        }
      ], {
        type: nodesDeleted.type,
        payload: [
          {
            id: 'node1',
            x: 0,
            y: 0,
            z: 0,
            eles: [
              {
                id: 'ele1',
                i: 'node1',
                j: 'node4',
              },
            ],
          }, {
            id: 'node2',
            x: 0,
            y: 0,
            z: 0,
          eles: [
            {
              id: 'ele2',
              i: 'node2',
              j: 'node3',
            }
          ],
          }
        ]
      })
    ).toEqual([]);
  });

});
