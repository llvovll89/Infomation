// 전역변수 안쓰려고,,
(() => {
  const stepElems = document.querySelectorAll(".step");
  const graphicElems = document.querySelectorAll(".graphic-item");
  // 현재 활성화된 (visible 클래스 붙은) .graphic-item지정
  let currentItem = graphicElems[0];
  let ioindex;

  const io = new IntersectionObserver((entries, observer) => {
    ioindex = entries[0].target.dataset.index * 1;
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    // stepElems[i].setAttribute("data-index", i);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  function activate() {
    currentItem.classList.add("visible");
  }

  function inActivate() {
    currentItem.classList.remove("visible");
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;
    let temp = 0;

    // for (let i = 0; i < stepElems.length; i++) {
    for (let i = ioindex - 1; i < ioindex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;
      // boundingRect - 속성값 ex) 위치값
      boundingRect = step.getBoundingClientRect();

      temp++;

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inActivate();
        currentItem = graphicElems[step.dataset.index];
        activate();
      }
    }
  });
  activate();
})();
