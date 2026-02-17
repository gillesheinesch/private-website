/**
 * Renders JSON-LD structured data for SEO (Person, Article, etc.)
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */
export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data),
            }}
        />
    );
}
