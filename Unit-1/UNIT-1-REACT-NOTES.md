# Unit 1 React and JavaScript Notes

These notes explain the React, JavaScript, browser, and tooling concepts used in the projects inside `Unit-1/1.1`, `Unit-1/1.2`, `Unit-1/1.3`, and `Unit-1/1.4`.

The lessons build on each other:

1. **1.1:** Build pages from components and props.
2. **1.2:** Add changing data with state, forms, and API calls.
3. **1.3:** Add pages and navigation with React Router.
4. **1.4:** Combine everything into useful student applications.

---

## 1. React Basics

### What is React?

React is a JavaScript library for building user interfaces. Instead of writing one large HTML page, we split the interface into small reusable pieces called **components**.

For example, a student application can be divided into:

- `Header`
- `Sidebar`
- `StudentList`
- `StudentCard`
- `Footer`

Each component can have its own markup, data, and behavior.

### Components

A component is usually a JavaScript function that returns JSX.

```jsx
function Welcome() {
  return <h1>Welcome to the student app</h1>;
}
```

Component names start with a capital letter. React treats lowercase names as normal HTML tags.

A component can be used inside another component:

```jsx
function App() {
  return (
    <main>
      <Welcome />
    </main>
  );
}
```

This is called **component composition**: larger components are made by combining smaller components.

### Functional components

All the Unit-1 screens use functional components. A functional component is just a function that returns UI.

This style is preferred in modern React because hooks such as `useState` and `useEffect` work inside functions.

### JSX

JSX looks like HTML, but it is written inside JavaScript. React converts it into browser elements.

```jsx
const name = 'Manu';

return <p>Hello, {name}</p>;
```

Important JSX rules:

- Return one parent element, or use a fragment: `<>...</>`.
- Use `className` instead of HTML's `class`.
- Close all elements, including `<input />`.
- Put JavaScript expressions inside `{}`.
- Use camelCase event names such as `onClick` and `onChange`.

### JSX expressions

Anything that produces a value can be placed inside `{}`:

```jsx
<p>Students: {students.length}</p>
<p>{isLoggedIn ? 'Logout' : 'Login'}</p>
```

Statements such as `if` and `for` do not go directly inside JSX. Use them before the `return`, or use expressions such as a ternary or `.map()`.

### `main.jsx` and `createRoot`

Each Vite React project has an entry file, normally `src/main.jsx`. It connects React to the HTML element in `index.html`.

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- `document.getElementById('root')` finds the empty HTML container.
- `createRoot` creates a React root.
- `.render()` displays the React application.
- `StrictMode` helps find possible problems during development. It does not create a visible part of the page.

### Imports and exports

Files can share components and data through ES modules.

```jsx
// StudentCard.jsx
export default function StudentCard() {
  return <article>Student</article>;
}

// App.jsx
import StudentCard from './components/StudentCard.jsx';
```

`export default` provides the main value from a file. Named exports use braces:

```js
export function calculateGrade(mark) {
  return mark >= 40 ? 'Pass' : 'Fail';
}

import { calculateGrade } from './studentUtils.js';
```

---

## 2. 1.1: Components, Props, and Lists

### Static data

The Easy exercise displays fixed values directly in JSX. This is useful for learning the shape of a component before adding interactivity.

```jsx
function StudentProfile() {
  return (
    <section>
      <h2>Student Profile</h2>
      <p>Name: Manu</p>
      <p>Course: Full Stack Development</p>
    </section>
  );
}
```

### Props

**Props** are values passed from a parent component to a child component. They are like function arguments.

```jsx
function StudentCard({ name, course, age }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{course}</p>
      <p>{age} years old</p>
    </article>
  );
}

<StudentCard name="Manu" course="React" age={21} />
```

Props are read-only. The child should not directly change them. If data must change, keep the state in a suitable parent and pass a callback down.

### Destructuring props

This is a shorter way to take values from the props object:

```jsx
function StudentCard({ name, course }) {
  // Instead of props.name and props.course
  return <p>{name} studies {course}</p>;
}
```

### Passing an object with spread syntax

The Medium exercise passes every property of a student object to a card:

