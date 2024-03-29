
var gSize = 64;
var gShowGrid = true;
var gFlipped = true;
var gShowDate = true;
var gShowSeconds = true;
var gLastMouseEvent = undefined;
var gMouseMoved = false;
var gLastTouchEvent = undefined;

onload = _ => {
  initialize();
  windowResized();
  drawGrid();
};

function drawGrid() {
  var canvas = document.getElementById('background_grid');
  var width = canvas.clientWidth;
  var height = canvas.clientHeight;
  canvas.width = width;
  canvas.height = height;
  var gridSize = parseFloat(document.getElementById('size').value);
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  var dy = 0;
  while (dy <= height / 2) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#303030";
    ctx.moveTo(0, (height / 2) - dy);
    ctx.lineTo(width, (height / 2) - dy);
    ctx.stroke();
    
    if (dy > 0) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#303030";
      ctx.moveTo(0, (height / 2) + dy);
      ctx.lineTo(width, (height / 2) + dy);
      ctx.stroke();
    }

    dy += gridSize;
  }

  var dx = 0;
  while (dx <= width / 2) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#303030";
    ctx.moveTo((width / 2) - dx, 0);
    ctx.lineTo((width / 2) - dx, height);
    ctx.stroke();

    if (dx > 0) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#303030";
      ctx.moveTo((width / 2) + dx, 0);
      ctx.lineTo((width / 2) + dx, height);
      ctx.stroke();
    }

    dx += gridSize;
  }

}

function initialize() {
  window.addEventListener('resize', windowResized);
  document.addEventListener('keydown', mainContainerKeyPressed);
  document.getElementById('settings').addEventListener('click', preventBackgroundClick);
  document.getElementById('settings').addEventListener('mousedown', preventBackgroundClick);
  document.getElementById('settings').addEventListener('mousemove', preventBackgroundClick);
  document.getElementById('settings').addEventListener('mouseup', preventBackgroundClick);
  document.getElementById('settings').addEventListener('touchstart', preventBackgroundClick);
  document.getElementById('settings').addEventListener('touchmove', preventBackgroundClick);
  document.getElementById('size').addEventListener('input', sizeChanged);
  document.getElementById('size_value').addEventListener('click', sizeValueClicked);
  document.getElementById('show_grid').addEventListener('change', showGridChanged);
  document.getElementById('flipped').addEventListener('change', flippedChanged);
  document.getElementById('font_family').addEventListener('change', fontFamilyChanged);
  document.getElementById('digits').addEventListener('change', digitsChanged);
  document.getElementById('main_container').addEventListener('mousedown', mainContainerPressed);
  document.getElementById('main_container').addEventListener('mousemove', mainContainerMouseMoved);
  document.getElementById('main_container').addEventListener('mouseup', mainContainerLeft);
  document.getElementById('main_container').addEventListener('touchstart', mainContainerTouchStarted);
  document.getElementById('main_container').addEventListener('touchmove', mainContainerTouchMoved);
  document.getElementById('main_container').addEventListener('wheel', scrolledByWheel);
  document.getElementById('enter_into_fullscreen').addEventListener('click', enterIntoFullscreenClicked);
  if (!document.fullscreenEnabled) {
    document.getElementById('enter_into_fullscreen').className = 'hidden';
  }
  heartbeat();
}

function mainContainerPressed() {
  gLastMouseEvent = event;
  gMouseMoved = false;
}

function mainContainerMouseMoved() {
  if (gLastMouseEvent != undefined) {
    var deltaY = event.clientY - gLastMouseEvent.clientY;
    if (deltaY <= -16) {
      gSize += 2;
      document.getElementById('size').value = gSize;
      updateSize(gSize);
      gLastMouseEvent = event;
      gMouseMoved = true;
    } else if (deltaY >= 16) {
      gSize -= 2;
      document.getElementById('size').value = gSize;
      updateSize(gSize);
      gLastMouseEvent = event;
      gMouseMoved = true;
    }
  }
}

