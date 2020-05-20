---
# 需要 Liquid 预处理
---
// 全局搜索脚本
var searchData;
var input = document.querySelector('#search-input');
var result = document.querySelector('#results-container');
var xhrSearch = new XMLHttpRequest();
xhrSearch.open('GET', '{{ site.baseurl }}/search.json', true);
xhrSearch.onreadystatechange = function() {
    if (xhrSearch.readyState == 4 && xhrSearch.status == 200) {
        searchData = JSON.parse(xhrSearch.responseText);
        input.placeholder = "请输入关键词，回车搜索";
    }
};
xhrSearch.send(null);

document.querySelector('#search-input').addEventListener('keyup', function(e) {
  if(e.keyCode == 13){
    if(this.value.trim() != '') {  // 删除头尾空格
      search(this.value);
    }
  }
});

function search(keyword) {
  var sum = 10;   // 限制最多显示 10 条结果
  var html = '';  // 显示部分
  var postContent = '';
  for(var i = 0; i < searchData.length; i ++) {
    postContent = searchData[i].title + searchData[i].content;
    if(postContent.toLowerCase().indexOf(keyword.toLowerCase()) > -1) { // 是否包含关键字
      html += '<li><a href="' + searchData[i].url + '">' + searchData[i].title + '</a></li>';
      sum --;
      if (sum === 0) break;
    }
  }
  if(html === '') {
    html += '<li>无相关结果，<a href="{{ site.baseurl }}/archives.html">去归档找找？</a></li>';
  }
  result.innerHTML = html;
};