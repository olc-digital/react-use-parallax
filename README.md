# React useParallax hook (Beta)

A simple hook for easily implementing Parallax.

```js
import { useParallax } from 'react-parallax-hook';
```

```js
const parallaxRef = useParallax();

return (
  <>
    <div ref={parallaxRef()} />
    <img ref={parallaxRef({ multiplier: -120, from: 'top' })}>
  </>
)

```

the parallaxRef method accepts these options:

```ts
{
  multiplier?: number; // default: -60
  from?: 'center' | 'top'; // default: 'center'
}
```

## Performance

A single `window.onScroll` event is used per component. Parallax values are only calculated for elements that are in view (according to IntersectionObserver). Every observer is destroyed when no longer in use.

## Todo

- ✅ Use intersection observer to improve performance
- Typescript declarations
- Add `property` as an option
