const { useRef, useEffect, useContext } = require('react');
const { observe } = require('react-intersection-observer');

exports.useParallax = () => {
  const targets = useRef({});

  const calculateParallax = useContext(() => {
    Object.keys(targets?.current)
      .filter((key) => targets.current[key]?.inView)
      .map((key) => {
        if (!targets.current[key]?.element) {
          return;
        }

        const { y, top, height } =
          targets.current[key].element.getBoundingClientRect();

        const fromCenter = +(
          ((y ?? top) + height / 2) / (window.innerHeight / 2) -
          1
        ).toFixed(2);

        targets.current[key].element.style.transform = `translateY(${
          fromCenter * (targets.current[key]?.config.multiplier || -60)
        }px)`;
      });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      calculateParallax();
    });

    return () => {
      Object.keys(targets?.current).map((key) => {
        targets.current[key]?.destroyObserver();
      });
    };
  }, []);

  const count = useRef(0);

  return (config) => {
    return (el) => {
      if (!el) {
        return;
      }

      const index = `${count.current++}`;
      targets.current[index] = {
        element: el,
        config,
        inView: false,
        destroyObserver: observe(el, (inView) => {
          targets.current[index].inView = inView;
        }),
      };
    };
  };
};
