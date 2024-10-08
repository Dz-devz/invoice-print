/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as InvoicesPageImport } from './routes/invoicesPage'
import { Route as CreateInvoiceImport } from './routes/createInvoice'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const InvoicesPageRoute = InvoicesPageImport.update({
  path: '/invoicesPage',
  getParentRoute: () => rootRoute,
} as any)

const CreateInvoiceRoute = CreateInvoiceImport.update({
  path: '/createInvoice',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/createInvoice': {
      id: '/createInvoice'
      path: '/createInvoice'
      fullPath: '/createInvoice'
      preLoaderRoute: typeof CreateInvoiceImport
      parentRoute: typeof rootRoute
    }
    '/invoicesPage': {
      id: '/invoicesPage'
      path: '/invoicesPage'
      fullPath: '/invoicesPage'
      preLoaderRoute: typeof InvoicesPageImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/createInvoice': typeof CreateInvoiceRoute
  '/invoicesPage': typeof InvoicesPageRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/createInvoice': typeof CreateInvoiceRoute
  '/invoicesPage': typeof InvoicesPageRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/createInvoice': typeof CreateInvoiceRoute
  '/invoicesPage': typeof InvoicesPageRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/createInvoice' | '/invoicesPage'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/createInvoice' | '/invoicesPage'
  id: '__root__' | '/' | '/about' | '/createInvoice' | '/invoicesPage'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  CreateInvoiceRoute: typeof CreateInvoiceRoute
  InvoicesPageRoute: typeof InvoicesPageRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  CreateInvoiceRoute: CreateInvoiceRoute,
  InvoicesPageRoute: InvoicesPageRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/createInvoice",
        "/invoicesPage"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/createInvoice": {
      "filePath": "createInvoice.tsx"
    },
    "/invoicesPage": {
      "filePath": "invoicesPage.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
