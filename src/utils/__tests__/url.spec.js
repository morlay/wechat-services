import { expect } from '@morlay/test-utils';

import { queryPatch } from '../url';

describe(__filename, () => {
  describe('#queryPatch', () => {
    it('should get url string with query', () => {
      expect(
        queryPatch('http://local/', { a: 1 })
      )
        .to.eql('http://local/?a=1');

      expect(
        queryPatch('http://local/?b=1', { a: 1 })
      )
        .to.eql('http://local/?b=1&a=1');
    });
  });
});
