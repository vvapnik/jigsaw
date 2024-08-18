/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */


const config = {
    clearMocks: true,
    coverageProvider: "v8",
    extensionsToTreatAsEsm: [".ts", ".m.ts", ".spec.ts"],
    "transform": {
        "^.+\\.(mt|t|cj|j)s$": [
            "ts-jest",
            {
                tsonfig: 'tsconfig.spec.json'
            }
        ]
    }
};

export default config;
