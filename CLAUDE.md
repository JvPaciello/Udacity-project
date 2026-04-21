# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start    # Development server (uses legacy OpenSSL provider via NODE_OPTIONS)
npm build    # Production build
npm test     # Run tests via react-scripts
```

## Architecture

**MyReads** is a book shelf management app (deployed at https://estante.vercel.app/) built with React 18, React Router 6, and a Udacity-provided Books REST API.

### Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `App.js` | Main page with three bookshelves |
| `/search` | `SearchPage.js` | Search for books and add to shelves |
| `/book/:id` | `BookDetail.js` | Full book info |

### Component tree

```
App           ← single source of truth (books[] state)
├── Bookshelf ← filters books by shelf, handles drop events
│   └── Book  ← card with dropdown + drag handle
└── SearchPage ← local query/results state, syncs shelf assignments with App
    └── Book
```

### State & data flow

- `App.js` owns the global `books` array fetched via `BooksAPI.getAll()` on mount.
- `onMove(book, shelf)` is passed as a prop down to `Book` and calls `BooksAPI.update()` then refreshes state.
- Optimistic updates: UI changes immediately; API call is async.
- `SearchPage` fetches results independently via `BooksAPI.search()` and merges shelf assignments from the global `books` state so existing shelves are reflected in search results.

### API layer (`src/BooksAPI.js`)

Base URL: `https://reactnd-books-api.udacity.com`. Auto-generates a UUID token stored in localStorage for authorization. Four exports: `get(id)`, `getAll()`, `update(book, shelf)`, `search(query)`.

### Drag and drop

`Bookshelf.js` implements an HTML5 drag-and-drop drop zone. `Book.js` sets the drag payload as `JSON.stringify(book)` and creates a custom drag image (book cover at 128×193 px). Dropping onto a shelf calls `onMove`.

### Book object shape

```js
{
  id: string,
  title: string,
  authors: string[],
  imageLinks: { thumbnail: string },
  shelf: "currentlyReading" | "wantToRead" | "read" | "none",
  // optional: publisher, publishedDate, description, ...
}
```

### Key dependencies

- **React Router DOM 6** — declarative routing; uses `useParams`, `useNavigate`
- **prop-types 15** — runtime PropTypes validation on `Book`
- No TypeScript, no global state library, no CSS preprocessor
