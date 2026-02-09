# Codebase Features Documentation

## ⚠️ Important Note

**Before pushing to git, make sure to remove the GitHub Actions workflow files from the `.github/` directory.** These files are typically for local development or CI/CD configuration and should not be committed to the repository unless specifically intended.

To remove them:

```bash
rm -rf .github/
# or
git rm -r .github/
```

## Overview

This is a Next.js application built with TypeScript, Tailwind CSS, and MongoDB. The codebase implements a unique API routing system that eliminates the need for repetitive fetch/axios calls by providing a type-safe, centralized action directory pattern.

## Key Features

### 1. **Action Directory System**

The core innovation of this codebase is the `actionsDirectory` function, which provides a type-safe, unified interface for making backend API calls. Instead of scattering fetch/axios calls throughout the codebase, all API interactions go through a centralized, type-safe directory.

### 2. **Next.js App Router**

- Uses Next.js 16 with the App Router architecture
- Server-side rendering and API routes support
- Dynamic catch-all route for handling action calls (`/api/[...path]`)

### 3. **Type-Safe API Communication**

- Full TypeScript support with strict typing
- Type-safe action definitions with automatic inference of arguments and return types
- Compile-time safety for API calls

### 4. **Site Lock Protection**

Built-in development site lock with passcode authentication. Protect your work-in-progress sites with a beautiful, modern lock page. The site lock automatically activates in development mode and requires a passcode to access the application. Features include:

- Beautiful, modern UI with clean design
- Passcode-based authentication with JWT token management
- Automatic cookie-based session management (24-hour expiration)
- Seamless integration with the `actionsDirectory` system
- Configurable via environment variables

**Usage**: Set `DEVELOPMENT_SITE_LOCK_PASSCODE` in your environment variables. The lock page will automatically appear when `isdev` is true and the user is not authenticated.

### 5. **Utility Functions**

- **Domain & IP Detection**: Smart domain and IP extraction utilities with automatic proxy detection. Supports Cloudflare (CF-Connecting-IP), X-Forwarded-For, X-Real-IP, X-Client-IP, and X-Forwarded headers. Includes development mode handling for consistent domain resolution.
- **Database connection**: MongoDB connection management with connection pooling
- **Misc utilities**: URL parameter encoding, development environment detection

### 6. **Reusable UI Components**

- **Input component**: Multi-purpose form input supporting text, email, password, textarea, select, async select, file upload, and button types
- **Typography component**: Consistent text styling

### 7. **Development Tools**

- **Turbopack**: Faster development with Next.js Turbopack
- **Tailwind CSS v4**: Modern styling with the latest Tailwind CSS
- **Smart Git Push**: Custom npm push script (`npm run push`) that streamlines your git workflow:
  - Automatically stages all changes (`git add .`)
  - Prompts for commit message interactively
  - Validates commit message (prevents empty commits)
  - Commits and pushes to remote in one command
  - Never commit empty messages again

**Usage**: Simply run `npm run push` and follow the prompts. The script will guide you through the entire git workflow.

## Deep Dive: `actionsDirectory` Function

### What is `actionsDirectory`?

`actionsDirectory` is a type-safe wrapper around axios that provides a centralized, consistent way to call backend APIs. Instead of writing `axios.post('/api/some-endpoint', data)` or `fetch('/api/some-endpoint', {...})` repeatedly throughout your codebase, you define actions once and call them through the directory.

### Architecture

The system consists of three key components:

1. **Actions Registry** (`utils/functions/actions.ts`): Defines available backend actions
2. **Actions Directory** (`utils/functions/actionsDirectory.ts`): Client-side function to call actions
3. **API Route Handler** (`app/api/[...path]/route.ts`): Server-side handler that executes actions

### How It Works

#### Step 1: Define Actions in `actions.ts`

Actions are defined in an array with a `name` and `handler` function:

```typescript
const actions = [
  {
    name: "enquire",
    handler: () => ({ message: "Hello, world!" }),
  },
] as const;
```

Each action:

- Has a unique `name` (used as the API endpoint)
- Contains a `handler` function that executes the backend logic
- Automatically gets typed for arguments and return values

