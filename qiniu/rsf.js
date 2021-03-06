var rpc = require('./rpc');
var conf = require('./conf');
var util = require('./util');

exports.listPrefix = function(bucket, prefix, marker, limit, delimiter, onret) {
  var uri = getPrefixUri(bucket, prefix, marker, limit, delimiter);
  var digest = util.generateAccessToken(uri, null);

  rpc.postWithoutForm(uri, digest, onret)
}

function getPrefixUri(bucket, prefix, marker, limit, delimiter) {
  var uri = conf.RSF_HOST + '/' + 'list?' + 'bucket=' + bucket;
  if (marker) {
    uri += '&' + 'marker=' + marker;
  }

  if (limit) {
    uri += '&' + 'limit=' + limit;
  }

  if (prefix) {
    uri += '&' + 'prefix=' + prefix;
  }

  if(delimiter){
    uri += '&' + 'delimiter=' + delimiter;
  }

  return uri;
}

function ListItem(key, hash, fsize, putTime, mimeType, endUser) {
  this.key = key || null;
  this.hash = hash || null;
  this.fsize = fsize || null;
  this.putTime = putTime || null;
  this.mimeType = mimeType || null;
  this.endUser = endUser || null;
}
