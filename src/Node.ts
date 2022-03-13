import { CountType } from "./typings"

export class Node {
    constructor(
        private value: number,
        private weight: number,
        private count: CountType = 0,
        private parent: Node|null = null
    ) {}

    public getValue(): number {
        return this.value * this.getCount()
    }
    public setValue(value: number) {
        this.value = value
    }

    public getWeight(): number {
        return this.weight * this.getCount()
    }
    public setweight(weight: number) {
        this.weight = weight
    }

    public getCount(): number {
        return this.count
    }
    public setCount(count: CountType) {
        this.count = count
    }

    public getParent(): Node {
        return this.parent as Node
    }
    public setParent(parent: Node) {
        this.parent = parent
    }

    public getTotalValue (): number {
        let item: Node|null = this
        let result = 0
        while (item) {
            result += item.getValue()
            item = item.parent
        }
        return result
    }

    public getTotalWeight(): number {
        let result = 0
        let item: Node = this
        while (item) {
            result += item.getWeight()
            item = item.getParent()
        }
        return result
    }

    public getTotalCounts(): number[] {
        const result: number[] = []
        let item: Node = this
        while (item) {
            result.push(item.getCount())
            item = item.getParent()
        }
        return result.reverse()
    }

    public getResource(limit: number): number {
        return limit - this.getTotalWeight()
    }
}
