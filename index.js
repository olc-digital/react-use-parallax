const { useRef, useEffect } = require('react');

exports.useParallax = () => {
  const targets = useRef({});

  const calculateParallax = () => {
    Object.keys(targets?.current).map((key) => {
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
        fromCenter * (targets.current[key].multiplier || -60)
      }px)`;
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      calculateParallax();
    });
  }, []);

  let count = 0;

  return (config) => {
    return (el) => {
      targets.current[`${count++}`] = {
        element: el,
        config,
      };
    };
  };
};