```jsx
const student = { name: 'Manu', course: 'React', age: 21 };

<StudentCard {...student} />
```

This is equivalent to:

```jsx
<StudentCard
  name={student.name}
  course={student.course}
  age={student.age}
/>
```

Use this when the object properties match the component's expected prop names.

### Rendering lists with `.map()`

`.map()` creates a new array by running a function for every item. React commonly uses it to turn data into elements.

```jsx
const students = [
  { id: 1, name: 'Manu' },
  { id: 2, name: 'Shivam' },
];

return (
  <ul>
    {students.map((student) => (
      <li key={student.id}>{student.name}</li>
    ))}
  </ul>
);
```

### Why React needs `key`

A `key` gives each list item a stable identity. React uses it to understand which item was added, removed, or changed.

Use a real unique ID when possible:

```jsx
key={student.id}
```

Avoid using the array index as a key when items can be reordered or deleted.

### Nested components and page structure

The Hard exercise separates the page into `Header`, `Sidebar`, `StudentList`, and `Footer`. This makes each part easier to read, reuse, and change.

Semantic HTML elements communicate meaning:

- `<header>`: introductory or top content
- `<nav>`: navigation links
- `<main>`: the main page content
- `<section>`: a related group of content
- `<footer>`: bottom information
- `<table>`: rows and columns of data

---

## 3. 1.2: State, Events, Forms, and Effects

### State with `useState`

State is data that can change while the application is running. When state changes, React renders the component again.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

- `count` is the current value.
- `setCount` changes the value.
- `useState(0)` gives the initial value.
- Calling the setter asks React to render again.

Do not change state directly:

```jsx
// Wrong
count = count + 1;

// Correct
setCount(count + 1);
```

### Functional state updates

When a new value depends on the previous value, use an updater function:

```jsx
setCount((currentCount) => currentCount + 1);
```

This is especially useful when several updates may happen close together.

### Events

React event handlers respond to user actions:

```jsx
<button onClick={handleClick}>Add</button>
<input onChange={handleChange} />
<form onSubmit={handleSubmit}>...</form>
```

Pass the function, do not call it while rendering:

```jsx
// Correct
<button onClick={handleClick}>Save</button>

// Usually wrong: runs immediately during render
<button onClick={handleClick()}>Save</button>
```

### Conditional rendering

Show different UI depending on a condition.

Ternary operator:

```jsx
{isLoggedIn ? <p>Welcome back</p> : <p>Please log in</p>}
```

Logical AND:

```jsx
{error && <p className="error">{error}</p>}
```

Early return:

```jsx
if (!student) {
  return <p>Student not found.</p>;
}
```

The Unit-1 apps use these patterns for login screens, empty lists, error messages, loading messages, and not-found pages.

### Conditional styling

A class or style can depend on state:

```jsx
<p className={count < 0 ? 'negative' : 'positive'}>
  {count}
</p>
```

Inline styles are JavaScript objects. CSS property names use camelCase:

```jsx
const buttonStyle = {
  opacity: disabled ? 0.5 : 1,
  transition: 'opacity 200ms ease',
};

<button style={buttonStyle}>Save</button>
```

Object spread copies an object and lets you override selected values:

```jsx
style={{ ...buttonStyle, opacity: 1 }}
```

### Controlled form inputs

A controlled input gets its value from React state. React becomes the source of truth.

```jsx
const [form, setForm] = useState({ name: '', email: '' });

<input
  name="name"
  value={form.name}
  onChange={handleChange}
/>
```

The change handler updates state:

```jsx
function handleChange(event) {
  const { name, value } = event.target;

  setForm((currentForm) => ({
    ...currentForm,
    [name]: value,
  }));
}
```

Important ideas:

- `event.target` is the input that changed.
- `name` identifies which field changed.
- `value` is the new text.
- `[name]` is a computed property name, so the same handler works for many fields.
- The spread keeps the other form fields.

### Form submission

```jsx
function handleSubmit(event) {
  event.preventDefault();
  // Validate and use the form data here
}
```

`preventDefault()` stops the browser from reloading the page after a normal HTML form submission.

HTML validation attributes provide basic browser validation:

```jsx
<input required />
<input type="number" min="0" max="100" />
```

