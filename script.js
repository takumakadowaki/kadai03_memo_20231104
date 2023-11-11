// デイトレードのメモを追加する関数
function addTradeMemo() {
  var dateInput = document.getElementById('dateInput').value;
  var stockInput = document.getElementById('stockNameInput').value;  // 修正されたID
  var purchasePriceInput = document.getElementById('purchasePriceInput').value;
  var salePriceInput = document.getElementById('salePriceInput').value;
  var memoInput = document.getElementById('memoInput').value;

  if (dateInput && stockInput && purchasePriceInput && salePriceInput) {
    var tradeMemo = {
      date: dateInput,
      stock: stockInput,
      purchasePrice: purchasePriceInput,
      salePrice: salePriceInput,
      memo: memoInput
    };
    saveTradeMemoToStorage(tradeMemo);
    displayTradeMemos();
  }
}

// デイトレードのメモをローカルストレージに保存する関数
function saveTradeMemoToStorage(tradeMemo) {
  var tradeMemos = getTradeMemosFromStorage();
  tradeMemos.push(tradeMemo);
  localStorage.setItem('tradeMemos', JSON.stringify(tradeMemos));
}

// ローカルストレージからデイトレードのメモを取得する関数
function getTradeMemosFromStorage() {
  var tradeMemos = localStorage.getItem('tradeMemos');
  if (tradeMemos) {
    return JSON.parse(tradeMemos);
  } else {
    return [];
  }
}

// デイトレードのメモを削除する関数
function deleteTradeMemo(index) {
  var tradeMemos = getTradeMemosFromStorage();
  tradeMemos.splice(index, 1);
  localStorage.setItem('tradeMemos', JSON.stringify(tradeMemos));
  displayTradeMemos();
}

// デイトレードのメモを表示する関数
function displayTradeMemos() {
  var tradeMemos = getTradeMemosFromStorage();
  var tradeMemoList = document.getElementById('tradeMemoList');
  tradeMemoList.innerHTML = '';
  tradeMemos.forEach((tradeMemo, index) => {
    var li = document.createElement('li');
    li.textContent = `${tradeMemo.date} - ${tradeMemo.stock} - Purchase: ${tradeMemo.purchasePrice} - Sale: ${tradeMemo.salePrice} - Memo: ${tradeMemo.memo}`;

    var deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
      deleteTradeMemo(index);
    };

    li.appendChild(deleteBtn);
    tradeMemoList.appendChild(li);
  });
}

// ページ読み込み時にデイトレードのメモを表示
window.onload = function() {
  displayTradeMemos();
};

// 証券番号と銘柄名のマッピング
var stockMapping = {
  '7203': 'トヨタ',
  '6758': 'ソニー',
  '9984': 'ソフトバンク'
};

// 証券番号入力フィールドにイベントリスナーを設定
document.getElementById('stockNumberInput').addEventListener('input', function() {
  var stockNumber = this.value;
  var stockName = stockMapping[stockNumber];
  document.getElementById('stockNameInput').value = stockName ? stockName : ''; // 修正されたID
});

// 追加ボタンにクリックイベントリスナーを設定
document.getElementById('addBtn').addEventListener('click', addTradeMemo);