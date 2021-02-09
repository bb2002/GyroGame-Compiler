import Break from "../Notes/Break"
import Gyro from "../Notes/Gyro"
import GyroHit from "../Notes/GyroHit"
import Hold from "../Notes/Hold"
import Tap from "../Notes/Tap"

class Section {
    private BPM: number             // BPM 값
    private noteSpeed: number       // 마디 값
    private duration: number = 0.0  // BPM 과 마디를 계산 값
    
    private currentTiming = 0.0     // 색션의 시작 타이밍
    private compiledNotes: string[] = []

    constructor(startTiming: number, BPM: number = 60, noteSpeed: number = 4) {
        this.BPM = BPM
        this.noteSpeed = noteSpeed
        this.currentTiming = startTiming

        // Duration 계산
        this.setDuration(this.noteSpeed)
    }

    setDuration(noteSpeed: number) {
        this.noteSpeed = noteSpeed
        this.duration = 60.0 / this.BPM * 4 / noteSpeed
    }

    compile(data: string) {
        const notes = data.split(",")

        for(let i = 0; i < notes.length; ++i) {
            const note = notes[i].split("&")

            for(let j = 0; j < note.length; ++j) {
                if(Tap.check(note[j])) {
                    // TAP CHECK
                    this.compiledNotes.push(Tap.compile(this.currentTiming, note[j]))
                }

                if(Break.check(note[j])) {
                    // BREAK CHECK
                    this.compiledNotes.push(Break.compile(this.currentTiming, note[j]))
                }

                if(Hold.check(note[j])) {
                    // HOLD CHECK
                    this.compiledNotes.push(Hold.compile(this.BPM, this.currentTiming, note[j]))
                }

                if(GyroHit.check(note[j])) {
                    // GYRO HIT
                    this.compiledNotes.push(GyroHit.compile(this.currentTiming, note[j]))
                }

                if(Gyro.check(note[j])) {
                    // GYRO
                    this.compiledNotes.push(Gyro.compile(this.BPM, this.currentTiming, note[j]))
                }
            }

            this.currentTiming += this.duration
        }
    }

    getCurrentTiming(): number {
        return this.currentTiming
    }

    getNotes() {
        return this.compiledNotes
    }
}

export default Section