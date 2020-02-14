const LINK    = '&';
const EQUAL   = '=';
const INITAL  = '?';

class Url {
  
  getSearch() {
    return window.location.search
  }

  decode(uri) {
    return decodeURI(uri);
  }

  urlId(spliTarget) {
    let pathname = window.location.pathname;
    let proj = pathname.split(spliTarget);
    if(proj.length > 1) {
      let id = proj[1].split('/')[0];
      return parseInt(id);
    }
    return 0;
  }

  query(param = null) {
    if(param !== null && param !== undefined) {
      return this.getQuery(param);
    }
    return this.getQueries();
  }

  getQueries() {
    let _queryParams = {};
    let _params = this.decode(this.getSearch()).split(INITAL)[1];
    _params && _params.split(LINK).map(query => {
      let _query = query.split(EQUAL);
      if(_query && Array.isArray(_query)) {
        if(_queryParams[_query[0]]) {
          _queryParams[_query[0]] = Array.isArray(_queryParams[_query[0]]) ? [..._queryParams[_query[0]]] : [_queryParams[_query[0]]];
          _queryParams[_query[0]].push(_query[1])
        } else {
          _queryParams[_query[0]] = _query[1];
        }
      }
    });

    return _queryParams;
  }

  getQuery(param) {
    let _params = decodeURI(window.location.search).split(param);
    if(_params.length > 2) {
      return _params.filter((_param, i) => i !== 0).map((_param) => _param.split(LINK)[0].split(EQUAL)[1]);
    } else if(_params[1]){
      let _param = _params[1].split(EQUAL)[1];
      return Array.isArray(_param) ? _param[1].split(LINK)[1] : _param;
    }
    return null;
  }

  hasPath(pathName) {
    return window.location.pathname.indexOf(pathName) !== -1
  }
  
}

export default new Url;
