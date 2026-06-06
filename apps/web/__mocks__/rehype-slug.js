/** Mock for rehype-slug - returns identity function */
module.exports = function rehypeSlug() {
    return (tree) => tree;
};
