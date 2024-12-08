import { TestBed } from '@angular/core/testing';

import { GetClipResolver } from './get-clip.resolver';

describe('getClipResolver', () => {
    let resolver: GetClipResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        resolver = TestBed.inject(GetClipResolver);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });
});
