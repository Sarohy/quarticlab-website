# Firebase

Handles all Firebase configuration and Firestore database operations for the Zweidevs platform.

## Files

### `firebaseConfig.js`
Exports the Firebase app configuration object. All sensitive keys are loaded from environment variables — **never hardcoded**.

| Config Key          | Env Variable                          |
|---------------------|---------------------------------------|
| `apiKey`            | `NEXT_PUBLIC_apiKey`                  |
| `authDomain`        | `NEXT_PUBLIC_authDomain`              |
| `projectId`         | `NEXT_PUBLIC_projectId`               |
| `storageBucket`     | `NEXT_PUBLIC_storageBucket`           |
| `messagingSenderId` | `NEXT_PUBLIC_messagingSenderId`       |
| `appId`             | `NEXT_PUBLIC_appId`                   |
| `measurementId`     | `NEXT_PUBLIC_measurementId`           |

---

### `firebaseRequests.js`
Initialises the Firebase app and exposes helper functions for Firestore CRUD operations.

#### Internal helpers (not exported)

| Function      | Description                                           |
|---------------|-------------------------------------------------------|
| `getAllItems`  | Fetches all documents from a given Firestore collection |
| `addItem`     | Adds a new document to a given Firestore collection   |

#### Exported API

| Export            | Description                                       |
|-------------------|---------------------------------------------------|
| `getAllProjects`   | Fetches all documents from the Projects collection |
| `addProject`      | Adds a new project document                       |
| `getAllServices`   | Fetches all documents from the Services collection |
| `addService`      | Adds a new service document                       |
| `getAllReviews`    | Fetches all documents from the Reviews collection  |
| `addReview`       | Adds a new review document                        |

Collection names are controlled by environment variables:

| Collection     | Env Variable                            |
|----------------|-----------------------------------------|
| Projects       | `NEXT_PUBLIC_collectionProjects`        |
| Services       | `NEXT_PUBLIC_collectionServices`        |
| Reviews        | `NEXT_PUBLIC_collectionReviews`         |

## Usage Example

```js
import { getAllProjects, addReview } from "@component/firebase/firebaseRequests";

const projects = await getAllProjects();
await addReview({ author: "John", rating: 5, comment: "Great work!" });
```

## Notes
- Firebase SDK v9 (modular) is used.
- Only **Firestore** is used — no Auth or Storage is currently wired up through these helpers (Storage URLs come from `NEXT_PUBLIC_storageBucket` via Firebase's public URLs).