The Hard 1.4 form also uses `noValidate` when the application wants to display its own validation messages.

### `useEffect`

`useEffect` runs code after React has rendered. It is used for work outside the normal render calculation, called a **side effect**.

Examples from Unit 1:

- Fetching data from an API
- Saving data to `localStorage`

```jsx
useEffect(() => {
  // Side-effect work
}, []);
```

The dependency array controls when the effect runs:

- `[]`: run after the component mounts.
- `[searchTerm]`: run when `searchTerm` changes.
- No array: run after every render, so use it carefully.

### Fetching API data

The 1.2 Hard project fetches student-like records from JSONPlaceholder.

```jsx
useEffect(() => {
  async function loadStudents() {
    try {
      const response = await fetch('https://example.com/students');

      if (!response.ok) {
        throw new Error('Could not load students');
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  loadStudents();
}, []);
```

Concepts in this example:

- `async` allows the function to use `await`.
- `await` waits for a Promise to finish.
- `fetch` makes an HTTP request.
- `response.ok` checks whether the HTTP request succeeded.
- `response.json()` converts JSON response data into JavaScript values.
- `try/catch` handles failures.
- `finally` runs whether the request succeeds or fails.

A good network screen normally has three states:

1. Loading: show a loading message.
2. Error: show what went wrong.
3. Success: show the data.

### Transforming API data

API data does not always have the exact shape the UI wants. The app can map it into a simpler model:

```js
const students = users.map((user) => ({
  id: user.id,
  name: user.name,
  city: user.address.city,
}));
```

`user.address.city` is nested object access.

### Search filtering

The API project filters records with `.filter()`, `.toLowerCase()`, and `.includes()`:

```js
const visibleStudents = students.filter((student) =>
  student.name.toLowerCase().includes(searchTerm.toLowerCase()),
);
```

- `.filter()` keeps items that pass a condition.
- `.toLowerCase()` makes matching case-insensitive.
- `.includes()` checks whether one string contains another.

---

## 4. 1.3: React Router

### Why routing is needed

A normal multi-page website loads a new HTML page for each URL. A React single-page application keeps one page loaded and changes the displayed component as the URL changes.

React Router connects URLs to React components.

### `BrowserRouter`, `Routes`, and `Route`

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```

- `BrowserRouter` enables routing using the browser URL.
- `Routes` chooses the best matching route.
- `Route` maps a URL pattern to an element.
- `element={<Home />}` tells React what to render.

### `Link` and `NavLink`

Use `Link` instead of a normal anchor for internal routes:

```jsx
<Link to="/about">About</Link>
```

`Link` changes the URL without a full page reload.

`NavLink` is useful for navigation menus because it knows whether its route is active:

```jsx
<NavLink
  to="/students"
  className={({ isActive }) => (isActive ? 'active' : '')}
>
  Students
</NavLink>
```

### Redirects and wildcard routes

A wildcard route catches URLs that do not match another route:

```jsx
<Route path="*" element={<Navigate to="/" replace />} />
```

`Navigate` changes the URL from inside a component. `replace` avoids leaving the invalid URL in the browser history.

A 404 page can also be rendered instead of redirecting:

```jsx
<Route path="*" element={<NotFound />} />
```

### Dynamic routes and `useParams`

A route can contain a variable part:

```jsx
<Route path="/students/:studentId" element={<StudentDetail />} />
```

Inside the detail component:

```jsx
const { studentId } = useParams();
const student = students.find(
  (item) => item.id === Number(studentId),
);
```

URL parameters arrive as strings, so convert them to numbers when the data uses numeric IDs.

If `.find()` returns `undefined`, show a not-found message instead of trying to render missing data.

### Nested routes and `Outlet`

Nested routes share a layout:

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="users" element={<Users />} />
</Route>
```

The layout renders the child route through `Outlet`:

```jsx
function DashboardLayout() {
  return (
    <div>
      <DashboardNav />
      <Outlet />
    </div>
  );
}
```

An `index` route is the default child route. In this example, `/dashboard` displays `DashboardHome`.

### `useNavigate`

`useNavigate` changes routes from JavaScript, which is useful after an action such as login or form submission:

