This is a simple prescriptions application with 2 pages - prescriptions list and prescription details

## Getting Started

For local development:

```bash
npm i & npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Brief overview

This application includes custom hooks, components, contexts, stub api actions.

Application's architecture is set up to be modular and scalable. Pretty much every single directory under `src/` is meant to contain reusable items to help you build application faster, cleaner and have one source of truth

`src/components`, `src/hooks` - Reusable UI components (e.g. Page wrapper)
`src/hooks` - Custom hooks
`src/contexts` - React providers
`src/types` - Centralized types. As explained in one comment, these types ideally could be shared with backend via contracts library
`src/utils` - Utility functions
`src/styles` - Style related dir, currently contains MUI theme
`src/apiActions` - API related logic. Currently has prescription api call stubs, but I imagine certain endpoints could be called numerous times in different places, thus having all your api actions in one place seems reduces risk of errors if payload/query/response/slugs changes

Every dir has index.ts files for barrel exports to have single sources.

`PaginationContext` is set up in the way you could pass an api call to it and forget managing state manually, hence a good approach to scale if application needs more paginated lists.

For accessibility in this application, I rely on MUI components, semantic HTML when possible and labeling components when necessary. MUI is quite accessible out of the box and provides proper keyboard navigation using tab button or arrow keys. One area of improvement could be aria labels, double checking colour contrasts in case of colour-blind users (consult WCAG contrast ratios).

## Real world extension

In a real world scenario, I would add some sort of navigation - be it header or aside nav. Core routes/links would be within that navigation e.g. `Your prescriptions`, `Profile`, `Medicines`, `Shipping` etc. Different pages/views would be stored under `src/app`, alongside `prescriptions`. 

`Page.tsx` (under `src/componens`) could ensure that every page looks identical in terms of heading, paddings.

For more control over the state I'd create `AuthContext` to manage profile information of the user.

Possible extension could happen in the field of localisation, I'd use `react-i18next` (or similar lib) to manage translations and possibly create some sort of `LanguageContext` to manage selected language and pretty much everything related to localisations (e.g. tr() function could be stored in the context rather than imported from the lib directly, once again, to have a single source of truth with possibility of extending functionality).

In regards to style, I'd add tailwind config with defined breakpoints, colour palletes, fonts etc., to have centralised styling.
