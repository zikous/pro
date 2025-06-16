import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8000/graphql/",
  documents: [
    "./lib/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  ignoreNoDocuments: true, // Skip when no documents are found
  generates: {
    "./lib/generated/": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
        skipTypename: false,
        avoidOptionals: true,
        dedupeFragments: true,
      },
    },
  },
};

export default config;
