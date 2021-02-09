class GyroHit {
    static check(data: string): boolean {
        return (data === ">>") || (data === "<<")
    }

    static compile(timing: number, data: string): string {
        return `${data === ">>" ? "GYRGHIT" : "GYLFHIT"},${timing}`
    }
}

export default GyroHit