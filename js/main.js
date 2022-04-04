// 전역변수 안쓰려고,,
(() => {
  const actions = {
    birdFlies(key) {
      // key 가 true면
      if (key) {
        document.querySelector(
          `[data-index="2"] .bird`
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          `[data-index="2"] .bird`
        ).style.transform = `translateX(-100%}px)`;
      }
    },
    birdFlies2(key) {
      // key 가 true면
      if (key) {
        document.querySelector(
          `[data-index="5"] .bird`
        ).style.transform = `translate(${window.innerWidth}px, ${
          -window.innerHeight * 0.7
        }px )`;
      } else {
        document.querySelector(
          `[data-index="5"] .bird`
        ).style.transform = `translateX(-100%}px)`;
      }
    },
  };

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

  function activate(action) {
    currentItem.classList.add("visible");
    if (action) {
      actions[action](true);
    }
  }

  function inActivate(action) {
    currentItem.classList.remove("visible");
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;

    // for (let i = 0; i < stepElems.length; i++) {
    for (let i = ioindex - 1; i < ioindex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;
      // boundingRect - 속성값 ex) 위치값
      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inActivate();
        currentItem = graphicElems[step.dataset.index];
        activate(currentItem.dataset.action);
      }
    }
  });

  window.addEventListener("load", () => {
    // x, y 방향 순서
    setTimeout(() => scrollTo(0, 0), 100);
  });

  activate();
})();
