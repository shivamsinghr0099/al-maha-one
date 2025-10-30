"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ErrorBoundary } from "@/components/error-boundary";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { ServiceWorkerRegistration } from "@/components/service-worker";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <PerformanceMonitor />
        <ServiceWorkerRegistration />
        {children}
      </ErrorBoundary>
    </Provider>
  );
}