//version
let manifestData = chrome.runtime.getManifest();
let ex_version = manifestData.version + "";
console.log("ニコニ広告ex.: v" + ex_version);

async function sleep(msec) {
    return new Promise(resolve => { setTimeout(() => { resolve() }, msec) })
}
function isDefaultButtonExist() {
    const btnDefault = document.querySelector('[aria-label="ニコニ広告"], [data-title="ニコニ広告する"]')
    return btnDefault != null
}


let nicoID = "";

//ID取得
window.onload = function getID() {
  nicoID = location.pathname.slice(7, 18);
  livescript();
};


//ニコ生
function livescript() {

  //エラー表示
  function error_notAD() {
      $('.___snack-bar___2IY7h, .___snack-bar___CBmFK').attr('aria-hidden', 'false');
      $('.___message___SWZm4').html("ニコニ広告ex.: ニコニ広告ボタンを取得できませんでした。")
      error_closebut();
      setTimeout(() => {
          document.getElementById('error-closebut').click();
      },
          5000)
  }
  function error_closebut() {
      $('.___close-button___3P_fY').attr('id', 'error-closebut');
      $("#error-closebut").on('click', function () {
          $('.___snack-bar___2IY7h, .___snack-bar___CBmFK').attr('aria-hidden', 'true');
      });
  }

  //メイン処理
  function live_main() {
      //ボタン削除
      var order = $('[aria-label="ニコニ広告"]').data('target-order');
      $('[aria-label="ニコニ広告"]').attr('id', 'nicoadButton');
      $('#nicoadButton').remove();

      //ボタン作成
      $("<button>", {
          type: 'button',
          id: 'nicoadButton',
          class: '___item___3oCqa'
      }).appendTo('.___official-locked-item-area___2vRe6');
      $('#nicoadButton').attr('aria-label', 'ニコニ広告EX.');
      $('#nicoadButton').attr('data-content-type', 'nicoadex');
      $('#nicoadButton').attr('data-target-order', order);
      $("#nicoadButton").html('<svg viewBox="-30 -30 160 160" id="nicoadSVG" class="___item-image___1P0Xx" style="fill:#FF7F27 !important;"><path d="M94.3 68.4a5.7 5.7 0 0 0 2.6-1.4c3.2-3.2 1.8-10.3-3-18.9l-5.7 1c2 4.5 2.6 8 1 9.6-3.8 3.8-17.6-3.9-30.8-17s-21-27-17.1-30.9c1.6-1.6 5-1 9.5 1L52 6C43.3 1.3 36.2 0 33 3.1a5.7 5.7 0 0 0-1.4 2.6L13.9 71.6 1.6 74.9a2.1 2.1 0 0 0-1 .5c-2.2 2.2 1.4 9.4 8 16s13.8 10.2 16 8a2.1 2.1 0 0 0 .5-1L28.4 86l65.9-17.7z"></path><rect x="60.1" y="20.7" width="31.6" height="6.8" rx="3.1" ry="3.1" transform="rotate(-45 76 24)"></rect><rect x="47.4" y="10.4" width="28.2" height="6.8" rx="3.1" ry="3.1" transform="rotate(-75 61.5 13.8)"></rect><rect x="72.1" y="35.1" width="28.2" height="6.8" rx="3.1" ry="3.1" transform="rotate(-15 86.2 38.5)"></rect></svg>')

      //いろいろid付与
      $(".___close-button___2Ohn5").attr('id', 'iframe-close-but');
      $(".___setting-button___2wSU6").attr('id', 'setting-but');
      $(".___fullscreen-button___3nW46").attr('id', 'fullscreen-but');

      //ボタンクリック時
      $("#nicoadButton").on('click', function () {
          exit_nicoadex();

          //詳細設定画面 消す（バグ防止）
          $(".___close-button___2x2lj").attr('id', 'settingclose-but');
          if (document.getElementById('settingclose-but')) {
              document.getElementById("settingclose-but").click();
          }

          //ニコニ広告exヘッダ消す
          $('#nicoadex_iframePanel_header').remove();
          $('.___rich-view-status___3pi29').attr('id', 'iframePanel');
          $('.___rich-view-status___3pi29').removeAttr('hidden');
          $('.___rich-view-status___3pi29').attr('aria-expanded', 'true');

          //ステータスパネル＆コメント欄のhidden追加
          $('.___player-status-panel___jaSDM').attr('aria-hidden', 'true');

          $('.___rich-view-header___IaMZQ').prepend('<div id="nicoadex_iframePanel_header"><h1>ニコニ広告EX.<a data-v-0d10b35d="" href="https://github.com/AyumuNekozuki/nicoad-ex" target="_blank"><svg style="vertical-align: middle;" data-v-0d10b35d="" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><circle data-v-0d10b35d="" cx="9" cy="9" r="9" fill="#0080ff"></circle> <path data-v-0d10b35d="" d="M10.2,12a.4.4,0,0,1,.4.4v1.2a.4.4,0,0,1-.4.4H7.8a.4.4,0,0,1-.4-.4V12.4a.4.4,0,0,1,.4-.4ZM4,5.6A1.6,1.6,0,0,1,5.6,4h6.8A1.6,1.6,0,0,1,14,5.6V8.2a1.6,1.6,0,0,1-1.6,1.6h-2a.4.4,0,0,0-.4.4v.6a.4.4,0,0,1-.4.4H8.4a.4.4,0,0,1-.4-.4V9a.8.8,0,0,1,.8-.8h2.4a.8.8,0,0,0,.8-.8v-1a.8.8,0,0,0-.8-.8H6.8a.8.8,0,0,0-.8.8V7.6a.4.4,0,0,1-.4.4H4.4A.4.4,0,0,1,4,7.6Z" fill="#fff"></path></svg></a></h1></div>')

          //iframe url replace
          var nicoID = location.pathname.slice(7, 18);
          var nicoad_url = 'https://nicoad.nicovideo.jp/live/publish/' + nicoID;
          document.getElementById('RICH-IFRAME').contentWindow.location.replace(nicoad_url);
          
      });

      //終了処理
      function exit_nicoadex() {
          if (document.getElementById('nicoadex_iframePanel_header')) {
              $('#nicoadex_iframePanel_header').remove();
          }

          $('.___rich-view-status___3pi29.___rich-view___YzcJi').removeAttr('aria-expanded');
          $('.___rich-view-status___3pi29.___rich-view___YzcJi').attr('aria-expanded', 'false');
          $('.___rich-view-status___3pi29.___rich-view___YzcJi').attr('hidden', '');
          
          //ステータスパネル＆コメント欄のhidden除去
          if(!$('div[data-browser-fullscreen="target"]').length){
            $('.___player-status-panel___jaSDM.___player-status-panel___1qLZ6').removeAttr('aria-hidden');
          }
          
          var iframe = document.getElementById('RICH-IFRAME');
          iframe.contentWindow.location.replace('(unknown)');
      }


      $('#iframe-close-but').on('click', function () {
          exit_nicoadex();
      });
      $('#fullscreen-but').on('click', function () {
          document.getElementById("iframe-close-but").click();
      });
      $('#setting-but').on('click', function () {
          document.getElementById("iframe-close-but").click();
      });

      //ニコニ広告exヘッダ削除
      //エモーション,ギフト,新市場
      $('.___emotion-button___1Rolf').addClass('adex-other');
      $('[aria-label="ギフト"]').addClass('adex-other');
      $('.___add-button___1FEKw').addClass('adex-other');
      $('[data-content-type="broadcast_tool"]').addClass('adex-other');
      $('.adex-other').on('click', function () {
          $('#nicoadex_iframePanel_header').remove();
      });
  }

  //初回～
  async function live_first() {
      // ボタンが遅延上書きされる場合があるので、変更を検知して上書きする。
      // 上書きによって消えない親要素を監視する。
      const target = document.querySelector('[class*="ichiba-counter-section"]')
      const observer = new MutationObserver(() => {
          if (isDefaultButtonExist()) {
              live_main()
          }
      })
      observer.observe(target, { attributes: true, childList: true, subtree: true })

      if (isDefaultButtonExist()) {
          live_main()
      } else {
          console.log("ニコニ広告ex.: ニコニ広告ボタンを取得できませんでした。");
      }
  }

  live_first();
}