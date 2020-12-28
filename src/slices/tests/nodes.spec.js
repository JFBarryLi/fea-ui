import nodes, {
  nodeAdded,
  nodeDeleted,
  nodesDeleted,
  nodeUpdated,
  nodesUpdated,
  selectNodes,
} from '../nodes';

describe('selectNodes', () => {
  it('should select nodes', () => {
    expect(selectNodes({'nodes': []})).toEqual([]);
  });
});


describe('node reducers', () => {
  it('should handle initial state', () => {
    expect(nodes([], {})).toEqual([]);
  });

  it('should handle NODE_ADDED', () => {
    expect(
      nodes([], {
        type: nodeAdded.type,
        payload: {
          id: 'node1',
          x: 0,
          y: 0,
          z: 0,
        }
      })
    ).toEqual([
      {
        id: 'node1',
        x: 0,
        y: 0,
        z: 0,
      }
    ]);
  });

  it('should handle duplicate NODE_ADDED', () => {
    expect(
      nodes([
        {
          id: 'node1',
          x: 0,
          y: 0,
          z: 0,
        }
      ], {
        type: nodeAdded.type,
        payload: {
          id: 'node1',
          x: 0,
          y: 0,
          z: 0,
        }
      })
    ).toEqual([
      {
        id: 'node1',
        x: 0,
        y: 0,
        z: 0,
      }
    ]);
  });

  it('should handle NODE_DELETED', () => {
    expect(
      nodes([
        {
          id: 'node1',
          x: 0,
          y: 0,
          z: 0,
        }
      ], {
        type: nodeDeleted.type,
        payload: {
          id: 'node1',
          x: 0,
          y: 0,
          z: 0,
        }
      })
    ).toEqual([]);
  });

  it('should handle non-existent NODE_DELETED', () => {
    expect(
      nodes([], {
        type: nodeDeleted.type,
        payload: {
          id: 'node1',
          x: 0,
          y: 0,
          z: 0,
        }
      })
    ).toEqual([]);
  });

  it('should handle NODES_DELETED', () => {
    expect(
      nodes([
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

  it('should handle NODE_UPDATED', () => {
    expect(
      nodes([
        {
          id: 'node1',
          x: 0,
          y: 0,
          z: 0,
        }
      ], {
        type: nodeUpdated.type,
        payload: {
          'old': {
            id: 'node1',
            x: 0,
            y: 0,
            z: 0,
          }, 'new': {
            id: 'node1',
            x: 1,
            y: 1,
            z: 1,
          }
        }
      })
    ).toEqual([
      {
        id: 'node1',
        x: 1,
        y: 1,
        z: 1,
      }
    ]);
  });

  it('should handle NODES_UPDATED', () => {
    expect(
      nodes([
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
      ], {
        type: nodesUpdated.type,
        payload: [
          {
            id: 'node1',
            x: 1,
            y: 1,
            z: 1,
          }, {
            id: 'node2',
            x: 1,
            y: 1,
            z: 1,
          }
        ]
      })
    ).toEqual([
      {
        id: 'node1',
        x: 1,
        y: 1,
        z: 1,
      }, {
        id: 'node2',
        x: 1,
        y: 1,
        z: 1,
      }
    ]);
  });

});
