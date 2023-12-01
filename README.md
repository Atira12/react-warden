# React Warden

Lightweight RBAC protection for React

# Installation

Use npm to install:

```shell
npm install react-warden
```

Use yarn to install:

```shell
yarn add react-warden
```

# How to use

## `ReactWardenProvider`

Wrap the React structure with ReactWardenProvider to share permissions & roles with children.
Roles and permissions can be set for the current loggedin user
Fallback component is passed as default fallback component. It can be overritten by WardenGuard component

```javascript
import React from "react";
import { ReactWardenProvider } from "react-warden";

const App = () => {
    return (
        <ReactWardenProvider roles={} permissions={} fallback={}>
            {/* Components that will be using the restrictions  */}
        </ReactWardenProvider>;
    )
};

export default App;
```

## `useWarden hook`

To restrict specific parts of components from rendering we can use the methods "checkRoleAccess" and "checkPermissionAccess" provided by useWarden.

```javascript
import React from "react";
import { ReactWardenProvider, useWarden } from "react-warden";

const RestrictedComponent = () => {
    const {checkRoleAccess, checkPermissionAccess} = useWarden();

    if(checkRoleAccess(['allowed-role']) && checkPermissionAccess(['allowed-permission'])) {
      return (
       /* Permitted components */
      )
    }

    return (
     /* Unpermitted components */
    )
};

export default RestrictedComponent;
```

## `WardenGrant`

WardenGrant is a wrapper component that checks roles & permissions before rendering it's children or the fallback component.
Fallback component overrides the default fallback component chosen for in the provider.

```javascript
import React from "react";
import { WardenGrant } from "react-warden";

const AnyComponent = () => {
    return (
        <WardenGrant
            not
            roles={["allowed-manager", "alllowed-user"]}
            permissions={["to-read"]}
            fallback={}
        >
          /* Restricted components*/
        </WardenGrant>
    )
};

export default AnyComponent;
```
