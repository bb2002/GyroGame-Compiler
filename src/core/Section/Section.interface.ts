interface ISection {
    BPM: number                 // 이 섹션의 BPM
    waitingTime: number         // 이 섹션 시작 전 대기 시간
    currentTiming: number       // 이 섹션의 시작 시간
    camVertical: number         // 캠 위치 상하
    camHorizontal: number       // 캠 위치 좌우
    camVerticalMovementSpeed: number      // 캠의 이동 속도
    camHorizontalMovementSpeed: number    // 캠의 이동 속도
}

export default ISection