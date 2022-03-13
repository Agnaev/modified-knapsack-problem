import { provider } from './BreadthFirstSearch'

const limit = 6
const target = [5, 2, 9, 7]
const restrict = [4, 2, 2, 4]

const { buildTree } = provider({
    limit,
    target,
    restrict
})

const resultNode = buildTree()
console.log(
    resultNode.getTotalCounts(),
    resultNode.getTotalValue(),
    resultNode.getResource(limit)
)