function mainContainerLeft() {
  gLastMouseEvent = undefined;
  if (!gMouseMoved) {
    var nowClass = document.getElementById('settings').className;
    if (nowClass.indexOf("hidden") >= 0) {
      nowClass = document.getElementById('settings').className = "settings";
    } else {
      nowClass = document.getElementById('settings').className = "settings hidden";
    }
  }
}

function mainContainerTouchStarted() {
  gLastTouchEvent = event;
}

function mainContainerTouchMoved() {
  if (gLastTouchEvent != undefined && gLastTouchEvent.targetTouches.length > 0) {
    var deltaY = event.targetTouches[0].clientY - gLastTouchEvent.targetTouches[0].clientY;
    if (deltaY <= -16) {
      gSize += 2;
      document.getElementById('size').value = gSize;
      updateSize(gSize);
      gLastTouchEvent = event;
      gMouseMoved = true;
    } else if (deltaY >= 16) {
      gSize -= 2;
      document.getElementById('size').value = gSize;
      updateSize(gSize);
      gLastTouchEvent = event;
      gMouseMoved = true;
    }
  }
}

function windowResized() {
  var eSize = document.getElementById('size');
  if (gShowSeconds) {
    eSize.setAttribute('max', Math.floor(document.body.clientWidth / 6));
  } else {
    eSize.setAttribute('max', Math.floor(document.body.clientWidth / 4));
  }
  if (parseInt(eSize.value) > parseInt(eSize.getAttribute('max'))) {
    eSize.value = eSize.getAttribute('max');
    document.getElementById('size').value = gSize;
  }
  updateSize(eSize.value);
  drawGrid();
}

function heartbeat() {
  setTimeout(heartbeat, 1000);

  var now = new Date();
  var year = new String(now.getYear());
  var month = new String(now.getMonth() + 1);
  if (month.length < 2) {
    month = "0" + month;
  }
  var day = new String(now.getDate());
  if (day.length < 2) {
    day = "0" + day;
  }

  var hour = new String(now.getHours());
  if (hour.length < 2) {
    hour = "0" + hour;
  }
  var minute = new String(now.getMinutes());
  if (minute.length < 2) {
    minute = "0" + minute;
  }
  var second = new String(now.getSeconds());
  if (second.length < 2) {
    second = "0" + second;
  }
  document.getElementById('year_1').innerText = year.charAt(0);
  document.getElementById('year_2').innerText = year.charAt(1);
  document.getElementById('month_1').innerText = month.charAt(0);
  document.getElementById('month_2').innerText = month.charAt(1);
  document.getElementById('day_1').innerText = day.charAt(0);
  document.getElementById('day_2').innerText = day.charAt(1);
  document.getElementById('hour_1').innerText = hour.charAt(0);
  document.getElementById('hour_2').innerText = hour.charAt(1);
  document.getElementById('minute_1').innerText = minute.charAt(0);
  document.getElementById('minute_2').innerText = minute.charAt(1);
  document.getElementById('second_1').innerText = second.charAt(0);
  document.getElementById('second_2').innerText = second.charAt(1);
}

function scrolledByWheel(event) {
  if (event.deltaY > 0) {
    gSize += 2;
    document.getElementById('size').value = gSize;
    updateSize(gSize);
  } else if (event.deltaY < 0) {
    gSize -= 2;
    document.getElementById('size').value = gSize;
    updateSize(gSize);
  }
}

