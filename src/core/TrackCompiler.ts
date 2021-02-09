import { EErrorReason, makeErrorWithReason } from "./Library/MakeError"
import Section from "./Section/Section"
import ISection from "./Section/Section.interface"

class TrackCompiler {
    private trackData: string

    // 현재 컴파일 중인 섹션 정보
    private currentSection?: Section

    // 컴파일 된 섹션 리스트
    private compiledSections: Section[]

    // 트랙에 대한 설정들
    private sectionSettings: ISection

    constructor(trackData: string) {
        this.trackData = trackData
        this.compiledSections = []
        this.sectionSettings = <ISection>(
            { 
                BPM: 60, 
                waitingTime: 0.0,
                currentTiming: 0.0,
                camVertical: 1,
                camHorizontal: 0,
                camVerticalMovementSpeed: 5.0,
                camHorizontalMovementSpeed: 5.0
            }
        )
    }

    compileAsync() {

    }

    compile() {
        const trackLines = this.trackData.split("\n")

        for(let i = 0; i < trackLines.length; ++i) {
            let trackLine = trackLines[i]

            // PRECOMPILE
            trackLine = trackLine.replace("\r", "")

            const trackBlocks = trackLine.split(" ")

            if(!trackLine) continue

            if(this.currentSection === undefined) {
                // SECTION NOT STARTED.
                switch(trackBlocks[0]) {
                    case "BPM":     // BPM 을 설정합니다.
                        this.sectionSettings.BPM = parseFloat(trackBlocks[1])
                        break;
                    case "WAIT":    // 섹션 시작 전 대기 시간
                        this.sectionSettings.waitingTime = parseFloat(trackBlocks[1])
                        break;
                    case "CAM":
                        if(trackBlocks[1] === "VERTICAL") {
                            // 상하 카메라 위치 설정
                            let val = parseInt(trackBlocks[2])
                            let speed = parseFloat(trackBlocks[3])
                            if(val < 1 || val > 5) {
                                throw makeErrorWithReason(EErrorReason.INDEX_OUT_OF_RANGE, trackLine, i)
                            } else {
                                this.sectionSettings.camVertical = val
                                this.sectionSettings.camVerticalMovementSpeed = speed
                            }
                        } else if(trackBlocks[1] === "HORIZONTAL") {
                            // 좌우 카메라 위치 설정
                            let val = parseInt(trackBlocks[2])
                            let speed = parseFloat(trackBlocks[3])

                            if(val < -5 || val > 5) {
                                throw makeErrorWithReason(EErrorReason.INDEX_OUT_OF_RANGE, trackLine, i)
                            } else {
                                this.sectionSettings.camHorizontal = val
                                this.sectionSettings.camHorizontalMovementSpeed = speed
                            }
                        } else {
                            throw makeErrorWithReason(EErrorReason.UNKNOWN_CAM_DIRECTION, trackBlocks[1], i)
                        }
                        break;
                    case "COMMENT":
                        break;
                    case "SECTION":
                        if(trackBlocks[1] === "START") {
                            const timing = this.sectionSettings.currentTiming + this.sectionSettings.waitingTime
                            this.currentSection = new Section(timing, this.sectionSettings.BPM)
                            this.sectionSettings.waitingTime = 0.0

                            // APPLY CAM POS
                            this.currentSection.getNotes().push(`CAMVERTICAL,${this.sectionSettings.camVertical},${timing},${this.sectionSettings.camVerticalMovementSpeed}`)
                            this.currentSection.getNotes().push(`CAMHORIZONTAL,${this.sectionSettings.camHorizontal},${timing},${this.sectionSettings.camHorizontalMovementSpeed}`)
                        } else {
                            throw makeErrorWithReason(EErrorReason.SECTION_NOT_STARTED, trackLine, i)
                        }
                        break;
                    default: 
                        // 섹션 시작 없이 다른 명령어가 실행된 경우.
                        throw makeErrorWithReason(EErrorReason.SECTION_NOT_STARTED, trackBlocks[1], i)
                }
            } else {
                // SECTION STARTED.
                switch(trackBlocks[0]) {
                    case "NOTE": 
                        this.currentSection?.setDuration(parseFloat(trackBlocks[1]))
                        break;
                    case "SECTION":
                        if(trackBlocks[1] === "END") {
                            this.sectionSettings.currentTiming = this.currentSection!.getCurrentTiming()
                            this.compiledSections.push(this.currentSection)
                            this.currentSection = undefined
                        } else {
                            throw makeErrorWithReason(EErrorReason.SECTION_NOT_FINISHED, trackLine, i)
                        }
                        break;
                    case "COMMENT":
                        break;
                    default: 
                        this.currentSection?.compile(trackLine)
                }
            }
        }
    }

    export() {
        let Track: string[] = []

        this.compiledSections.forEach((item: Section) => {
            Track.push(...item.getNotes())
        })
        
        return JSON.stringify(Track)
    }
}

export default TrackCompiler