files: {
  "karma.conf.js": {
    "frameworks": ["jasmine"],
    "files": [
      "src/app/**/*.spec.ts"
    ],
    "preprocessors": {
      "**/*.ts": ["typescript"]
    },
    "typescriptPreprocessor": {
      "options": {
        "sourceMap": true
      }
    },
    "browsers": ["Chrome"],
    "singleRun": true
  }
}