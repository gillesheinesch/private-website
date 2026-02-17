/** Mock for remark-gfm - returns identity function */
module.exports = function remarkGfm() {
    return (tree) => tree;
};
