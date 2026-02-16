import "@testing-library/jest-dom";

// Mock IntersectionObserver (used by framer-motion whileInView)
class MockIntersectionObserver {
  observe = () => null;
  disconnect = () => null;
  unobserve = () => null;
  root = null;
  rootMargin = "";
  thresholds = [];
}
window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
