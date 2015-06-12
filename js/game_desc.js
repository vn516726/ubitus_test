var query = queryString();
console.log(query)
document.getElementById("name").innerHTML = query.name;
document.getElementById("desc").innerHTML = query.desc;

//reference : http://stackoverflow.com/a/2880929
function queryString() {
  var match,
    pl     = /\+/g,  // Regex for replacing addition symbol with a space
    search = /([^&=]+)=?([^&]*)/g,
    decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
    query  = window.location.search.substring(1);

  urlParams = {};
  while (match = search.exec(query))
     urlParams[decode(match[1])] = decode(match[2]);
  return urlParams;
}