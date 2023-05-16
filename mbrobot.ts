let _axe = 0.097;
let _v = 50;

function w(robot, d1, d2, s1, s2) {
  robot.i2c.write(0x10, [0, d1, s1]);
  robot.i2c.write(0x10, [2, d2, s2]);
}
function setSpeed(speed) {
  if (speed < 20) {
    _v = speed + 5;
  } else {
    _v = speed;
  }
}
function forward(robot) {
  w(robot, 1, 1, _v, _v);
}
function backward(robot) {
  w(robot, 2, 2, _v, _v);
}
function stop(robot) {
  w(robot, 0, 0, 0, 0);
}
function right(robot) {
  let d1 = 2,
    d2 = 1;
  if (_v > 0) {
    (d1 = 1), (d2 = 2);
  }
  w(robot, d1, d2, Math.round(_v * 0.9), Math.round(_v * 0.9));
}

function left(robot) {
  let d1 = 1,
    d2 = 2;
  if (_v > 0) {
    d1 = 2;
    d2 = 1;
  }
  w(robot, d1, d2, Math.round(_v * 0.9), Math.round(_v * 0.9));
}

function rightArc(robot, r) {
  let v1, f;
  let v = Math.abs(_v);

  if (r < _axe) {
    v1 = 0;
  } else {
    f = ((r - _axe) / (r + _axe)) * (1 - (v * v) / 20000);
    v1 = Math.round(f * v);
  }
  if (_v > 0) {
    w(robot, 1, 1, v, v1);
  } else {
    w(robot, 2, 2, v1, v);
  }
}

function leftArc(robot, r) {
  let v1, f;
  let v = Math.abs(_v);

  if (r < _axe) {
    v1 = 0;
  } else {
    f = ((r - _axe) / (r + _axe)) * (1 - (v * v) / 20000);
    v1 = Math.round(f * v);
  }
  if (_v > 0) {
    w(robot, 1, 1, v1, v);
  } else {
    w(robot, 2, 2, v, v1);
  }
}

function getDistance(robot) {
  return robot.getDistance();
}

function setLED(robot, on) {
  robot.pin8.write_digital(on);
  robot.pin12.write_digital(on);
}
