import boundaries, {
  boundaryAdded,
  boundaryDeleted,
  boundariesDeleted,
  boundaryUpdated,
  selectBoundaries,
} from '../boundaries';

import { nodeDeleted, nodesDeleted } from '../nodes';

describe('selectElements', () => {
  it('should select boundaries', () => {
    expect(selectBoundaries({'boundaries': []})).toEqual([]);
  });
});

describe('boundary reducers', () => {
  it('should handle initial state', () => {
    expect(boundaries([], {})).toEqual([]);
  });

  it('should handle BOUNDARY_ADDED', () => {
    expect(
      boundaries([], {
        type: boundaryAdded.type,
        payload: {
          node: 'node1',
          u1: true,
          u2: true,
          u3: true,
        }
      })
    ).toEqual([
      {
        node: 'node1',
        u1: true,
        u2: true,
        u3: true,
      }
    ]);
  });

  it('should handle duplicate BOUNDARY_ADDED', () => {
    expect(
      boundaries([
        {
          node: 'node1',
          u1: true,
          u2: true,
          u3: true,
        }
      ], {
        type: boundaryAdded.type,
        payload: {
          node: 'node1',
          u1: true,
          u2: true,
          u3: true,
        }
      })
    ).toEqual([
      {
        node: 'node1',
        u1: true,
        u2: true,
        u3: true,
      }
    ]);
  });

  it('should handle BOUNDARY_DELETED', () => {
    expect(
      boundaries([
        {
          node: 'node1',
          u1: true,
          u2: true,
          u3: true,
        }
      ], {
        type: boundaryDeleted.type,
        payload: {
          node: 'node1',
          u1: true,
          u2: true,
          u3: true,
        }
      })
    ).toEqual([]);
  });

  it('should handle non-existent BOUNDARY_DELETED', () => {
    expect(
      boundaries([], {
        type: boundaryDeleted.type,
        payload: {
          node: 'node1',
          u1: true,
          u2: true,
          u3: true,
        }
      })
    ).toEqual([]);
  });

  it('should handle BOUNDARIES_DELETED', () => {
    expect(
      boundaries([
        {
          node: 'node1',
          u1: true,
          u2: true,
          u3: true,
        }, {
          node: 'node2',
          u1: true,
          u2: true,
          u3: true,
        }
      ], {
        type: boundariesDeleted.type,
        payload: [
          {
            node: 'node1',
            u1: true,
            u2: true,
            u3: true,
          }, {
            node: 'node2',
            u1: true,
            u2: true,
            u3: true,
          }
        ]
      })
    ).toEqual([]);
  });

  it('should handle BOUNDARY_UPDATED', () => {
    expect(
      boundaries([
        {
          node: 'node1',
          u1: true,
          u2: true,
          u3: true,
        }
      ], {
        type: boundaryUpdated.type,
        payload: {
          'old': {
            node: 'node1',
            u1: true,
            u2: true,
            u3: true,
          }, 'new': {
            node: 'node1',
            u1: true,
            u2: false,
            u3: true,
          }
        }
      })
    ).toEqual([
      {
        node: 'node1',
        u1: true,
        u2: false,
        u3: true,
      }
    ]);
  });

  it('should handle NODE_DELETED', () => {
    expect(
      boundaries([
        {
          node: 'node1',
          u1: true,
          u2: true,
          u3: true,
        }, {
          node: 'node2',
          u1: true,
          u2: true,
          u3: true,
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
        u1: true,
        u2: true,
        u3: true,
      }
    ]);
  });

  it('should handle NODES_DELETED', () => {
    expect(
      boundaries([
        {
          node: 'node1',
          u1: true,
          u2: true,
          u3: true,
        }, {
          node: 'node2',
          u1: true,
          u2: true,
          u3: true,
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
