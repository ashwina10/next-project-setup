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