function mainContainerKeyPressed() {
  var keyCode = event.keyCode;
  if (keyCode == 38 || keyCode == 107 || keyCode == 67 || keyCode == 187 || keyCode == 49 || keyCode == 97 || keyCode == 228) { // 上、プラス、C、1、ゲームパッド90
    gSize += 2;
    document.getElementById('size').value = gSize;
    updateSize(gSize);
  } else if (keyCode == 40 || keyCode == 109 || keyCode == 68 || keyCode == 189 || keyCode == 50 || keyCode == 98 || keyCode == 227) { // 下、マイナス、D、2、ゲームパッド89
    gSize -= 2;
    document.getElementById('size').value = gSize;
    updateSize(gSize);
  } else if (keyCode == 51 || keyCode == 99 || keyCode == 37) { // 3、左
    gShowGrid = !document.getElementById('show_grid').checked;
    document.getElementById('show_grid').checked = gShowGrid;
    if (gShowGrid) {
      document.getElementById('background_grid').className = "";
    } else {
      document.getElementById('background_grid').className = "hidden";
    }
    drawGrid();
  } else if (keyCode == 52 || keyCode == 100 || keyCode == 39) { // 4、右
    gFlipped = !document.getElementById('flipped').checked;
    document.getElementById('flipped').checked = gFlipped;
    flippedChanged();
    updateDateClockClassName();
    drawGrid();
  } else if (keyCode == 53 || keyCode == 101 || keyCode == 71) { // 5、G
    if (document.getElementById('font_family').selectedIndex >= document.getElementById('font_family').options.length - 1) {
      document.getElementById('font_family').selectedIndex = 0;
    } else {
      document.getElementById('font_family').selectedIndex = document.getElementById('font_family').selectedIndex + 1;
    }
    fontFamilyChanged();
  } else if (keyCode == 54 || keyCode == 102 || keyCode == 74) { // 6、J
    if (document.getElementById('font_family').selectedIndex <= 0) {
      document.getElementById('font_family').selectedIndex = document.getElementById('font_family').options.length - 1;
    } else {
      document.getElementById('font_family').selectedIndex = document.getElementById('font_family').selectedIndex - 1;
    }
    fontFamilyChanged();
  } else if (keyCode == 55 || keyCode == 103 || keyCode == 72) { // 7、H
    if (document.getElementById('digits').selectedIndex >= document.getElementById('digits').options.length - 1) {
      document.getElementById('digits').selectedIndex = 0;
    } else {
      document.getElementById('digits').selectedIndex = document.getElementById('digits').selectedIndex + 1;
    }
    digitsChanged();
    updateDateClockClassName();
    drawGrid();
  } else if (keyCode == 56 || keyCode == 104 || keyCode == 73) { // 8、I
    if (document.getElementById('digits').selectedIndex <= 0) {
      document.getElementById('digits').selectedIndex = document.getElementById('digits').options.length - 1;
    } else {
      document.getElementById('digits').selectedIndex = document.getElementById('digits').selectedIndex - 1;
    }
    digitsChanged();
    updateDateClockClassName();
    drawGrid();
  } else if (keyCode == 48 || keyCode == 96 || keyCode == 79) { // 0、O
    var nowClass = document.getElementById('settings').className;
    if (nowClass.indexOf("hidden") >= 0) {
      document.getElementById('settings').className = "settings";
    } else {
      document.getElementById('settings').className = "settings hidden";
    }
  } else if (keyCode == 57 || keyCode == 105 || keyCode == 78) { // 9、N
    gSize = 64;
    document.getElementById('size').value = gSize;
    document.getElementById('settings').className = "settings";
    document.getElementById('show_grid').checked = true;
    document.getElementById('background_grid').className = ""
    document.getElementById('flipped').checked = true;
    document.getElementById('font_family').selectedIndex = 0;
    document.getElementById('digits').selectedIndex = 0;
    updateSize(gSize);
    flippedChanged();
    fontFamilyChanged();
    digitsChanged();
    updateDateClockClassName();
    drawGrid();
  }

  if (keyCode == 13 && document.getElementById('settings').className.indexOf('hidden') >= 0) { // Enterキー、かつ設定フォームが非表示
    nowClass = document.getElementById('settings').className = "settings";
  }
}

function sizeValueClicked(event) {
  var newSize = window.prompt("new size:", gSize);
  if (!isNaN(newSize) && newSize >= 8 && newSize <= 1024) {
    gSize = parseFloat(newSize);
    document.getElementById('size').value = gSize;
    updateSize(gSize);
  }
}

function sizeChanged(event) {
  updateSize(document.getElementById('size').value);

  event.preventDefault();

  return false;
}

