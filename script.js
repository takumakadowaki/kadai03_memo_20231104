function addMemo() {
    var input = document.getElementById('memoInput'); // メモ入力フィールドの要素を取得
    var memo = input.value; // 入力された値を取得
    if (memo) { // テキストが空でなければ
      var li = document.createElement('li'); // 新しいリスト項目を作成
      li.textContent = memo; // リスト項目のテキストにメモをセット
  
      var deleteBtn = document.createElement('button'); // 削除ボタンを作成
      deleteBtn.textContent = 'Delete'; // ボタンのテキストをセット
      deleteBtn.onclick = function() { // ボタンをクリックした時の動作を定義
        li.remove(); // リスト項目を削除
      };
  
      li.appendChild(deleteBtn); // リスト項目に削除ボタンを追加
      document.getElementById('memoList').appendChild(li); // メモリストにリスト項目を追加
  
      input.value = ''; // 入力フィールドを空にする
    }
  }
  
  document.getElementById('addBtn').addEventListener('click', addMemo); // 'Add'ボタンにクリックイベントリスナーを追加
  
  // メモ入力フィールドでEnterキーが押された時にメモを追加するイベントリスナー
  document.getElementById('memoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addMemo();
    }
  });

