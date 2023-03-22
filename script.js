
var gSize = 64;
var gFlipped = true;
var gShowSeconds = true;

onload = _ => {
  initialize();
};

function initialize() {
  document.getElementById('settings').addEventListener('click', preventBackgroundClick);
  document.getElementById('size').addEventListener('input', sizeChanged);
  document.getElementById('flipped').addEventListener('change', flippedChanged);
  document.getElementById('show_seconds').addEventListener('change', showSecondsChanged);
  document.getElementById('main_container').addEventListener('click', mainContainerClicked);
  document.getElementById('enter_into_fullscreen').addEventListener('click', enterIntoFullscreenClicked);
  if (!document.fullscreenEnabled) {
    document.getElementById('enter_into_fullscreen').className = 'hidden';
  }
  heartbeat();
}

function heartbeat() {
  setTimeout(heartbeat, 1000);

  var now = new Date();
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
  document.getElementById('hour_1').innerText = hour.charAt(0);
  document.getElementById('hour_2').innerText = hour.charAt(1);
  document.getElementById('minute_1').innerText = minute.charAt(0);
  document.getElementById('minute_2').innerText = minute.charAt(1);
  document.getElementById('second_1').innerText = second.charAt(0);
  document.getElementById('second_2').innerText = second.charAt(1);
}

function sizeChanged(event) {
  gSize = event.target.value;
  var objects = document.getElementsByClassName('clock_digit');
  for (object of objects) {
    object.style.width = gSize;
    object.style.height = gSize;
    object.style.fontSize = Math.floor(gSize / 2);
  }
  document.getElementById('clock').style.height = gSize;
  if (gShowSeconds) {
    document.getElementById('clock').style.width = gSize * 6;
  } else {
    document.getElementById('clock').style.width = gSize * 4;
  }
  document.getElementById('size_value').innerText = gSize;
  event.preventDefault();
  return false;
}

function showSecondsChanged(event) {
  gShowSeconds = event.target.checked;
  if (gShowSeconds) {
    document.getElementById('second_1').className = "clock_digit";
    document.getElementById('second_2').className = "clock_digit";
    document.getElementById('clock').style.width = gSize * 6;
  } else {
    document.getElementById('second_1').className = "clock_digit hidden";
    document.getElementById('second_2').className = "clock_digit hidden";
    document.getElementById('clock').style.width = gSize * 4;
  }
}

function preventBackgroundClick(event) {
  event.stopPropagation();
  return false;
}

function mainContainerClicked() {
  var nowClass = document.getElementById('settings').className;
  if (nowClass.indexOf("hidden") >= 0) {
    nowClass = document.getElementById('settings').className = "settings";
  } else {
    nowClass = document.getElementById('settings').className = "settings hidden";
  }
  event.preventDefault();
  return false;
}

function flippedChanged(event) {
  gFlipped = event.target.checked;
  if (gFlipped) {
    document.getElementById('clock').className = "clock flipped"
  } else {
    document.getElementById('clock').className = "clock"
  }
  event.preventDefault();
  return false;
}

function enterIntoFullscreenClicked(event) {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.body.requestFullscreen();
  }
}