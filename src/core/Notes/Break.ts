class Break {
    static check(data: string): boolean {
        return (/[1-5]/.test(data) && data.length === 2 && data[1] === "B")
    }

    static compile(timing: number, data: string): string {
        return `BREAK,${parseInt(data[0])},${timing}`
    }
}

export default Break