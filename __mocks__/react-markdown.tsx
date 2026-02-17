/**
 * Mock for react-markdown - renders simplified markdown for Jest tests.
 * Supports: ## headings, [text](url) links, paragraphs.
 */
import React from "react";

interface MockReactMarkdownProps {
    children: string;
    components?: {
        a?: React.ComponentType<{ href?: string; children?: React.ReactNode }>;
    };
}

export default function MockReactMarkdown({ children, components = {} }: MockReactMarkdownProps) {
    const CustomA = components.a;
    const lines = children.split("\n");
    const elements: React.ReactNode[] = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
            const [, text, href] = linkMatch;
            if (CustomA) {
                elements.push(React.createElement(CustomA, { key: i, href }, text));
            } else {
                elements.push(React.createElement("a", { key: i, href }, text));
            }
            continue;
        }
        const h2Match = line.match(/^## (.+)$/);
        if (h2Match) {
            elements.push(React.createElement("h2", { key: i }, h2Match[1]));
            continue;
        }
        if (line.trim()) {
            elements.push(React.createElement("p", { key: i }, line));
        }
    }
    return React.createElement(React.Fragment, {}, ...elements);
}
