/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],
  // Mirror tsconfig's `baseUrl: "src"` so bare imports like
  // `controllers/routes` resolve the same way they do in the build.
  moduleNameMapper: {
    "^(controllers|middlewares|utils|data)/(.*)$": "<rootDir>/src/$1/$2",
  },
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        // Compile to CommonJS for Jest regardless of the NodeNext setting in
        // tsconfig.json (which targets the Workers/ESM build).
        tsconfig: {
          module: "commonjs",
          esModuleInterop: true,
          isolatedModules: true,
        },
      },
    ],
  },
};
