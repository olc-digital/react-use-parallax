# React useParallax hook (Beta)

A simple hook for easily implementing Parallax.

```js
const parallaxRef = useParallax();

return (
  <>
    <div ref={parallaxRef()} />
    <img ref={parallaxRef({ multiplier: -120 })}>
  </>

```

the parallaxRef method accepts these options:

```ts
{
  multiplier: number;
}
```

#### Todo

- Use intersection observer to improve performance
- Typescript declarations
- Add `property` as an option
