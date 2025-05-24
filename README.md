# The challenge

## What is this project?

This project is a frontend test. The objective is to create a tire filter component that must be responsive and work on mobile devices.

## What should be done?

You must  create a tire filter component. The component has a search field, where the user can type the tire name and the component should filter the tires that contains the text typed in the name.

- The component should be responsive and work on mobile devices, the image below shows how should be the component appearance (for each result).
- A route was done mimicking a small API that returns a tire list.
- There was written 6 tests for the component, you should do the component pass in all tests.

## Expected result

![Component example](https://raw.githubusercontent.com/Pneufree/TesteReact/refs/heads/main/image.png)

## What will be evaluated?

- Code organization
- Code quality 
- responsiveness
- Component functionality
- Closest result from upper image
- Tests

**Obs.**: do **not** modify tests file (app/__tests__/products.test.js) and API file (app/api/products/route.ts)

## General instructions

- The Products.tsx component is where results should be shown.
- Exchange `<div>Produtos aqui</div>` for a component that shows the results. The following attribute should contain for each product item: `data-testid="product`
- You need to implement the search API that is on `/api/products` route and the tire filter.
- You can use any desired library, but remember to justify the library choice.
- Try use tailwindcss to style results component.
- When there's no results, show a 'Nenhum produto encontrado' message.

# The project structure

Mostly [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) with a bit of [Angular project structure](https://angular.dev/reference/configs/file-structure).

```
├── [...]
├── environments // Responsible to store environment-relationed configuration (e.g. API URL)
│   └── index.ts // Used index.ts bcs is a too simple application. Can vary according to domain to simplify identification (url.environment.ts, config.environment.ts etc.)
├── services 
│   └── index.ts
├── models 
│   └── index.ts
└── [...]
```

# Techniques used

- [Next.js image optimization](https://nextjs.org/docs/app/getting-started/images)
- [Debounce](https://medium.com/nerd-for-tech/debounce-your-search-react-input-optimization-fd270a8042b)
- [N-Grams](https://kavita-ganesan.com/what-are-n-grams/)
- [React Query caching](https://tanstack.com/query/v4/docs/framework/react/guides/caching)