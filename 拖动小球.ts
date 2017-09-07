// 获取元素
var container = <HTMLElement>document.querySelector(".container");
var addBtn = <HTMLElement>document.querySelector(".addBtn");

var flag: boolean = false;
var newEle = null;
var tarEle = null;
var mouseX: number = null;
var mouseY: number = null;
var topSize: number = 99;
enum colorList {
  // "red" = 1,
  "red",
  "gold",
  "darkblue",
  "hotpink",
  "green"
}

addBtn.addEventListener("click", addBall);
container.addEventListener("dblclick", removeBall);
container.addEventListener("mousedown", catchBall);
document.addEventListener("mousemove", moveBall);
document.addEventListener("mouseup", putBall);

// 创建小球
function addBall() {
  newEle = document.createElement("span");
  newEle.setAttribute("class", "ball");
  // newEle.style.backgroundColor = colorList[Math.ceil(Math.random() * 5)]; // 添加颜色
  newEle.style.backgroundColor = colorList[parseInt(Math.random() * 5 + '')]; // 添加颜色
  container.appendChild(newEle);
  newEle.style.left =
    Math.random() * (container.offsetWidth - newEle.offsetWidth) + "px";
  newEle.style.top =
    Math.random() * (container.offsetHeight - newEle.offsetHeight) + "px";
  newEle = null; // 初始化变量
}

// 删除小球
function removeBall(e: MouseEvent) {
  tarEle = <HTMLSpanElement>e.target;
  //   获取到目标元素，并且不是容器
  if (tarEle && tarEle !== container) {
    tarEle.parentNode.removeChild(tarEle); // 移除目标元素
    tarEle = null; // 初始化变量
  }
}

// 抓取小球
function catchBall(e: MouseEvent) {
  tarEle = <HTMLSpanElement>e.target;
  if (tarEle && tarEle !== container) {
    flag = true;
    // 顶置被选中的元素
    topSize++;
    tarEle.style.zIndex = topSize;
    // 获取鼠标在球内的位置
    mouseX = e.pageX - (tarEle.offsetLeft + container.offsetLeft);
    mouseY = e.pageY - (tarEle.offsetTop + container.offsetTop);
  }
}

// 移动小球
function moveBall(e: MouseEvent) {
  e.preventDefault(); // 阻止浏览器的默认事件
  if (flag) {
    // 获取鼠标在大盒子内的位置
    let crdX: number = e.pageX - container.offsetLeft;
    let crdY: number = e.pageY - container.offsetTop;
    // 获取球的移动距离
    let moveBallX: number = crdX - mouseX;
    let moveBallY: number = crdY - mouseY;
    // 对小球移动的位置进行约束
    const rightLimit: number = container.offsetWidth - tarEle.offsetWidth;
    const bottomLimit: number = container.offsetHeight - tarEle.offsetHeight;
    if (moveBallX <= 0) moveBallX = 0;
    if (moveBallX >= rightLimit) moveBallX = rightLimit;
    if (moveBallY <= 0) moveBallY = 0;
    if (moveBallY >= bottomLimit) moveBallY = bottomLimit;
    // 赋值
    tarEle.style.left = moveBallX + "px";
    tarEle.style.top = moveBallY + "px";
  }
}

// 初始化变量
function putBall() {
  flag = false;
  tarEle = null;
  mouseX = null;
  mouseY = null;
}