```jsx
const navigate = useNavigate();

function handleLogin() {
  // Check credentials...
  navigate('/dashboard');
}
```

Use `Link` or `NavLink` for visible navigation. Use `useNavigate` for navigation caused by an event or completed operation.

### Protected routes

The 1.3 Hard project uses a reusable route guard:

```jsx
function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

The idea is simple: check authentication before displaying private content. The login state lives in a parent component and is passed to the guard.

This is only frontend route protection. A real application must also protect data on the server.

---

## 5. 1.4 Easy: Tables and Reusable Rows

The Easy project renders student data in a table.

Important table elements:

- `<table>`: the table
- `<thead>`: heading rows
- `<tbody>`: data rows
- `<tr>`: a row
- `<th>`: a heading cell
- `<td>`: a normal data cell

A reusable row component keeps table code clean:

```jsx
function StudentRecord({ student }) {
  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.course}</td>
    </tr>
  );
}
```

The parent can render one row for every student:

```jsx
<tbody>
  {students.map((student) => (
    <StudentRecord key={student.id} student={student} />
  ))}
</tbody>
```

This repeats the 1.1 ideas of props, components, `.map()`, and keys in a more realistic UI.

---

## 6. 1.4 Medium: Search, Filters, Grades, and Sorting

### Derived data

Derived data is calculated from existing data instead of stored separately.

For example, a grade can be calculated from a mark:

```js
function getGrade(mark) {
  if (mark >= 80) return 'A';
  if (mark >= 60) return 'B';
  if (mark >= 40) return 'C';
  return 'F';
}
```

A pure helper function gives the same output for the same input and does not change outside data.

### Search across fields

The Medium app searches several student fields:

```js
const query = searchTerm.trim().toLowerCase();

const filteredStudents = students.filter((student) => {
  return [student.name, student.department, student.email]
    .some((field) => field.toLowerCase().includes(query));
});
```

`trim()` removes unnecessary spaces. Searching normalized lowercase values makes the search more friendly.

### Filter by a calculated value

Because grade is derived from marks, filtering by grade can reuse the helper:

```js
const result = students.filter(
  (student) => getGrade(student.mark) === selectedGrade,
);
```

### Sorting without mutating state

JavaScript `.sort()` changes the original array. React state should be treated as immutable, so copy the array first:

```js
const sortedStudents = [...filteredStudents].sort((first, second) =>
  first.name.localeCompare(second.name),
);
```

- `[...filteredStudents]` creates a shallow copy.
- `.sort()` orders the copy.
- `localeCompare()` compares strings in a language-aware way.

### Ascending and descending order

A boolean state can control sort direction:

```jsx
const [ascending, setAscending] = useState(true);

setAscending((currentValue) => !currentValue);
```

A functional updater is useful because the new value depends on the previous value.

### Empty states

Always handle the case where filtering returns no records:

```jsx
{filteredStudents.length === 0 && (
  <p>No students match the current filters.</p>
)}
```

Inside a table, an empty row can use `colSpan` to cover all columns.

---

## 7. 1.4 Hard: Context, Custom Hooks, Persistence, and CRUD

The Hard project is a complete Student Management System. It combines routing, forms, tables, filters, shared state, and browser storage.

### Context

Context shares values with many components without passing props through every intermediate component.

Create a context:

```jsx
const StudentContext = createContext(null);
```

Provide a value near the top of the application:

```jsx
<StudentContext.Provider value={contextValue}>
  {children}
