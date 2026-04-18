import { AuthGuard } from "@/components/AuthGuard";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

// Lazy page imports
import { Suspense, lazy } from "react";

const LibraryPage = lazy(() => import("@/pages/Library"));
const NewClonePage = lazy(() => import("@/pages/NewClone"));
const TtsPage = lazy(() => import("@/pages/Tts"));
const SettingsPage = lazy(() => import("@/pages/Settings"));

const PageLoader = () => (
  <div className="p-6 space-y-4 max-w-screen-xl mx-auto">
    <Skeleton className="h-8 w-48" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {["a", "b", "c", "d", "e", "f"].map((k) => (
        <Skeleton key={k} className="h-40" />
      ))}
    </div>
  </div>
);

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <AuthGuard>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </AuthGuard>
    </Layout>
  ),
});

// Index redirect
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/library" });
  },
});

// Library
const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/library",
  component: () => <LibraryPage />,
});

// New clone
const newCloneRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clone/new",
  component: () => <NewClonePage />,
});

// TTS
const ttsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tts",
  component: () => <TtsPage />,
});

// Settings
const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => <SettingsPage />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  libraryRoute,
  newCloneRoute,
  ttsRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Outlet import
import { Outlet } from "@tanstack/react-router";

export default function App() {
  return <RouterProvider router={router} />;
}
