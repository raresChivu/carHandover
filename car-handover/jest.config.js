module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testMatch: [
    "**/src/testing/**/*.test.ts",
    "**/src/testing/**/*.test.tsx",
    "**/src/testing/**/*.jest.test.ts",
    "**/src/testing/**/*.jest.test.tsx",
  ],
};