#### Step 2: Type System Generation

The TypeScript types are automatically generated from the actions array:

```typescript
// Extracts action names: "enquire" | "another-action" | ...
export type DirectoryTypes = (typeof actions)[number]["name"];

// Creates a type map for each action's args and return type
export type FunctionMap = {
  [F in DirectoryTypes]: {
    args: Parameters<Extract<(typeof actions)[number], { name: F }>["handler"]>;
    returnType: Awaited<ReturnType<Extract<(typeof actions)[number], { name: F }>["handler"]>>;
  };
};
```

This ensures:

- You can only call actions that exist
- Arguments must match the handler's expected parameters
- Return types are correctly inferred

#### Step 3: Client-Side Calls with `actionsDirectory`

Instead of this:

```typescript
// ❌ Traditional approach - repetitive and error-prone
const response = await axios.post("/api/user/create", { name, email });
const data = response.data;
```

You write this:

```typescript
// ✅ Using actionsDirectory - type-safe and centralized
const response = await actionsDirectory("user-create", { name, email });
if (response.success) {
  const user = response.data; // Fully typed!
}
```

#### Step 4: API Route Handling

The catch-all route `/api/[...path]` receives requests:

- Converts URL path (e.g., `api/user-create`) to action name (`user-create`)
- Calls the corresponding action handler
- Returns standardized response format

### Key Benefits

#### 1. **Eliminates Repetition**

No more scattered `fetch()` or `axios.post()` calls. All API calls go through one function:

```typescript
// Before: Multiple fetch calls scattered everywhere
await fetch("/api/users", { method: "POST", body: JSON.stringify(data) });
await fetch("/api/products", { method: "GET" });
await axios.post("/api/orders", orderData);

// After: Single, consistent pattern
await actionsDirectory("users", data);
await actionsDirectory("products");
await actionsDirectory("orders", orderData);
```

#### 2. **Type Safety**

Full TypeScript support means:

- IDE autocomplete for available actions
- Compile-time checking of arguments
- Type inference for return values
- Catches errors before runtime

```typescript
// TypeScript knows exactly what arguments are expected
const result = await actionsDirectory("enquire", { name: "John" });
// TypeScript error if 'enquire' handler doesn't accept those arguments

// TypeScript knows the return type
if (result.success) {
  console.log(result.data.message); // ✅ Type-safe access
}
```

#### 3. **Consistent Error Handling**

All actions return a standardized response format:

```typescript
type ActionResponse<T> = { success: false; error: string } | { success: true; data: T };
```

This eliminates inconsistent error handling patterns across the codebase.

#### 4. **Automatic URL Conversion**

Action names with hyphens are automatically converted to URL paths:

- Action name: `user-create` → API path: `/api/user/create`
- Action name: `product-delete` → API path: `/api/product/delete`

#### 5. **Centralized API Logic**

All backend logic lives in one place (`actions.ts`), making it easy to:

- Find and modify API handlers
- Add logging or authentication middleware
- Update error handling globally
- Test all actions in one location

### Usage Examples

#### Example 1: Simple Action

```typescript
// In actions.ts
const actions = [
  {
    name: "get-user",
    handler: async (userId: string) => {
      // Backend logic here
      return { id: userId, name: "John Doe" };
    },
  },
] as const;

// In your component
const result = await actionsDirectory("get-user", "123");
if (result.success) {
  console.log(result.data.name); // "John Doe"
} else {
  console.error(result.error);
}
```

#### Example 2: Action with Multiple Parameters

```typescript
// In actions.ts
const actions = [
  {
    name: "create-order",
    handler: async (userId: string, items: string[], total: number) => {
      // Backend logic
      return { orderId: "order-123", status: "created" };
    },
  },
] as const;

// In your component
const result = await actionsDirectory("create-order", "user-123", ["item1", "item2"], 99.99);
```

#### Example 3: Action with Complex Data Types

