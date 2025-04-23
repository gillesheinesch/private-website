import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react"; // Import React
import Header from "./Header"; // Assuming Header.tsx is in the same directory

// Mock the next/link component
jest.mock("next/link", () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    // Ensure children is a valid React element before cloning
    if (React.isValidElement(children)) {
      // Clone the child element (usually an <a> tag or a component rendering one)
      // and add the href to it directly for testing purposes.
      return React.cloneElement(children as React.ReactElement, { href });
    }
    return children; // Return children directly if not a valid element (less common)
  };
});

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  Plane: () => <div data-testid="plane-icon">Plane</div>,
  X: () => <div data-testid="x-icon">X</div>, // Mock X if needed for toggle test
}));

// Mock shadcn/ui components used in Header
jest.mock("@/components/ui/navigation-menu", () => ({
  NavigationMenu: ({ children }: { children: React.ReactNode }) => (
    <nav data-testid="desktop-nav">{children}</nav>
  ),
  NavigationMenuList: ({ children }: { children: React.ReactNode }) => (
    <ul data-testid="desktop-nav-list">{children}</ul>
  ),
  NavigationMenuItem: ({ children }: { children: React.ReactNode }) => (
    <li data-testid="desktop-nav-item">{children}</li>
  ),
  NavigationMenuLink: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <a className={className} {...props} data-testid="desktop-nav-link">
      {children}
    </a>
  ),
  navigationMenuTriggerStyle: () => "mock-trigger-style",
}));

jest.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sheet-wrapper">{children}</div>
  ),
  SheetTrigger: ({
    children,
    asChild,
  }: {
    children: React.ReactNode;
    asChild?: boolean;
  }) =>
    asChild ? (
      children
    ) : (
      <button data-testid="sheet-trigger">{children}</button>
    ),
  SheetContent: ({
    children,
    side,
  }: {
    children: React.ReactNode;
    side?: string;
  }) => (
    <div data-testid="sheet-content" data-side={side}>
      {children}
    </div>
  ),
  SheetHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sheet-header">{children}</div>
  ),
  SheetTitle: ({ children }: { children: React.ReactNode }) => (
    <h2 data-testid="sheet-title">{children}</h2>
  ),
}));

jest.mock("@/components/ui/button", () => ({
  // eslint-disable-next-line react/display-name
  Button: React.forwardRef(
    (
      {
        children,
        variant,
        size,
        ...props
      }: { children: React.ReactNode; variant?: string; size?: string },
      ref: React.Ref<HTMLButtonElement>
    ) => (
      <button
        ref={ref}
        data-testid="mock-button"
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
      </button>
    )
  ),
}));

describe("Header Component", () => {
  it("renders the logo/brand name and icon", () => {
    render(<Header />);
    expect(screen.getByText(/Gilles Heinesch/i)).toBeInTheDocument();
    expect(screen.getByTestId("plane-icon")).toBeInTheDocument();
  });

  it("renders desktop navigation links using mocked NavigationMenu", () => {
    render(<Header />);
    expect(screen.getByTestId("desktop-nav")).toBeInTheDocument();
    expect(screen.getByTestId("desktop-nav-list")).toBeInTheDocument();
    // Check for presence of links by their text content within the mocked structure
    expect(screen.getByTestId("desktop-nav")).toHaveTextContent(/Home/i);
    expect(screen.getByTestId("desktop-nav")).toHaveTextContent(/Projects/i);
    expect(screen.getByTestId("desktop-nav")).toHaveTextContent(/Blog/i);
    expect(screen.getByTestId("desktop-nav")).toHaveTextContent(/About/i);
  });

  it("renders mobile menu trigger button using mocked SheetTrigger/Button", () => {
    render(<Header />);
    // Find the button by its test id from the mock
    const mobileMenuButton = screen.getByTestId("mock-button");
    expect(mobileMenuButton).toBeInTheDocument();
    // Check that the button contains the Menu icon mock
    expect(mobileMenuButton).toContainElement(screen.getByTestId("menu-icon"));
  });

  // Basic test for Sheet component presence (via mock)
  it("renders the mocked Sheet component structure", () => {
    render(<Header />);
    expect(screen.getByTestId("sheet-wrapper")).toBeInTheDocument();
    // Further tests could involve simulating clicks and checking content,
    // but that depends heavily on how the Sheet state is managed/mocked.
  });
});
