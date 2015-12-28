// React をロード
var React = require('react');
var ReactDOM = require('react-dom');
// 外部ファイルへ分割した Message クラスをロード

// このアプリケーションのメインとなる App クラス
ReactDOM.render(
  React.createElement('h1', null, 'Hello, world!'),
  document.getElementById('content')
);
