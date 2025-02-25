# skelefy

A lightweight React component that adds a shimmer loading animation to your content while data is being fetched.

## Features

- Automatically applies loading animation to leaf elements
- Customizable animation speed, timing, and colors
- Preserves your component structure
- Type-safe with PropTypes
- Simple integration with existing React components

## Installation

Install via npm:

```bash
npm install skelefy
```

Or using yarn:

```bash
yarn add skelefy
```

## Usage

Wrap your components with the Placeholder component and control it with the isLoading prop:

```jsx
import Placeholder from 'skelefy';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Placeholder isLoading={isLoading}>
      <div className="card">
        <h2>Title</h2>
        <p>Some content here</p>
      </div>
    </Placeholder>
  );
}
```

## Custom Animation Configuration

You can customize the animation by passing an animationConfig object:

```jsx
<Placeholder
  isLoading={true}
  animationConfig={{
    speed: '2s',
    timing: 'ease-in-out',
    colors: ['#ddd', '#eee', '#ddd']
  }}
>
  <div>Your content</div>
</Placeholder>
```

## Props

| Prop            | Type     | Required | Default Value                          | Description                                      |
|-----------------|----------|----------|----------------------------------------|-------------------------------------------------|
| children        | node     | Yes      | -                                      | Content to be wrapped                            |
| isLoading       | boolean  | Yes      | -                                      | Toggles the loading animation                    |
| animationConfig | object   | No       | See below                             | Configuration for the animation                  |

### animationConfig Options

| Property | Type   | Default Value            | Description                                  |
|----------|--------|--------------------------|---------------------------------------------|
| speed    | string | '1.5s'                  | Animation duration                           |
| timing   | string | 'linear'                | Animation timing function                    |
| colors   | array  | ['#e0e0e0', '#f0f0f0', '#e0e0e0'] | Array of colors for gradient animation |

Supported timing values:
- linear
- ease
- ease-in
- ease-out
- ease-in-out
- step-start
- step-end
- steps(1,start)
- steps(1,end)
- cubic-bezier

## How It Works

1. The component traverses your component tree
2. When isLoading is true, it applies a shimmer animation to leaf elements
3. Leaf elements (those without nested components) get the loading class
4. Original classes and structure are preserved
5. Animation is removed when isLoading becomes false

## Example

```jsx
import React, { useState, useEffect } from 'react';
import Placeholder from 'skelefy';

function Example() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({ title: 'Loaded Title', content: 'Loaded Content' });
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Placeholder isLoading={isLoading}>
      <div className="post">
        <h1>{data?.title || 'Placeholder Title'}</h1>
        <p>{data?.content || 'Placeholder Content'}</p>
      </div>
    </Placeholder>
  );
}
```

## Styling

The loading animation uses a CSS gradient and keyframe animation. The loading class is appended to your existing classes, preserving your original styling.

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing-feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

Create an issue on GitHub for bug reports or feature requests.