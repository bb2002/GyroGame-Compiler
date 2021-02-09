class Hold {
    static check(data: string): boolean {
        return (/[1-5]h\[\d+\/\d+\]/.test(data))
    }

    static compile(BPM: number, timing: number, data: string): string {
        let right = parseFloat(data.split("/")[1].split("]")[0])
        let left = parseFloat(data.split("/")[0].split("[")[1])

        const duration = 60.0 / BPM * 4 / right * left

        return `HOLD,${parseInt(data[0])},${timing},${duration}`
    }
}

export default Hold