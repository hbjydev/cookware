/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as appIndexImport } from './routes/(app)/index'

// Create/Update Routes

const appIndexRoute = appIndexImport.update({
  id: '/(app)/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(app)/': {
      id: '/(app)/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof appIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof appIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof appIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/(app)/': typeof appIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/'
  id: '__root__' | '/(app)/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  appIndexRoute: typeof appIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  appIndexRoute: appIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/(app)/"
      ]
    },
    "/(app)/": {
      "filePath": "(app)/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */