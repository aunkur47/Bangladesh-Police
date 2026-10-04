import { Component, type ReactNode } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppErrorComponent } from "@/lib/error-component";
import { Home } from "@/home";

type BoundaryState = { error: unknown };

class AppErrorBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): BoundaryState {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <AppErrorComponent error={this.state.error} />;
    }
    return this.props.children;
  }
}

export function App() {
  return (
    <AppErrorBoundary>
      <PreviewHostBridge />
      <AuthProvider>
        <Home />
      </AuthProvider>
    </AppErrorBoundary>
  );
}
