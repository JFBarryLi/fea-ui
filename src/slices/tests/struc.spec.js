import struc, {
  selectStruc,
  selectStrucError,
  selectStrucLoading,
} from '../struc';

describe('selectStruc', () => {
  it('should select the entire struc', () => {
    expect(selectStruc(
      {
        'material': [],
        'nodes': [],
        'elements': [],
        'loads': [],
        'boundaries': [],
        'stress': [],
      }
    )).toEqual(
      {
        'matProp': [],
        'nodalCoords': [],
        'connectivity': [],
        'forceVector': [],
        'boundaryConditions': [],
        'stresses': [],
      }
    );
  });
});

describe('selectStrucError', () => {
  it('should select struc error', () => {
    expect(selectStrucError(
      {
        struc: {
          error: {}
        }
      }
    )).toEqual({});
  });
});

describe('selectStrucLoading', () => {
  it('should select struc loading', () => {
    expect(selectStrucLoading(
      {
        struc: {
          loading: 'idle'
        }
      }
    )).toEqual('idle');
  });
});

describe('struc reducers', () => {
  it('should handle initial state', () => {
    expect(struc([], {})).toEqual([]);
  });
});
