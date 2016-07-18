import { expect } from '@morlay/test-utils';
import sign from '../index';

describe(__filename, () => {
  it('', () => {
    /* eslint max-len: 0 */
    expect(sign({
      ticket: 'sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg',
      nonceStr: 'Wm3WZYTPz0wzccnW',
      timestamp: '1414587457',
      url: 'http://mp.weixin.qq.com?params=value',
    })).to.eql({
      nonceStr: 'Wm3WZYTPz0wzccnW',
      timestamp: '1414587457',
      signature: '0f9de62fce790f9a083d5c99e95740ceb90c27ed',
    });
  });
});
