function renderMarkdown(elementId, url) {
    fetch(url).then(function(resp) { resp.text().then(function(text) {
      var div = document.createElement('div');
      var converter = new showdown.Converter();
      div.innerHTML = converter.makeHtml(text);
      //https://stackoverflow.com/a/15081441/813599
      var node = document.getElementById(elementId)
      node.parentNode.insertBefore(div, node.nextSibling);
    })});
  }