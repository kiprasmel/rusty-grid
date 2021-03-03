# Post mortem

This is an overview of how the project went.

If you're looking for the project's specification / requirements, see [./SPECIFICATION.md](./SPECIFICATION.md).

## Rust... what?

It's been a little while since I wanted to learn rust. It just so happened that this project landed just in time, and I though - no better use of it than to learn me some rust! Here we are.

The decision of using rust has impacted further choices down the road - I'll do my best to explain my decision process.

Note - I used rust only for the shortest path finding algorithm (more on that later). But, some facts about rust's ecosystem itself impacted code outside of rust - let's dive into it:

### Why is the grid 1-dimensional?

The defacto rust <-> JS bindings library, `wasm-pack`, does not support 2-dimensional arrays / vectors / what-have-you. At first, I tried using a 2D grid in the TypeScript side and then convert / encode the 2D array into 1D when passing it to rust, and decode / convert it back afterwards. Turns out that that would add even more complexity, and so I decided to stick with 1D arrays all along -- this reduces complexity, provides uniformity between both TS & rust, and of course is more efficient both speed- and memory- wise.

The Redux store [wasn't particularly happy about this](https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions). But, [exceptions exist](https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data), and that's the route [I went with](./src/features/app/store.ts).

As for the developer experience with 1D vs 2D, I just created [a few utility functions](./src/features/grid/utils.ts) to smoothly convert between 1D and 2D indices, and so practically there's no difference apart from a tiny syntax change.

Before:

```ts
const square = grid[row][col];
```

After:

```ts
const square = grid[toIdx(row, col)];
```

and vice-versa, just with an opposite utility function.

Iteration was also fine:

```ts
grid.map((row) => {
	row.map((col) => {

	});
});
```

```ts
new Array(rows).fill(0).map((_, row) => {
	new Array(cols).fill(0).map((_, col) => {

	});
});
```

Overall, I conclude that these few change-ups cost way less than the case in which one would be converting to/from 2D -> 1D and back.

Of course, I could've just thrown rust out the window and done everything with typescript. But that just seemed too easy. Furthermore, it would've been a wasted opportunity to finally learn rust! These types of projects are supposed to be fun afterall!

## How did the project go overall?

I really enjoyed myself! Learning rust at first was quite an endeavour, though an exciting one. Having watched only a few talks and seen some people code in it, there were some pitfalls at first, but the documentation was great, the few folks who saw me [struggle live on twitch](http://twitch.tv/kiprasmel) were kind enough to point me to the right direction at times and I think I've figured the fundamentals out! The shortest-path algorithm seems to work now, doesn't it?

Talking about the algorithm - I choose to implement BFS - breadth first search. The [specification](./SPECIFICATION.md) hinted at using priority queues, which I suspect would be used to implement Dijkstra / SPFA, but there's no need to, since there aren't any weights, thus a simple BFS suffices just fine.

I did some modifications, though - by default, the start-to-end path would always end up being 2 straight lines without any "jiggling", and since we're optimising for excitement here, I was able to update it's neighbour-selection priority so that the path would end up as squiggly as possible, while still remaining the same length! For technical details, see the [implementation itself](./shortest-path/src/lib.rs).

Putting aside rust, I actually liked using redux. Now that hasn't happened in a while, but for a good reason - having had a not-so-enthusiastic opinion formed about it from my previous experiences, I was subconciously trying to avoid it. Turns out - unnecessarily -- contributors have renovated it from the ground up, and using it was so much better!

I did encouter some issues, still, though different ones -- this time it was from, perhaps, the over-convenience provided by default. The Immer library, in particular, was useful, but also annoying at times. The problem was that it would always wrap the values in my reducers, and everytime I needed to use a utility function that would consume a more complex type, I'd need to create an additional [`prepare`](https://redux-toolkit.js.org/usage/usage-with-typescript#defining-action-contents-with-prepare-callbacks) function that wasn't wrapping my values in Immer, and only there pass things into the reducer. Not ideal; quite annoying for the consumer, but nothing out of the ordinary, and most importantly - it worked. If not this - the experience'd be 10/10!

## Some highlights & other notes

### A grid bigger than 16x16 shall not pass!

At first, I was developing & testing things out only with the default `10x10` grid - everything seemed to work fine. However,  a bigger grid would get stuck, and after some trial and error, I found out that the shortest path would be computed just fine if the grid was sized at most `16x16`. Weird, huh?

Well, unlike in typescript, there isn't a single `number` type in rust - it's much more like C/C++/Go with types such as `u8`, `u16`, `i32`, etc.

The problem in my case was that I had the 1D array in which I stored the indices of the grid, and I marked it's type as `u8`. As you might've guessed by now, it can hold values only up to `255`. A grid that's `20x20`, or even `16x16`, will have a size of `>= 255`, and thus indices of `>= 254`. From the BFS function, I'm returning the resulting indices which are part of the shortest path, and, of course, such sized grids would cause an overflow and the function would never terminate or would report an incorrect / empty result. Lesson learned!

### The colors of the grid

I wanted the grid to look pretty, and it sadly didn't when I used the colors provided in the spec. So I changed them. Of course, one wouldn't do this in a serious project without mutual agreement, but this ain't even close!

### The `invert` button

I thought the intended way of "clearing" squares one-by-one was very boring, and so `Invert` it was.

I actually wanted to implement a dragging feature where you'd click+drag to change the state of a square (with good UX in mind). I got [pretty close](http://github.com/kiprasmel/rusty-grid/pull/1).

## Overall

Good stuff. 🦀🦀🦀
