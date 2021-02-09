import readline from "readline"
import TrackCompiler from "./core/TrackCompiler"
import fs from "fs"

let track = `
BPM 168
WAIT 2.650

SECTION START
NOTE 2
1>5[4/3],,,
SECTION END
CAM VERTICAL 2 50.0
SECTION START
NOTE 2
1&5
SECTION END

CAM VERTICAL 3 50.0
SECTION START
NOTE 2
2&4
SECTION END

CAM VERTICAL 4 50.0
SECTION START
NOTE 2
3
SECTION END

CAM VERTICAL 1 0.5
SECTION START
NOTE 2
5<1[4/3],,
SECTION END

SECTION START
NOTE 4
1,1,2&4,,2,2,3&5,,3,3,2,2,1,5,1&5,,5,5,2&5,,3,3,1&4,,1,2,3,5
NOTE 2
2h[1/4]&5h[1/4],2&5,5h[1/2],3
NOTE 4
1,4
NOTE 2
2&3,1h[1/4]&3h[1/4],3h[1/4]&5h[1/4],2h[1/4]&4h[1/4],1&3,2h[1/2],1
NOTE 4
4,1
NOTE 2
2&5,3h[1/4]&5h[1/4],3h[1:4]&5h[1:4],1h[1:4]&4h[1:4],1&4
NOTE 4
1,2,2&4,,4,4,1&4,,4,4,1,1,2,3,3&5,,5,2,3&4,,4,3,1&2,
NOTE 1
4B,,2>5[1/2],1>3[1/2],5<1[1/2]
NOTE 4
4,1,2&5,
NOTE 1
2>5[1/2],4>1[1/2],1>4[1/2]
NOTE 4
3,2&5,3,2&5,3h[1/2],4,4,,1h[1/2],4,5,
NOTE 8
1h[3/8],,,4h[3/8],,,2h[3/8],,
3h[3/8],,,1h[3/8],,,5h[3/8],,,3h[3/8],,,<<
NOTE 1
,
NOTE 4
,3,1&5,4,1&5,5,1&5,1,1&4,2h[1/4],1,2B&5B,,>>,1&4,2&5,
1,1&5,2,2&5,3,3&5,4,3/4,1h[1/4],4,1B&5B,,1&3,2&4,3&5,
4h[1/4],5,2&5,2B&5B,3h[1/4],4,1&4,1B&5B,3,1B&5B,3,<<&4<2[1/2],,,,
1,2,2,3,3,4,1&5,,2&4
NOTE 1
2&5,,
,,,,,,,,,,,,,,,
SECTION END
`

const READ_FILE = "./maps/SeoulMetro.txt"
const WRITE_FILE = "./dist/SeoulMetro.json"

try {
    // read file
    const data = fs.readFileSync(READ_FILE)

    // Open and make file.
    fs.openSync(WRITE_FILE, "w")

    // Start compiler
    const comp = new TrackCompiler(data.toString())
    comp.compile()
    console.log("> COMPILE SUCCESSED.")

    fs.writeFileSync(WRITE_FILE, comp.export(), "utf8")
    console.log("> WRITE SUCCESSED.")
} catch(ex) {
    console.log("An error occurred.")
    console.error(ex)
}




/*reader.setPrompt("> ")
reader.prompt()
reader.on("line", (line) => {
    if(line === "!") {
        


        reader.close()
    } else {
        reader.prompt()
        track += line + "\n"
    }
})*/