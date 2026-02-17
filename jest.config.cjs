const nextJest = require("next/jest.js");

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^remark-gfm$": "<rootDir>/__mocks__/remark-gfm.js",
        "^rehype-highlight$": "<rootDir>/__mocks__/rehype-highlight.js",
        "^rehype-slug$": "<rootDir>/__mocks__/rehype-slug.js",
    },
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
    testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
    collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/app/layout.tsx"],
};

module.exports = createJestConfig(config);
