import stress, {
  stressAdded,
  stressDeleted,
  stressesDeleted,
  stressUpdated,
  selectStress,
} from '../stress';

import { nodeDeleted, nodesDeleted } from '../nodes';
import { elementDeleted, elementsDeleted } from '../elements';

describe('selectStress', () => {
  it('should select stress', () => {
    expect(selectStress({'stress': []})).toEqual([]);
  });
});

describe('stress reducers', () => {
  it('should handle initial state', () => {
    expect(stress([], {})).toEqual([]);
  });

  it('should handle STRESS_ADDED', () => {
    expect(
      stress([], {
        type: stressAdded.type,
        payload: {
          ele: 'ele1',
          vm: 10,
        }
      })
    ).toEqual([
      {
        ele: 'ele1',
        vm: 10,
      }
    ]);
  });

  it('should handle duplicate STRESS_ADDED', () => {
    expect(
      stress([
        {
          ele: 'ele1',
          vm: 10,
        }
      ], {
        type: stressAdded.type,
        payload: {
          ele: 'ele1',
          vm: 10,
        }
      })
    ).toEqual([
      {
        ele: 'ele1',
        vm: 10,
      }
    ]);
  });

  it('should handle STRESS_DELETED', () => {
    expect(
      stress([
        {
          ele: 'ele1',
          vm: 10,
        }
      ], {
        type: stressDeleted.type,
        payload: {
          ele: 'ele1',
          vm: 10,
        }
      })
    ).toEqual([]);
  });

  it('should handle non-existent STRESS_DELETED', () => {
    expect(
      stress([], {
        type: stressDeleted.type,
        payload: {
          ele: 'ele1',
          vm: 10,
        }
      })
    ).toEqual([]);
  });

  it('should handle STRESSES_DELETED', () => {
    expect(
      stress([
        {
          ele: 'ele1',
          vm: 10,
        }, {
          ele: 'ele2',
          vm: 10,
        }
      ], {
        type: stressesDeleted.type,
        payload: [
          {
            ele: 'ele1',
            vm: 10,
          }, {
            ele: 'ele2',
            vm: 10,
          }
        ]
      })
    ).toEqual([]);
  });

  it('should handle STRESS_UPDATED', () => {
    expect(
      stress([
        {
          ele: 'ele1',
          vm: 10,
        }
      ], {
        type: stressUpdated.type,
        payload: {
          'old': {
            ele: 'ele1',
            vm: 10,
          }, 'new': {
            ele: 'ele1',
            vm: 20,
          }
        }
      })
    ).toEqual([
      {
        ele: 'ele1',
        vm: 20,
      }
    ]);
  });

  it('should handle ELEMENT_DELETED', () => {
    expect(
      stress([
        {
          ele: 'ele1',
          vm: 10,
        }, {
          ele: 'ele2',
          vm: 10,
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
        vm: 10,
      }
    ]);
  });

  it('should handle ELEMENTS_DELETED', () => {
    expect(
      stress([
        {
          ele: 'ele1',
          vm: 10,
        }, {
          ele: 'ele2',
          vm: 10,
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
      stress([
        {
          ele: 'ele1',
          vm: 10,
        }, {
          ele: 'ele2',
          vm: 10,
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
      stress([
        {
          ele: 'ele1',
          vm: 10,
        }, {
          ele: 'ele2',
          vm: 10,
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
