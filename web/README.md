# Project setup with Next.js

## Using prettier, eslint and husky

### **Install next.js package**

`yarn create next-app --typescript`

### **Install prettier,husky and lint staged**

`yarn add -D --exact prettier eslint-config-prettier husky lint-staged`

---

### Add `src` folder at root level of folder

1. add all project related code into this folder
2. add this in `compilerOptions` in `tsconfig.json`
    ```
        "baseUrl": "./src",
            "paths": {
                "src/*": ["./src/*"]
        },
    ```

---

## **Material UI setup**

`yarn add @mui/material @mui/icons-material @emotion/styled @emotion/react notistack`

**_Inside `styles` folder add `createEmotionCache.ts`_**

```
import createCache from '@emotion/cache';

export default function createEmotionCache() {
	return createCache({ key: 'dealer-portal' });
}

```

where `'dealer-portal'` will be the name associated with the project

**_Inside `styles` folder add `theme.ts`_**

```
import { createTheme, ThemeOptions } from '@mui/material/styles'; // mui styles

const theme: ThemeOptions = createTheme({
	palette: {
		primary: {
			light: '#132F4C',
			main: '#001E3C',
		},
		secondary: {
			main: '#008f4f',
		},
		background: {
			default: '#ffffff',
		},
	},
	typography: {
		fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(
			','
		),
	},
});

export default theme;

```

---

## **Prettier config**

### create `.prettierrc` file in the root folder and add the following code

```
{
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": true,
    "useTabs": true,
    "jsxSingleQuote": true,
    "printWidth": 80
}
```

### create `.prettierignore` in the root folder and add following code

```
# ignore artifacts
/node_modules
```

### create `.vscode/settings.json` in root folder and add following code

```
{
	"editor.formatOnSave": true,
	"editor.formatOnPaste": true,
	"editor.defaultFormatter": "esbenp.prettier-vscode",
	"[javascript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[javascriptreact]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[typescriptreact]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"editor.codeActionsOnSave": {
		"source.fixAll.eslint": true,
		"source.fixAll.format": true
	},
	"editor.tabSize": 4
}

```

---

## **Eslint config**

### Add this inside `.eslintrc.json`

`"extends": ["eslint:recommended", "next/core-web-vitals", "prettier"]`

---

## **Husky and lint-staged config**

### open `package.json` file

1. add this line in `scripts` object

-   `"prepare": "husky install"`

2. then run `yarn prepare`

3. add this code as new object

```
"lint-staged": {
    "*.{js,jsx,ts,tsx}": [
        "next lint"
    ],
    "*.{html,js,jsx,ts,tsx}": [
        "prettier --write"
    ]
}
```

4. add this line in `scripts` object

-   `"precommit": "lint-staged"`

5. then run `npx husky add .husky/pre-commit "npm run precommit"` to add a pre-commit hook which will run `yarn precommit` on every git command

6. add `.lintstaged.js` file at root level

```
const path = require('path');

//
//  for using `lint-staged` package with next js
//  and in order to specify usage of the `--file` flag.
//

const buildEslintCommand = (filenames) =>
	`next lint --fix --file ${filenames
		.map((f) => path.relative(process.cwd(), f))
		.join(' --file ')}`;

module.exports = {
	'*.{js,jsx,ts,tsx}': [buildEslintCommand],
};

```
