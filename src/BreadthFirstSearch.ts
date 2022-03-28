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
    
    let counter = 0
    function printItem(node: Node) {
        const count = `${counter++}:`.padEnd(5, ' ')
        const value = `${node.getTotalValue()}`.padEnd(5, ' ')
        const resource = `${node.getResource(limit)}`.padEnd(5, ' ')
        console.log(`${count} ${value} ${resource}` + node.getTotalCounts())
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
    
    function buildTree(): Node {
        const queue: Node[] = createInitBound()
        let result: Node = queue[queue.length - 1]
        let item: Node|null|undefined = null
        let boundLevel = 1
        const map: Record<string, Node> = {}
        while (( item = queue.pop() )) {
            const key = `${boundLevel}-${item.getResource(limit)}`
            const possibleItem = map[key]
            if (!possibleItem) {
                map[key] = item
            } else if (possibleItem.getTotalValue() > item.getTotalValue()) {
                continue
            }
            queue.unshift(
                ...getBound(item, boundLevel)
            )
            // printItem(item)
            if (
                boundLevel === target.length &&
                result &&
                result.getTotalValue() < item.getTotalValue()
            ) {
                result = item
            }
            boundLevel = getTotalCountsLength(queue)
        }
        return result
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

