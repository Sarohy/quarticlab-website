# Layout

The `Layout` component is the **persistent shell** that wraps every page on the site. It is applied once globally in `src/pages/_app.js`.

## Files

| File         | Description                    |
| ------------ | ------------------------------ |
| `Layout.jsx` | Main layout component          |
| `index.js`   | Re-exports `Layout` as default |

## Structure

```
┌─────────────────────────────┐
│           <Header />        │  ← Navigation bar (logo + nav links + contact button)
├─────────────────────────────┤
│          {children}         │  ← Page content rendered here
├─────────────────────────────┤
│           <Footer />        │  ← Footer (about, services, social links, copyright)
└─────────────────────────────┘
```

## Props

| Prop       | Type        | Description                         |
| ---------- | ----------- | ----------------------------------- |
| `children` | `ReactNode` | The page component to render inside |

## Usage

The layout is applied automatically to all pages via `_app.js`:

```jsx
// src/pages/_app.js
const Layout = dynamic(() => import("@component/Components/Layout"));

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

## Notes

- `Header` and `Footer` are imported from `CommonComponents` barrel export.
- The wrapping `div` uses the CSS class `content` (defined in `globals.css`) to ensure proper min-height and flex layout.