function updateSize(newSize) {
  gSize = parseFloat(newSize);
  if (gSize < parseFloat(document.getElementById('size').getAttribute('min'))) {
    gSize = parseFloat(document.getElementById('size').getAttribute('min'));
  } else if (gSize > parseFloat(document.getElementById('size').getAttribute('max'))) {
    gSize = parseFloat(document.getElementById('size').getAttribute('max'));
  }

  var clockDigits = document.getElementsByClassName('clock_digit');
  for (object of clockDigits) {
    object.style.width = gSize;
    object.style.height = gSize;
    object.style.fontSize = Math.floor(gSize / 2);
  }
  var dateDigits = document.getElementsByClassName('date_digit');
  for (object of dateDigits) {
    object.style.width = gSize;
    object.style.height = gSize;
    object.style.fontSize = Math.floor(gSize / 2);
  }
  document.getElementById('clock').style.height = gSize;
  document.getElementById('date').style.height = gSize;
  if (gShowSeconds) {
    document.getElementById('clock').style.width = gSize * 6;
    document.getElementById('date').style.width = gSize * 6;
  } else {
    document.getElementById('clock').style.width = gSize * 4;
    document.getElementById('date').style.width = gSize * 4;
  }
  document.getElementById('size_value').innerText = gSize;

  drawGrid();
  updateDateClockClassName();
}

function preventBackgroundClick(event) {
  event.stopPropagation();
  return false;
}

function showGridChanged(event) {
  gShowGrid = document.getElementById('show_grid').checked;
  if (gShowGrid) {
    document.getElementById('background_grid').className = "";
    drawGrid();
  } else {
    document.getElementById('background_grid').className = "hidden";
  }
  event.preventDefault();

  return false;
}

function flippedChanged(event) {
  gFlipped = document.getElementById('flipped').checked;
  updateDateClockClassName();

  drawGrid();
  return false;
}

function enterIntoFullscreenClicked(event) {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.body.requestFullscreen();
  }
}

function fontFamilyChanged() {
  document.getElementById('date').style.fontFamily = document.getElementById('font_family').value;
  document.getElementById('clock').style.fontFamily = document.getElementById('font_family').value;
}

function digitsChanged() {
  var newValue = parseInt(document.getElementById('digits').value);
  switch (newValue) {
  case 12:
    gShowDate = true;
    gShowSeconds = true;
    break;
  case 8:
    gShowDate = true;
    gShowSeconds = false;
    break;
  case 6:
    gShowDate = false;
    gShowSeconds = true;
    break;
  case 4:
    gShowDate = false;
    gShowSeconds = false;
    break;
  }
  updateDateClockClassName();
  drawGrid();
}

function updateDateClockClassName() {
  var dateClassName = "date";
  var clockClassName = "clock";
  if (gFlipped) {
    dateClassName += " flipped";
    clockClassName += " flipped";
  }
  if (!gShowDate) {
    dateClassName += " hidden";
  }
  document.getElementById('date').className = dateClassName;
  document.getElementById('clock').className = clockClassName;

  if (gShowSeconds) {
    document.getElementById('year_1').className = "date_digit";
    document.getElementById('year_2').className = "date_digit";
    document.getElementById('second_1').className = "clock_digit";
    document.getElementById('second_2').className = "clock_digit";
    document.getElementById('clock').style.width = gSize * 6;
    document.getElementById('date').style.width = gSize * 6;
  } else {
    document.getElementById('year_1').className = "date_digit hidden";
    document.getElementById('year_2').className = "date_digit hidden";
    document.getElementById('second_1').className = "clock_digit hidden";
    document.getElementById('second_2').className = "clock_digit hidden";
    document.getElementById('clock').style.width = gSize * 4;
    document.getElementById('date').style.width = gSize * 4;
  }

  if (gFlipped) {
    document.getElementById('date').style.transform = "translatey(" + (gSize / 2) + "px) scale(1, -1)";
    document.getElementById('clock').style.transform = "translatey(" + (-gSize / 2) + "px) scale(1, -1)";
  } else {
    document.getElementById('date').style.transform = "translatey(" + (-gSize / 2) + "px)";
    document.getElementById('clock').style.transform = "translatey(" + (gSize / 2) + "px)";
  }
}
