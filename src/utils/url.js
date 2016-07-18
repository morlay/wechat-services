import qs from 'qs';
import url from 'url';

export const urlResolve = url.resolve;

export const queryPatch = (urlString, query = {}) => {
  const urlObject = url.parse(urlString);
  const oldQuery = qs.parse(urlObject.query || '');

  return url.format({
    ...urlObject,
    search: undefined,
    query: {
      ...oldQuery,
      ...query,
    },
  });
};
