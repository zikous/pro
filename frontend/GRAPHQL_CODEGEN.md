# GraphQL Code Generator Usage

This project uses GraphQL Code Generator to automatically generate TypeScript types from the GraphQL schema and operations.

## Benefits

- Type safety for GraphQL queries and mutations
- Auto-completion for GraphQL operations
- Reduced manual work for updating types
- Automatic generation of React hooks for GraphQL operations

## When to Run Code Generator

Run the code generator:

1. When you add or modify GraphQL queries or mutations
2. When the backend schema changes
3. After pulling changes that include GraphQL operations modifications

## How to Run

```bash
# From the frontend directory
npm run codegen
```

## File Structure

- `/lib/graphql/operations.ts` - Contains all GraphQL queries and mutations
- `/lib/generated/` - Contains all generated TypeScript types and hooks
- `/lib/graphql/index.ts` - Exports all GraphQL operations and generated types

## Usage in Components

Import from the generated files:

```typescript
// Import operations
import { ME_QUERY, LOGIN_MUTATION } from "@/lib/graphql/operations";

// Import generated types
import { UserType, MeQuery, TokenAuthMutation } from "@/lib/generated/graphql";

// Use with Apollo Client
const [loginMutation] = useMutation<TokenAuthMutation>(LOGIN_MUTATION);
const { data, loading } = useQuery<MeQuery>(ME_QUERY);
```

## Updating GraphQL Operations

1. Modify the GraphQL operation in `/lib/graphql/operations.ts`
2. Run `npm run codegen` to generate updated types
3. Update your components to use the new types if needed
