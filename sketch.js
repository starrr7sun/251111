// by SamuelYAN
// more works //
// https://twitter.com/SamuelAnn0924
// https://www.instagram.com/samuel_yan_1990/

// genuary25
// JAN. 17. (credit: Roni Kaufman)
// What happens if pi=4?

let mySize;

// a shader variable
let theShader;

function preload(){
	theShader = new p5.Shader(this.renderer,vert,frag)
}

function setup() {
	mySize = min(windowWidth, windowHeight)*1.0;
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  // createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  // Create a full-height left slide-out menu using p5 DOM (entirely in sketch.js)
  const menu = createDiv();
  menu.id('leftSlideMenu');
  menu.style('position', 'absolute');
  menu.style('left', '-90px'); // hidden except 10px (so it's off-screen initially)
  menu.style('top', '0px');
  menu.style('height', '100%');
  menu.style('width', '100px');
  // white with 50% opacity
  menu.style('background', 'rgba(255,255,255,0.5)');
  menu.style('padding', '12px 8px');
  menu.style('box-sizing', 'border-box');
  menu.style('font-family', 'sans-serif');
  menu.style('z-index', '20');
  // ensure menu stays above overlay when open
  menu.style('z-index', '2000');
  menu.style('transition', 'left 200ms ease');

  // Menu container for items (vertical layout)
  const menuInner = createDiv();
  menuInner.parent(menu);
  menuInner.style('display', 'flex');
  menuInner.style('flex-direction', 'column');
  menuInner.style('align-items', 'flex-start');
  menuInner.style('height', '100%');
  menuInner.style('justify-content', 'flex-start');
  menuInner.style('padding-top', '20px');

  // Menu items
  const items = ['單元一作品', '單元一筆記', '測驗卷', '測驗卷筆記', '作品筆記','淡江大學', '關閉視窗'];
  items.forEach((label, i) => {
    const item = createDiv(label);
    item.parent(menuInner);
    item.style('color', '#000000');
    item.style('font-size', '16px');
    item.style('padding', '10px 8px');
    item.style('width', '100%');
    item.style('box-sizing', 'border-box');
    item.style('cursor', 'pointer');
    // hover effect
    item.mouseOver(() => {
      item.style('color', '#000000');
      item.style('background', 'rgba(0,0,0,0.04)');
    });
    item.mouseOut(() => {
      item.style('color', '#000000');
      item.style('background', 'transparent');
    });
     // 為淡江大學建立子選單
    if (label === '淡江大學') {
      const subMenu = createDiv();
      subMenu.parent(menuInner);
      subMenu.style('display', 'none');
      subMenu.style('padding-left', '20px');
      subMenu.style('width', '100%');
      
      // 建立教育科技學系選項
      const etItem = createDiv('教育科技學系');
      etItem.parent(subMenu);
      etItem.style('color', '#000000');
      etItem.style('font-size', '14px');
      etItem.style('padding', '8px');
      etItem.style('cursor', 'pointer');
      
      // 子選單滑鼠效果
      etItem.mouseOver(() => {
        etItem.style('background', 'rgba(0,0,0,0.04)');
      });
      etItem.mouseOut(() => {
        etItem.style('background', 'transparent');
      });
      
      // 點擊子選單連結
      etItem.mousePressed(() => {
        openOverlayWithURL('https://www.et.tku.edu.tw/');
      });

      // 當滑鼠移到淡江大學時顯示子選單
      item.mouseOver(() => {
        item.style('background', 'rgba(0,0,0,0.04)');
        subMenu.style('display', 'block');
      });
      
      // 監聽整個選單區域的滑鼠移出事件
      const menuArea = createDiv();
      menuArea.parent(menuInner);
      menuArea.position(item.position().x, item.position().y);
      menuArea.size(item.width, item.height + subMenu.height);
      menuArea.style('position', 'absolute');
      
      menuArea.mouseOut(() => {
        if (!menuArea.matches(':hover')) {
          item.style('background', 'transparent');
          subMenu.style('display', 'none');
        }
      });
    } else {
      // 其他選單項目的原有滑鼠效果
      item.mouseOver(() => {
        item.style('color', '#000000');
        item.style('background', 'rgba(0,0,0,0.04)');
      });
      item.mouseOut(() => {
        item.style('color', '#000000');
        item.style('background', 'transparent');
      });
    }

    item.mousePressed(() => {
      console.log(label + ' clicked');
      // Open URLs for specific items inside iframe overlay
      if (label === '單元一作品') {
        openOverlayWithURL('https://starrr7sun.github.io/251014_2/');
      } else if (label === '單元一筆記') {
        openOverlayWithURL('https://hackmd.io/@teDfc_ZHRUuqk3jgyybMwA/Sk2B3q9Agg');
      }else if (label === '測驗卷') {
        openOverlayWithURL('https://starrr7sun.github.io/251028/');
      }else if (label === '測驗卷筆記') {
        openOverlayWithURL('https://hackmd.io/@teDfc_ZHRUuqk3jgyybMwA/rkp4q2T0ll');
      }else if (label === '作品筆記') {
        openOverlayWithURL('https://hackmd.io/@teDfc_ZHRUuqk3jgyybMwA/Bk1CmxDyWg');
      }else if (label === '淡江大學') {
        openOverlayWithURL('https://www.tku.edu.tw/');
      } else {
        // 關閉視窗: close overlay
        closeOverlay();
      }
    });
  });


  // Track menu and window so we can update on resize and mouse move
  window._p5LeftMenu = { el: menu };

  // Create overlay + iframe (hidden by default)
  const overlay = createDiv();
  overlay.id('p5IframeOverlay');
  overlay.style('position', 'fixed');
  overlay.style('left', '0');
  overlay.style('top', '0');
  overlay.style('width', '100%');
  overlay.style('height', '100%');
  overlay.style('background', 'rgba(0,0,0,0.6)');
  overlay.style('display', 'none');
  overlay.style('align-items', 'center');
  overlay.style('justify-content', 'center');
  overlay.style('z-index', '1000');

  // Inner container for iframe to control size
  const iframeContainer = createDiv();
  iframeContainer.parent(overlay);
  iframeContainer.style('width', '80%');
  iframeContainer.style('height', '80%');
  iframeContainer.style('background', '#ffffff');
  iframeContainer.style('box-shadow', '0 10px 40px rgba(0,0,0,0.5)');
  iframeContainer.style('position', 'relative');
  iframeContainer.style('z-index', '1010');

  // Close button
  const closeBtn = createButton('✕');
  closeBtn.parent(iframeContainer);
  closeBtn.style('position', 'absolute');
  closeBtn.style('right', '8px');
  closeBtn.style('top', '8px');
  closeBtn.style('z-index', '1100');
  closeBtn.style('background', 'transparent');
  closeBtn.style('border', 'none');
  closeBtn.style('font-size', '20px');
  closeBtn.style('cursor', 'pointer');
  closeBtn.mousePressed(() => closeOverlay());

  // iframe element
  const iframe = createElement('iframe');
  iframe.parent(iframeContainer);
  iframe.attribute('frameborder', '0');
  iframe.style('width', '100%');
  iframe.style('height', '100%');

  // expose overlay controls globally
  window._p5IframeOverlay = {
    overlayEl: overlay,
    iframeEl: iframe,
    open: function(url) {
      iframe.attribute('src', url);
      overlay.style('display', 'flex');
    },
    close: function() {
      iframe.attribute('src', '');
      overlay.style('display', 'none');
    }
  };

  // Create background box and text; text will sit above the background
  const bgBox = createDiv();
  bgBox.id('p5CenterBg');
  bgBox.style('position', 'absolute');
  // white with alpha = 120/255
  bgBox.style('background', 'rgba(255,255,255,0.47058823529411764)');
  bgBox.style('box-sizing', 'border-box');
  // padding applied to background
  const padV = 8; // vertical padding
  const padH = 12; // horizontal padding
  bgBox.style('padding', `${padV}px ${padH}px`);
  bgBox.style('z-index', '990');

  // text element sits above background
  const centerText = createDiv('淡江大學414730738');
  centerText.id('p5CenterText');
  centerText.style('position', 'absolute');
  centerText.style('margin', '0');
  centerText.style('padding', '0');
  centerText.style('font-size', '16px');
  centerText.style('color', '#000000');
  centerText.style('z-index', '991');

  function updateCenterBox() {
    // measure natural size of text
    const el = centerText.elt;
    const naturalW = el.clientWidth;
    const naturalH = el.clientHeight;

  // Normal dimensions: bg width based on text width, bg height based on text height
  const boxW = naturalW + padH * 2; // width uses text width
  const boxH = naturalH + padV * 2; // height uses text height

    const left = (windowWidth - boxW) / 2.0;
    const top = (windowHeight - boxH) / 2.0;

    bgBox.style('width', boxW + 'px');
    bgBox.style('height', boxH + 'px');
    bgBox.style('left', left + 'px');
    bgBox.style('top', top + 'px');

    // center text above the background
    const textLeft = left + (boxW - naturalW) / 2.0;
    const textTop = top + (boxH - naturalH) / 2.0;
    centerText.style('left', textLeft + 'px');
    centerText.style('top', textTop + 'px');
  }

  // initial layout
  updateCenterBox();

  // expose for resize handling
  window._p5CenterBox = { bgEl: bgBox, textEl: centerText, update: updateCenterBox };

  function openOverlayWithURL(url) {
    if (window._p5IframeOverlay) window._p5IframeOverlay.open(url);
  }

  function closeOverlay() {
    if (window._p5IframeOverlay) window._p5IframeOverlay.close();
  }

  // close overlay on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOverlay();
  });
}

function draw() {  
  // shader() sets the active shader with our shader
  shader(theShader);
  
  theShader.setUniform("u_resolution", [width, height]);
	theShader.setUniform("u_time", millis() / 1000.0); 
  theShader.setUniform("u_frame", frameCount/1.0);
  theShader.setUniform("", [mouseX/100.0, map(mouseY, 0, height, height, 0)/100.0]);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);

  // Slide-out menu behavior: if mouse is within 100px of left edge, slide in
  try {
    const menuObj = window._p5LeftMenu;
    if (menuObj && menuObj.el) {
      // Use mouseX from p5; when mouseX is undefined (e.g., outside canvas), fallback to 9999
      const mx = (typeof mouseX === 'number') ? mouseX : 9999;
      if (mx < 100) {
        menuObj.el.style('left', '0px');
      } else {
        // hide mostly off-screen; width 100, so left -90 keeps 10px visible
        menuObj.el.style('left', '-90px');
      }
    }
  } catch (e) {
    // don't break the sketch if DOM not present
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  try {
    if (window._p5CenterBox && window._p5CenterBox.update) window._p5CenterBox.update();
  } catch (e) {
    // ignore
  }
}
