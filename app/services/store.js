import Store from 'ember-data/store';
import Ember from 'ember';

const FilteredQueryKeys = ['limit', 'page'];

function inspect(v) {
  if (v instanceof Array) {
    if (!v.length) {
      return '[]';
    }

    return '[\'' + v.map(function(v) { return v.id; }).join('\', \'') + '\']';
  }
  return v && v.toString ? v.toString() : String(v);
}

function makeQueryKey(query) {
  let keys = Object.keys(query).sort();
  let finalQuery = [];

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (FilteredQueryKeys.contains(key)) {
      continue;
    }

    finalQuery.push(`${key}=${inspect(query[key])}`);
  }

  return finalQuery.join('&');
}

function makePageKey(query) {
  let limit = query.limit || 0;
  let page = query.page || 0;

  return `limit=${limit}&page=${page}`;
}

class QueryObject {
  constructor(cache, pointer) {
    this._cache = cache;
    this._pointer = pointer;
    this._meta = {};
  }

  goto() {

  }

  current() {
    return this._pages[this._pointer];
  }

  next() {

    return this._pages[this._pointer];
  }

  prev() {

  }

}

class QueryObjectCache {
  constructor(modelName, key, query, store) {
    this._key = key;
    this._modelName = modelName;
    this._query = query;
    this._store = store;
    this._pages = {};
    this._meta = {};
    this._pointer = 0;
    this._limit = 0;
  }

  has(pageKey) {
    return !!this._pages[pageKey];
  }

  fetch(query) {
    let keyForPage = makePageKey(query);

    if (this.has(keyForPage)) {
      return Promise.resolve();
    } else {
      return this._store.query(this.modelName, this._query);
    }
  }

  updateMeta(meta) {}

  add(key, page) {
    this._pages[key] = page;
  }
}

export default Store.extend({
  _queries: null,
  pageQuery(modelName, query) {
    let queries;
    let queryObjectCache;
    let keyForQuery = makeQueryKey(query);
    let keyForPage = makePageKey(query);

    this._queries = this._queries || {};
    queries = this._queries[modelName] = this._queries[modelName] || {};
    queryObjectCache = queries[keyForQuery] = queries[keyForQuery] || new QueryObjectCache(modelName, keyForQuery, query, this);

    return queryObjectCache.fetch(query)
      .then(() => {
        let ret = queryObjectCache.checkout();
        ret.setCurrent(keyForPage);

        return ret;
      });
  }
});
