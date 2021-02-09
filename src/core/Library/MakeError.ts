export enum EErrorReason {
    CAM_POS_OUTOFINDEX = "Camera position out of index. ",
    UNKNOWN_CAM_DIRECTION = "Unknown camera direction. ",
    SECTION_NOT_STARTED = "Section is not started. Expect 'SECTION START' before ",
    SECTION_NOT_FINISHED = "Section is not finished. Expect 'SECTION END' before ",
    UNKNOWN_COMMAND_NAME = "Unknown command name. ",
    INDEX_OUT_OF_RANGE = "Index out of range. "
}

export function makeErrorWithMessage(message: string) {
    throw new Error(message)
}

export function makeErrorWithReason(reason: EErrorReason, input: string, line: number) {
    makeErrorWithMessage(`${reason} '${input}' in line number ${line}`)
}