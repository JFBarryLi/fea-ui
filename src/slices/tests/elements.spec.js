import elements, {
  elementAdded,
  elementDeleted,
  elementsDeleted,
  elementUpdated,
  selectElements,
} from '../elements';

import { nodeDeleted, nodesDeleted } from '../nodes';

describe('selectElements', () => {
  it('should select elements', () => {
    expect(selectElements({'elements': []})).toEqual([]);
  });
});

describe('element reducers', () => {
  it('should handle initial state', () => {
    expect(elements([], {})).toEqual([]);
  });

  it('should handle ELEMENT_ADDED', () => {
    expect(
      elements([], {
        type: elementAdded.type,
        payload: {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }
      })
    ).toEqual([
      {
        id: 'ele1',
        i: 'node1',
        j: 'node2',
      }
    ]);
  });

  it('should handle duplicate ELEMENT_ADDED', () => {
    expect(
      elements([
        {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }
      ], {
        type: elementAdded.type,
        payload: {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }
      })
    ).toEqual([
      {
        id: 'ele1',
        i: 'node1',
        j: 'node2',
      }
    ]);
  });

  it('should handle ELEMENT_DELETED', () => {
    expect(
      elements([
        {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }
      ], {
        type: elementDeleted.type,
        payload: {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }
      })
    ).toEqual([]);
  });

  it('should handle non-existent ELEMENT_DELETED', () => {
    expect(
      elements([], {
        type: elementDeleted.type,
        payload: {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }
      })
    ).toEqual([]);
  });

  it('should handle ELEMENTS_DELETED', () => {
    expect(
      elements([
        {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }, {
          id: 'ele2',
          i: 'node2',
          j: 'node3',
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
            i: 'node2',
            j: 'node3',
          }
        ]
      })
    ).toEqual([]);
  });

  it('should handle ELEMENT_UPDATED', () => {
    expect(
      elements([
        {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }
      ], {
        type: elementUpdated.type,
        payload: {
          'old': {
            id: 'ele1',
            i: 'node1',
            j: 'node2',
          }, 'new': {
            id: 'ele1',
            i: 'node2',
            j: 'node3',
          }
        }
      })
    ).toEqual([
      {
        id: 'ele1',
        i: 'node2',
        j: 'node3',
      }
    ]);
  });

  it('should handle NODE_DELETED', () => {
    expect(
      elements([
        {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }, {
          id: 'ele2',
          i: 'node2',
          j: 'node3',
        }
      ], {
        type: nodeDeleted.type,
        payload: {
          id: 'node2',
          x: 0,
          y: 0,
          z: 0,
        }
      })
    ).toEqual([]);
  });

  it('should handle NODES_DELETED', () => {
    expect(
      elements([
        {
          id: 'ele1',
          i: 'node1',
          j: 'node2',
        }, {
          id: 'ele2',
          i: 'node2',
          j: 'node3',
        }
      ], {
        type: nodesDeleted.type,
        payload: [
          {
            id: 'node1',
            x: 0,
            y: 0,
            z: 0,
          }, {
            id: 'node2',
            x: 0,
            y: 0,
            z: 0,
          }
        ]
      })
    ).toEqual([]);
  });

});