</StudentContext.Provider>
```

Read the value in a child:

```jsx
const value = useContext(StudentContext);
```

Use context when many screens need the same data, such as the student list, dashboard counts, and edit page.

### A custom hook

The project wraps `useContext` in a custom hook:

```jsx
function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error('useStudents must be used inside StudentProvider');
  }

  return context;
}
```

A custom hook is a reusable function whose name starts with `use`. It hides setup details and gives components a clean API.

### Provider composition

`StudentProvider` owns the student state and provides operations such as:

- `addStudent`
- `updateStudent`
- `deleteStudent`
- `getStudentById`

This keeps data management in one place while pages focus on displaying the UI.

### Lazy state initialization

The project loads saved students only when the state is initialized:

```jsx
const [students, setStudents] = useState(loadStudents);
```

Passing the function itself tells React to call it for the initial value. This avoids calling the loader on every render.

### `localStorage`

`localStorage` stores text in the browser and survives page refreshes.

```js
localStorage.setItem('students', JSON.stringify(students));
const savedStudents = JSON.parse(localStorage.getItem('students'));
```

- `JSON.stringify()` converts JavaScript data into text.
- `JSON.parse()` converts text back into JavaScript data.
- `getItem()` reads a value.
- `setItem()` saves a value.

Storage can be empty or contain invalid data, so the project falls back to seed data when loading fails.

An effect persists changes:

```jsx
useEffect(() => {
  localStorage.setItem('students', JSON.stringify(students));
}, [students]);
```

### CRUD

CRUD means the four common data operations:

- **Create:** add a student
- **Read:** display or find students
- **Update:** edit a student
- **Delete:** remove a student

Immutable updates look like this:

```js
setStudents((currentStudents) => [newStudent, ...currentStudents]);

setStudents((currentStudents) =>
  currentStudents.map((student) =>
    student.id === updatedStudent.id ? updatedStudent : student,
  ),
);

setStudents((currentStudents) =>
  currentStudents.filter((student) => student.id !== studentId),
);
```

- `.map()` replaces one matching item.
- `.filter()` removes an item.
- A new array is created each time, so React can detect the change.

### IDs

The project uses `crypto.randomUUID()` to create a unique ID, with a `Date.now()` fallback. Stable IDs are important for database-like records and React list keys.

### `useMemo`

`useMemo` remembers a calculated value until its dependencies change.

It is used in the Hard project for values such as:

- The context value object
- Unique department and year options
- Filtered and sorted results

```jsx
const departments = useMemo(() => {
  return [...new Set(students.map((student) => student.department))];
}, [students]);
```

`useMemo` is an optimization, not a replacement for correct state or effects. The calculation must still be correct without relying on the cache.

### `Set` for unique values

A `Set` stores unique values:

```js
const uniqueDepartments = [...new Set(students.map(
  (student) => student.department,
))];
```

The spread turns the Set back into an array for rendering.

### Dashboard calculations

The dashboard derives statistics from the student array.

- `.filter()` counts records matching a condition.
- `.reduce()` combines many values into one total.
- `.slice()` takes a limited portion, such as recent students.
- `Number()` converts numeric text into a number.

Example:

```js
const totalMarks = students.reduce(
  (total, student) => total + Number(student.mark),
  0,
);
```

### Reusable create and edit forms

The same form can support two modes:

- Create mode starts with empty values.
- Edit mode starts with `initialValues`.

A `mode` prop tells the form which operation is active. This avoids writing two almost-identical forms.

### Validation and normalized input

Validation checks that data is usable before saving it:

```js
const name = form.name.trim();

if (!name) {
  setError('Name is required');
  return;
}
```

Normalization makes data consistent. For example, trimming a name removes accidental spaces.

The project stores an error in state and conditionally displays it. This lets the user correct the form without losing the entered values.

### Confirmation before deletion

```js
if (window.confirm('Delete this student?')) {
  deleteStudent(studentId);
}
```

`window.confirm()` opens a browser confirmation dialog and returns `true` or `false`.

### Dates

`Date.toLocaleDateString()` converts a date into a readable local date:

```js
new Date(student.createdAt).toLocaleDateString()
```

### Route parameters and post-submit navigation

The Hard project uses routes such as `/students/:studentId/edit`. It reads the ID with `useParams`, updates the student, and then uses `useNavigate` to return to the list or detail page.

---

## 8. JavaScript Concepts Used Throughout Unit 1

### Arrays and objects

Student records are objects stored in arrays:

```js
const student = {
  id: 1,
  name: 'Manu',
  marks: 85,
};

