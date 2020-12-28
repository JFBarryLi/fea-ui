import loads, {
  loadAdded,
  loadDeleted,
  loadsDeleted,
  loadUpdated,
  selectLoads,
} from '../loads';

import { nodeDeleted, nodesDeleted } from '../nodes';

describe('selectLoads', () => {
  it('should select loads', () => {
    expect(selectLoads({'loads': []})).toEqual([]);
  });
});

describe('load reducers', () => {
  it('should handle initial state', () => {
    expect(loads([], {})).toEqual([]);
  });

  it('should handle LOAD_ADDED', () => {
    expect(
      loads([], {
        type: loadAdded.type,
        payload: {
          node: 'node1',
          u1: 0,
          u2: 0,
          u3: 0,
        }
      })
    ).toEqual([
      {
        node: 'node1',
        u1: 0,
        u2: 0,
        u3: 0,
      }
    ]);
  });

  it('should handle duplicate LOAD_ADDED', () => {
    expect(
      loads([
        {
          node: 'node1',
          u1: 0,
          u2: 0,
          u3: 0,
        }
      ], {
        type: loadAdded.type,
        payload: {
          node: 'node1',
          u1: 0,
          u2: 0,
          u3: 0,
        }
      })
    ).toEqual([
      {
        node: 'node1',
        u1: 0,
        u2: 0,
        u3: 0,
      }
    ]);
  });

  it('should handle LOAD_DELETED', () => {
    expect(
      loads([
        {
          node: 'node1',
          u1: 0,
          u2: 0,
          u3: 0,
        }
      ], {
        type: loadDeleted.type,
        payload: {
          node: 'node1',
          u1: 0,
          u2: 0,
          u3: 0,
        }
      })
    ).toEqual([]);
  });

  it('should handle non-existent LOAD_DELETED', () => {
    expect(
      loads([], {
        type: loadDeleted.type,
        payload: {
          node: 'node1',
          u1: 0,
          u2: 0,
          u3: 0,
        }
      })
    ).toEqual([]);
  });

  it('should handle LOADS_DELETED', () => {
    expect(
      loads([
        {
          node: 'node1',
          u1: 0,
          u2: 0,
          u3: 0,
        }, {
          node: 'node2',
          u1: 0,
          u2: 0,
          u3: 0,
        }
      ], {
        type: loadsDeleted.type,
        payload: [
          {
            node: 'node1',
            u1: 0,
            u2: 0,
            u3: 0,
          }, {
            node: 'node2',
            u1: 0,
            u2: 0,
            u3: 0,
          }
        ]
      })
    ).toEqual([]);
  });

  it('should handle LOAD_UPDATED', () => {
    expect(
      loads([
        {
          node: 'node1',
          u1: 0,
          u2: 0,
          u3: 0,
        }
      ], {
        type: loadUpdated.type,
        payload: {
          'old': {
            node: 'node1',
            u1: 0,
            u2: 0,
            u3: 0,
          }, 'new': {
            node: 'node1',
            u1: 0,
            u2: 100,
            u3: 0,
          }
        }
      })
    ).toEqual([
      {
        node: 'node1',
        u1: 0,
        u2: 100,
        u3: 0,
      }
    ]);
  });

  it('should handle NODE_DELETED', () => {
    expect(
      loads([
        {
          node: 'node1',
          u1: 0,
          u2: 0,
          u3: 0,
        }, {
          node: 'node2',
          u1: 0,
          u2: 0,
          u3: 0,
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
    ).toEqual([
      {
        node: 'node1',
        u1: 0,
        u2: 0,
        u3: 0,
      }
    ]);
  });

  it('should handle NODES_DELETED', () => {
    expect(
      loads([
        {
          node: 'node1',
          u1: 0,
          u2: 0,
          u3: 0,
        }, {
          node: 'node2',
          u1: 0,
          u2: 0,
          u3: 0,
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
