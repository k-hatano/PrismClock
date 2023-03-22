
onload = _ => {
  initialize();
};

function initialize() {
  document.getElementById('settings').addEventListener('click', preventBackgroundClick);
  document.getElementById('size').addEventListener('input', sizeChanged);
  document.getElementById('flipped').addEventListener('change', flippedChanged);
  document.getElementById('main_container').addEventListener('click', mainContainerClicked);
  document.getElementById('enter_into_fullscreen').addEventListener('click', enterIntoFullscreenClicked);
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
  var newSize = event.target.value;
  var objects = document.getElementsByClassName('clock_digit');
  for (object of objects) {
    object.style.width = newSize;
    object.style.height = newSize;
    object.style.fontSize = Math.floor(newSize / 2);
  }
  document.getElementById('clock').style.height = newSize;
  document.getElementById('size_value').innerText = newSize;
  event.preventDefault();
  return false;
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
  var newValue = event.target.checked;
  if (newValue) {
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