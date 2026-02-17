import { render } from "@testing-library/react";
import { JsonLd } from "../json-ld";

describe("JsonLd", () => {
    it("renders script with type application/ld+json", () => {
        const { container } = render(<JsonLd data={{ "@type": "Person", name: "Test" }} />);
        const script = container.querySelector('script[type="application/ld+json"]');
        expect(script).toBeInTheDocument();
    });

    it("serializes passed object as valid JSON in innerHTML", () => {
        const data = { "@type": "Article", headline: "Test", tags: ["a", "b"] };
        const { container } = render(<JsonLd data={data} />);
        const script = container.querySelector('script[type="application/ld+json"]');
        expect(script).toHaveProperty("textContent");
        const parsed = JSON.parse(script!.textContent || "");
        expect(parsed["@type"]).toBe("Article");
        expect(parsed.headline).toBe("Test");
        expect(parsed.tags).toEqual(["a", "b"]);
    });
});
