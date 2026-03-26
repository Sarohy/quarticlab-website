# Utils

Shared utility functions and URL configuration used throughout the application.

## Files

### `helpers.js`

General-purpose helper functions.

| Function              | Signature                          | Description                                                  |
|-----------------------|------------------------------------|--------------------------------------------------------------|
| `isValidEmail`        | `(email: string) => boolean`       | Validates an email string using a regex pattern.             |
| `groupArrayElements`  | `(arr: any[], size: number) => any[][]` | Splits a flat array into chunks of the given size.      |

**Example:**
```js
import { isValidEmail, groupArrayElements } from "@component/utils/helpers";

isValidEmail("user@example.com");        // true
groupArrayElements([1,2,3,4,5], 2);      // [[1,2],[3,4],[5]]
```

---

### `urls.js`

Centralised URL and title definitions for all service pages. Used when navigating to a service detail route.

```js
import { urls } from "@component/utils/urls";

urls.services.WebApp.url    // "/services/web-development"
urls.services.WebApp.title  // "Web Development"
```

| Key          | URL                                                    | Title                                    |
|--------------|--------------------------------------------------------|------------------------------------------|
| `BC`         | `/services/blockchain-development`                     | Blockchain Development                   |
| `DevOPS`     | `/services/DevOps & Cloud`                             | DevOps & Cloud                           |
| `WebApp`     | `/services/web-development`                            | Web Development                          |
| `MobileApp`  | `/services/mobile-app-development`                     | Mobile App Development                   |
| `UIUX`       | `/services/uiux-development`                           | UI & UX Development                      |
| `GD`         | `/services/game-development`                           | Game Development                         |
| `IoT`        | `/services/iot-devices`                                | IOT Devices                              |
| `AI`         | `/services/artificial-intelligence-machine-learning`   | Artificial Intelligence & Machine Learning |
| `Ecommerce`  | `services/E-commerce Development`                      | E-commerce Development                   |
