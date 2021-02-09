import { EErrorReason, makeErrorWithMessage, makeErrorWithReason } from "../Library/MakeError"

class Tap {
    static check(data: string): boolean {
        return (/[1-5]/.test(data) && data.length === 1)
    }

    static compile(timing: number, data: string): string {
        const val = parseInt(data)
        if(val < 1 || val > 5) {
            throw makeErrorWithMessage(EErrorReason.INDEX_OUT_OF_RANGE + " TAP NOTE Value: " + val)
        } else {
            return `TAP,${val},${timing}`
        }
    }
}

export default Tap