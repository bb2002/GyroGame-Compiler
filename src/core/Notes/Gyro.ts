class Gyro {
    static check(data: string): boolean {
        return (/[1-5]>[1-5]\[\d+\/\d+\]/.test(data) || /[1-5]<[1-5]\[\d+\/\d+\]/.test(data))
    }

    static compile(BPM: number, timing: number, data: string): string {
        let right = parseInt(data.split("/")[1].split("]")[0])
        let left = parseInt(data.split("/")[0].split("[")[1])

        let start = parseInt(data[0])
        let end = parseInt(data[2])

        // 방향 보정
        if(data[1] === ">") {
            // GOTO RIGHT
            if(start > end) {
                let tmp = start
                start = end
                end = tmp
            }
        }

        if(data[1] === "<") {
            // GOTO LEFT
            if(start < end) {
                let tmp = start
                start = end
                end = tmp
            }
        }

        const duration = 60.0 / BPM * 4 / right * left

        return `${data[1] === "<" ? "GYLEFT" : "GYRIGHT"},${start},${end},${timing},${duration}`
    }
}

export default Gyro