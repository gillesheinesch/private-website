/** Mock for rehype-highlight - returns identity function */
module.exports = function rehypeHighlight() {
    return (tree) => tree;
};
