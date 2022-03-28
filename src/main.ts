import { provider } from './BreadthFirstSearch'

const limit = 6
const target = [5, 2, 9, 7]
const restrict = [4, 2, 2, 4]

const { buildTree } = provider({
    limit,
    target,
    restrict
})

const start = new Date
const resultNode = buildTree()
const end = new Date
const processingTime = end.getTime() - start.getTime()

console.log(
    'critical path: %s\nTarget function value: %d\nResource: %d\nProcessing time: %d',
    resultNode.getTotalCounts().join(' '),
    resultNode.getTotalValue(),
    resultNode.getResource(limit),
    processingTime
)
