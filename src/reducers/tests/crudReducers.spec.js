import {
  createItemAdded,
  createItemsAdded,
  createItemDeleted,
  createItemsDeleted,
  createCascadeItemDeleted,
  createCascadeItemsDeleted,
  createItemUpdated,
  createItemsUpdated,
} from '../crudReducers';

describe('create item added reducer', () => {
  it('should create an item added reducer', () => {
    expect(typeof
      createItemAdded(
        'id',
        {
          'id': 'id',
          'x': 'x',
          'y': 'y',
          'z': 'z'
        }
      )
    ).toBe('function');
  });
});

describe('create items added reducer', () => {
  it('should create an items added reducer', () => {
    expect(typeof
      createItemsAdded(
        'id',
        {
          'id': 'id',
          'x': 'x',
          'y': 'y',
          'z': 'z'
        }
      )
    ).toBe('function');
  });
});

describe('create item deleted reducer', () => {
  it('should create an item deleted reducer', () => {
    expect(typeof createItemDeleted('id')).toBe('function');
  });
});

describe('create items deleted reducer', () => {
  it('should create an items deleted reducer', () => {
    expect(typeof createItemsDeleted('id')).toBe('function');
  });
});

describe('create cascade item deleted reducer', () => {
  it('should create an cascade item deleted reducer', () => {
    expect(typeof createCascadeItemDeleted('id')).toBe('function');
  });
});

describe('create cascade items deleted reducer', () => {
  it('should create an cascade items deleted reducer', () => {
    expect(typeof createCascadeItemsDeleted('id')).toBe('function');
  });
});

describe('create item updated reducer', () => {
  it('should create an item updated reducer', () => {
    expect(typeof createItemUpdated('id')).toBe('function');
  });
});

describe('create items updated reducer', () => {
  it('should create an items updated reducer', () => {
    expect(typeof createItemsUpdated('id')).toBe('function');
  });
});
