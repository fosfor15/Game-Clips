import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getClipResolver } from './get-clip.resolver';

describe('getClipResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => getClipResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