```typescript
// In actions.ts
const actions = [
  {
    name: "update-profile",
    handler: async (data: { name: string; email: string; age?: number }) => {
      // Backend logic
      return { updated: true, timestamp: Date.now() };
    },
  },
] as const;

// In your component
const result = await actionsDirectory("update-profile", {
  name: "Jane",
  email: "jane@example.com",
  age: 30,
});
```

### Adding New Actions

To add a new action:

1. **Add to actions array** in `utils/functions/actions.ts`:

```typescript
const actions = [
  // ... existing actions
  {
    name: "send-email",
    handler: async (to: string, subject: string, body: string) => {
      // Your implementation
      return { sent: true, messageId: "msg-123" };
    },
  },
] as const;
```

2. **Use it anywhere** in your client-side code:

```typescript
const result = await actionsDirectory("send-email", "user@example.com", "Subject", "Body");
```

That's it! No need to:

- Create a new API route file
- Write fetch/axios boilerplate
- Define types manually
- Handle errors inconsistently

### Advanced Usage

#### Integration with Database

Actions can easily integrate with your database:

```typescript
import dbConnect from "@/utils/database/dbConnect";
import User from "@/models/User";

const actions = [
  {
    name: "get-users",
    handler: async () => {
      await dbConnect();
      const users = await User.find({});
      return users;
    },
  },
] as const;
```

#### Authentication & Authorization

You can add authentication checks in action handlers:

```typescript
import { headers } from "next/headers";

const actions = [
  {
    name: "get-private-data",
    handler: async () => {
      const headersList = await headers();
      const token = headersList.get("authorization");

      if (!token || !isValidToken(token)) {
        throw new Error("Unauthorized");
      }

      // Protected logic here
      return { data: "secret" };
    },
  },
] as const;
```

#### Error Handling

Actions automatically catch errors and return them in a consistent format:

```typescript
const actions = [
  {
    name: "risky-operation",
    handler: async () => {
      // If this throws, it's automatically caught and returned as:
      // { success: false, error: "error message" }
      throw new Error("Something went wrong");
    },
  },
] as const;
```

### Comparison: Traditional vs. ActionsDirectory

#### Traditional Approach

```typescript
// ❌ Multiple files with repetitive code
// components/UserForm.tsx
const createUser = async (data) => {
  try {
    const response = await axios.post("/api/user/create", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// components/ProductForm.tsx
const createProduct = async (data) => {
  try {
    const response = await fetch("/api/product/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Different error handling, different patterns, type-unsafe
```

#### ActionsDirectory Approach

```typescript
// ✅ Single pattern, type-safe, consistent
// components/UserForm.tsx
const result = await actionsDirectory("user-create", data);
if (!result.success) {
  // Handle error
}

// components/ProductForm.tsx
const result = await actionsDirectory("product-create", data);
if (!result.success) {
  // Same error handling pattern
}
```

### Best Practices

1. **Name actions clearly**: Use kebab-case (e.g., `get-user-profile`, `create-order`)
2. **Keep handlers focused**: Each action should do one thing well
3. **Use TypeScript types**: Leverage the automatic type inference
4. **Handle errors consistently**: Always check `response.success` before accessing `data`
5. **Document complex actions**: Add JSDoc comments for actions with non-obvious behavior

## Other Notable Features

### Database Integration

- MongoDB connection with mongoose
- Connection pooling and reuse
- Environment-based configuration

### Development Utilities

- **Domain & IP Detection**: Comprehensive utilities for extracting client information:
  - `getDomain()`: Extracts domain from request headers with development mode support
  - `getIP()`: Multi-header IP detection supporting Cloudflare, proxies, and various forwarding headers
  - Automatic fallback chain for maximum compatibility
- **Site Lock System**: Development site protection with passcode authentication
- **Development mode detection**: Environment-based development/production detection
- **Random data generation**: Chance.js integration for test data generation

## Conclusion

The `actionsDirectory` system is the standout feature of this codebase, providing a clean, type-safe, and maintainable approach to API communication. It eliminates boilerplate, ensures consistency, and leverages TypeScript's type system to catch errors at compile time.

By centralizing API calls through actions, this architecture makes the codebase more maintainable, testable, and scalable compared to traditional approaches with scattered fetch/axios calls.
