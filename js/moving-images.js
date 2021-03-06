const _containerHeight = 2100;
let _width, _height, _scrollHeight;
const _movingElements = [];
let _scrollPercent = 0;
const pre = prefix();
let _jsPrefix  = pre.lowercase;
if(_jsPrefix == 'moz') _jsPrefix = 'Moz';
const _positions = [
  {
    name: '1', 
   	start: {
    	percent: 0.0, x: 0.0, y: 0
  	},
    end: {
      percent: 0.5, x: -0.5, y: 0
    }
  },
  {
    name: '2', 
   	start: {
    	percent: 0.0, x: 0, y: 0
  	},
    end: {
      percent: 0.5, x: 0.5, y: 0
    }
  }
];

resize();
initMovingElements();

function initMovingElements() {
  for (let i = 0; i < _positions.length; i++) {
    _positions[i].diff = {
      percent: _positions[i].end.percent - _positions[i].start.percent,
      x: _positions[i].end.x - _positions[i].start.x,
      y: _positions[i].end.y - _positions[i].start.y,
    };
    const el = document.getElementsByClassName('img'+_positions[i].name)[0];
    _movingElements.push(el);
  }
}

function resize() {
  if (window.innerWidth > 1400) {
    _width = 1400;
  } else {
    _width = window.innerWidth;
  }
  _height = window.innerHeight;
  _scrollHeight = _containerHeight-_height;
}

function updateElements() {
  for (let i = 0; i < _movingElements.length; i++) {
    const p = _positions[i];
    if(_scrollPercent <= p.start.percent) {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.start.x*_width)+'px, '+(p.start.y*_containerHeight)+'px, 0px)';
    } else if(_scrollPercent >= p.end.percent) {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.end.x*_width)+'px, '+(p.end.y*_containerHeight)+'px, 0px)';
    } else {
      _movingElements[i].style[_jsPrefix+'Transform'] = 'translate3d('+(p.start.x*_width + (p.diff.x*(_scrollPercent-p.start.percent)/p.diff.percent*_width))+'px, '+
        (p.start.y*_containerHeight + (p.diff.y*(_scrollPercent-p.start.percent)/p.diff.percent*_containerHeight))+'px, 0px)';
    }
  }
}



function loop() {
  let _scrollOffset = window.pageYOffset || window.scrollTop;
  _scrollPercent = _scrollOffset/_scrollHeight || 0;
  updateElements();
  requestAnimationFrame(loop);
}
loop();

window.addEventListener('resize', resize);

/* prefix detection http://davidwalsh.name/vendor-prefix */

function prefix() {
  const styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('') 
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre[0].toUpperCase() + pre.substr(1)
  };
}
