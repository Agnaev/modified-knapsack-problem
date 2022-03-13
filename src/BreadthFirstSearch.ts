import { Node } from './Node'
import {
    CountType,
    IProviderData
} from './typings'

export function provider({ target, limit, restrict }: IProviderData) {
    function getBound(parent: Node, boundItem: number): Node[] {
        if (boundItem >= target.length) {
            return []
        }
        const result: Node[] = []
        for (let i: CountType = 2; i >= 0; --i) {
            let resource = parent?.getResource(limit) - restrict[boundItem] * i
            if (resource >= 0 && resource <= limit) {
                const item = new Node(
                    target[boundItem],
                    restrict[boundItem],
                    i as CountType,
                    parent
                )
                result.push(item)
            }
        }
    
        return result
    }
    
    function printItem(node: Node) {
        const value = node.getTotalValue()
        const resource = node.getResource(limit)
        console.log(`${value}, ${resource}`.padEnd(8, ' ') + node.getTotalCounts())
    }

    function createInitBound(): Node[] {
        const result: Node[] = []
        for (let i: CountType = 2; i >= 0; --i) {
            if (restrict[0] * i <= limit) {
                result.push(
                    new Node(
                        target[0],
                        restrict[0],
                        i as CountType
                    )
                )
            }
        }
        return result
    }
    
    function buildTree() {
        const queue: Node[] = createInitBound()
        let item: Node|null|undefined = null
        let boundLevel = 1
        while (( item = queue.pop() )) {
            queue.unshift(
                ...getBound(item, boundLevel)
            )
            printItem(item)
            boundLevel = getTotalCountsLength(queue)
        }
    }
    
    function getTotalCountsLength(nodes: Node[]): number {
        if (!nodes || !nodes.length) {
            return 0
        }
        const node = nodes[nodes.length - 1]
        const counts = node.getTotalCounts()
        return counts.length
    }

    return {
        buildTree
    }
}

