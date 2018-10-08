let xRight = null;
let xLeft = null;
let yRight = null;
let yLeft = null;

export const addXRight = (xRightValue, width) => {
  if (xRight == null) {
    xRight = [];
    for (let i = 1; i <= width; i++) {
      xRight.push({
        x: i, y: 0
      });
    }
  }

  xRight.forEach(item => {
    if (Number(item.x) === Number(xRightValue)) {
      item.y = item.y + 1;
    }
  });
};

export const getXRight = () => xRight ? xRight : [{x: 0, y:0}];

export const addXLeft = (xLeftValue, width) => {
  if (xLeft == null) {
    xLeft = [];
    for (let i = 1; i <= width; i++) {
      xLeft.push({
        x: i, y: 0
      });
    }
  }

  xLeft.forEach(item => {
    if (Number(item.x) === Number(xLeftValue)) {
      item.y = item.y + 1;
    }
  });
};

export const getXLeft = () => xLeft ? xLeft : [{x: 0, y:0}];

export const addYRight = (yRightValue, height) => {
  if (yRight == null) {
    yRight = [];
    for (let i = 1; i <= height; i++) {
      yRight.push({
        x: i, y: 0
      });
    }
  }

  yRight.forEach(item => {
    if (Number(item.x) === Number(yRightValue)) {
      item.y = item.y + 1;
    }
  });
};

export const getYRight = () => yRight ? yRight : [{x: 0, y:0}];

export const addYLeft = (yLeftValue, height) => {
  if (yLeft == null) {
    yLeft = [];
    for (let i = 1; i <= height; i++) {
      yLeft.push({
        x: i, y: 0
      });
    }
  }

  yLeft.forEach(item => {
    if (Number(item.x) === Number(yLeftValue)) {
      item.y = item.y + 1;
    }
  });
};

export const getYLeft = () => yLeft ? yLeft : [{x: 0, y:0}];