const students = [student];
```

### Arrow functions

Arrow functions are short functions used heavily in React callbacks:

```js
const double = (number) => number * 2;
```

They appear in `.map()`, `.filter()`, event handlers, and state updater functions.

### Destructuring

Destructuring extracts values:

```js
const { name, email } = student;
const [firstStudent, secondStudent] = students;
```

### Spread syntax

Spread copies array or object values:

```js
const updatedStudent = { ...student, marks: 90 };
const nextStudents = [...students, newStudent];
```

This supports immutable React updates.

### Template literals

Backticks create strings that can include expressions:

```js
const message = `Hello, ${name}`;
```

### Common array methods

- `.map()`: transform every item
- `.filter()`: keep matching items
- `.find()`: get the first matching item
- `.sort()`: order items, mutates the array
- `.reduce()`: combine items into one value
- `.some()`: check whether at least one item matches
- `.slice()`: copy a section without changing the original

### Immutability

In React, do not directly modify arrays and objects held in state. Create new arrays or objects instead. This makes changes predictable and allows React to notice that the state reference changed.

### `try/catch/finally`

These statements handle code that may fail:

```js
try {
  // Code that may fail
} catch (error) {
  // Error handling
} finally {
  // Always runs
}
```

The Unit-1 API and storage code uses this for network errors and malformed saved data.

---

## 9. HTML and Accessibility Concepts

The projects use normal HTML elements inside JSX:

- Forms with labels and inputs
- Buttons for actions
- Select boxes for options
- Tables for tabular data
- Semantic layout elements

A label should identify its input. Buttons should perform actions, while links should navigate. The router navigation includes `aria-label` where a navigation region needs an accessible name.

Semantic HTML helps browsers, screen readers, and search engines understand the page.

---

## 10. CSS and Styling Concepts

Each Vite app imports CSS from `App.jsx` or `main.jsx`.

The projects use:

- Class selectors such as `className="student-card"`
- Layout with flexbox and grid
- Responsive sizing
- Tables, forms, buttons, and navigation styles
- Conditional classes for active, error, loading, and result states
- Inline style objects for small state-dependent changes
- CSS transitions for smooth visual changes

CSS and React have separate jobs: React decides what should be displayed, while CSS decides how it should look.

---

## 11. Vite, npm, and ESLint

### Vite

Vite is the development tool used by these projects.

Common commands inside a lesson folder:

```bash
npm install
npm run dev
npm run build
npm run preview
```

- `npm install` installs dependencies.
- `npm run dev` starts the development server with fast refresh.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.

### Hot Module Replacement

Vite's HMR updates the browser when source files change, often without a full page refresh.

### `@vitejs/plugin-react`

The Vite configuration uses the official React plugin. It enables React support and development features such as Fast Refresh.

### ESLint

ESLint checks JavaScript and React code for common mistakes and style problems. The configurations include browser globals, React Hooks rules, and React Refresh rules in projects that have an ESLint configuration.

### React Compiler and TypeScript

The provided Unit-1 READMEs state that the React Compiler is not enabled. These projects use JavaScript and JSX, not TypeScript. They also do not use a test framework or an external state-management library.

---

## 12. Quick Revision Map

| Concept | First important use |
| --- | --- |
| JSX and functional components | 1.1 Easy |
| Component composition | 1.1 Easy and Hard |
| Props and destructuring | 1.1 Medium |
| Lists and `key` | 1.1 Medium |
| `useState` | 1.2 Easy |
| Events and conditional rendering | 1.2 Easy |
| Controlled forms | 1.2 Medium |
| `useEffect` and `fetch` | 1.2 Hard |
| React Router | 1.3 Easy |
| Dynamic routes and `useParams` | 1.3 Medium |
| Protected and nested routes | 1.3 Hard |
| Tables and reusable rows | 1.4 Easy |
| Filtering and sorting | 1.4 Medium |
| Context and custom hooks | 1.4 Hard |
| `localStorage` and CRUD | 1.4 Hard |
| `useMemo` and derived dashboard data | 1.4 Hard |

## The main idea

React applications are built by combining a few core ideas:

1. Components describe pieces of the interface.
2. Props pass information into components.
3. State stores information that can change.
4. Events change state in response to the user.
5. Effects communicate with the outside world.
6. Router components display different screens for different URLs.
7. Context shares important data across many screens.
8. JavaScript array methods turn application data into visible UI.

Once these ideas are clear, the larger applications in Unit 1 become combinations of the same small building blocks.
