"use client"
import { Button, CircularProgress, FormControl } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Editor from '@monaco-editor/react';
import TextField from '@mui/material/TextField';
import dynamic from "next/dynamic";
import Commonloading from "@components/loading";
const VideoPlayer = dynamic(() => import("@components/Videoplayer"), {
    ssr: false,
    loading: () => <p>{Commonloading()}</p>,
});
const Wasm = () => {
    const [pyodide_initialized, setLoadingPyodide] = useState(false)
    const [encrypt_output, setEncrypt] = useState('')
    const [decrypt_output, setDecrypt] = useState('')
    const [pyodide_error, setPyodideError] = useState('')
    const [pyodide_output, setPyodideOutput] = useState([])
    const [wasm_initialized, setWasmLoading] = useState(false)
    const [wasm_functions, setWasmFunction] = useState(null)
    const editorRef = useRef(null);
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        loop: true,
        muted: true,
        sources: [
            {
                src: "/wasm/dfd3072e-e25a-4454-8f80-a89f0e6b2277_master.m3u8",
                type: "application/x-mpegURL",
            },
        ],
    };
    useEffect(() => {
        if (typeof window != undefined && window.pyodideloaded) {
            setLoadingPyodide(true)
        }
        else {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
            script.id = 'pyodide-script';
            script.onload = (e) => {
                loadPyodide({
                    stdin: () => prompt("Enter the Input Text here"),
                    stdout: (msg) => print_output(msg),
                }).then((d) => {
                    window.pyodideloaded = true
                    window.pyodide = d
                    setLoadingPyodide(true)
                }).catch(_ => {})
            }
            document.head.appendChild(script);
        }
        if (typeof window != undefined && window.wasmloaded) {
            setWasmLoading(true)
        }
        else {
            const script = document.createElement('script');
            script.src = '/encrypt.js';
            script.id = 'wasm-script';
            script.onload = (e) => {
                setWasmFunction(Module)
                window.wasmloaded = true
                setWasmLoading(true)
            }
            document.head.appendChild(script);
        }
    }, [])
    const print_output = (msg) => {
        setPyodideOutput((prevState) => (
            [...prevState, msg]
        ))
    }
    const run_python = () => {
        setPyodideOutput([])
        setPyodideError('')
        const python_code = editorRef.current.getValue()
        const modified_python_code = python_code.replace(/input\(["'](.*?)["']\)/g, (match, text) => {
            return "input()"
        })
        window.pyodide.runPythonAsync(modified_python_code).then(() => {
        })
            .catch((e) => {
                setPyodideError(e.message)
            })
    }
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
    }
    const encrypt = (e) => {
        e.preventDefault()
        const encry = new FormData(e.currentTarget)
        setEncrypt(wasm_functions.ccall('encrypt', 'string', ['string', 'number'], [encry.get('encrypt_text'), Number(encry.get('encryption_key'))]))
    }
    const decrypt = (e) => {
        e.preventDefault()
        const decry = new FormData(e.currentTarget)
        setDecrypt(wasm_functions.ccall('decrypt', 'string', ['string', 'number'], [decry.get('decrypt_text'), Number(decry.get('decryption_key'))]))
    }

    return (
        <section className="pb-8 px-8">
            <div className='flex project-container gap-6'>
                <div className="sub-container w-1/2 pt-8 pb-40">
                    <h1>Web Assembly</h1>
                    <p className="my-4 text-color-level-2">WebAssembly (Wasm) is a low-level language that can run in web browsers. It&apos;s a binary instruction format for compiling and executing code in a client-side web browser.</p>
                    <div className="flex flex-col gap-4">
                        <div>
                            <h4 className="font-medium pb-2">Incorporating C program into the web using WebAssembly</h4>
                            <p className="text-color-level-2">
                                A C source code which performs encrypting and decrypting is converted to wasm using &ldquo;emscripten&rdquo; (Emscripten is an LLVM/Clang-based compiler that compiles C and C++ source code to WebAssembly, primarily for execution in web browsers.) and is streamed here.The encrypt and decrypt function from the wasm file is binded to the encrypt and decrypt button below.
                            </p>
                        </div>
                        <p className="font-bold">Encrypt</p>
                        <Card className="w-3/4 rounded-3xl project-card">
                            <CardContent>
                                <form onSubmit={encrypt}>
                                    <div className="flex gap-4 flex-wrap w-full">
                                        <FormControl className="w-full">
                                            <TextField name="encrypt_text" autoComplete="off" required id="outlined-basic" label="Text to be Encrypted" variant="outlined" />
                                        </FormControl>
                                        <div className="flex items-end gap-4 justify-between w-full">
                                            <FormControl>
                                                <TextField name="encryption_key" autoComplete="off" required inputProps={{ min: 1 }} type="number" id="outlined-basic" label="Encryption Key" variant="outlined" />
                                            </FormControl>
                                            <div>
                                                <Button disabled={!wasm_initialized} variant="contained" color="primary" type="submit">
                                                    Encrypt
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                        <p className={`${encrypt_output.length == 0 && 'invisible'} font-bold pl-4`}>output: <span className="text-success">{encrypt_output}</span></p>
                        <p className="font-bold">Decrypt</p>
                        <Card className="w-3/4 rounded-3xl project-card">
                            <CardContent>
                                <form onSubmit={decrypt}>
                                    <div className="flex gap-4 flex-wrap w-full">
                                        <FormControl className="w-full">
                                            <TextField name="decrypt_text" autoComplete="off" required id="outlined-basic" label="Text to be Decrypted" variant="outlined" />
                                        </FormControl>
                                        <div className="flex items-end gap-4 justify-between w-full">
                                            <FormControl>
                                                <TextField name="decryption_key" autoComplete="off" required inputProps={{ min: 1 }} type="number" id="outlined-basic" label="Decryption Key" variant="outlined" />
                                            </FormControl>
                                            <div>
                                                <Button disabled={!wasm_initialized} variant="contained" color="primary" type="submit">
                                                    Decrypt
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                        <p className={`${decrypt_output.length == 0 && 'invisible'} font-bold pl-4`}>output: <span className="text-success">{decrypt_output}</span></p>
                    </div>
                </div>
                <div className="sub-container w-1/2">
                    <div className="project-video sticky top-0">
                        <VideoPlayer options={videoJsOptions}></VideoPlayer>
                    </div>
                </div>
            </div>
            <div className="pt-14">
                <h2 id='execute-scroll' className="font-medium pb-2">Running Python Code on the Client-Side using Pyodide</h2>
                <p className="text-color-level-2 pb-2">
                    Pyodide is a Python distribution for the browser and Node.js based on WebAssembly.
                    It is a port of CPython to WebAssembly/Emscripten.Pyodide makes it possible to install and run Python packages in the browser.
                </p>
                <p className="text-color-level-2">
                    I have demonstrated the execution of Python code in the browser by creating a Python interpreter using Pyodide and Monaco Editor which powers Visual Studio Code.
                </p>
            </div>
            <div className="python-container">
                <div className="input-output">
                    <Card className="project-card p-1">
                        <CardContent>
                            <div className="editor-container">
                                {!(pyodide_initialized && editorRef) && <div className="python-loader"><CircularProgress></CircularProgress></div>}
                                {(pyodide_initialized) && <Editor
                                    width="100%"
                                    theme="vs-dark"
                                    height="70vh"
                                    className={pyodide_initialized && editorRef ? '' : 'invisible'}
                                    defaultLanguage="python"
                                    onMount={handleEditorDidMount}
                                    defaultValue={
                                        `# authored by Shanephear John Cleetus
# set input value with numbers and find the highest point
input_value = [1,7,3,4,5,4,3,2,1]

def sliceAndInsert(index:int,replaceValue:str,value:str):
    return value[:index] + replaceValue + value[index + 1 :]

# To find the highest and lowest points
x = 0 
graphPonits = []
for i in range(len(input_value)):
    if i % 2 == 0:
        graphPonits.insert(i,x + input_value[i])
    else:
        graphPonits.insert(i,x - input_value[i])   
    x = graphPonits[i]
startIndex = 0 
# If the graph has negative coordinates find the start index and manipulate it
v =  min(graphPonits)  
if(v < 0):
    for i in range(len(graphPonits)):
        graphPonits[i] = graphPonits[i] - v
    startIndex = - v    

# Forming each output row as a string
finalArr = []
for j in range(max(graphPonits)):
    finalArr.insert(j,''.join([" "]*sum(input_value)))


startIndexRow = 0   
for index,value in enumerate(input_value):
    if index % 2 == 0:
        while(startIndex != graphPonits[index]):
            # finalArr[startIndex] = finalArr[startIndex][:startIndexRow] + "/" + finalArr[startIndex][startIndexRow + 1 :]
            finalArr[startIndex] = sliceAndInsert(startIndexRow,"/",finalArr[startIndex])
            startIndex = startIndex + 1 
            startIndexRow = startIndexRow + 1
        startIndex = startIndex - 1     
    else:
        while(startIndex != graphPonits[index] - 1):
            # finalArr[startIndex] = finalArr[startIndex][:startIndexRow] + "\\" + finalArr[startIndex][startIndexRow + 1 :]
            finalArr[startIndex] = sliceAndInsert(startIndexRow,"\\\\",finalArr[startIndex])
            startIndex = startIndex - 1
            startIndexRow = startIndexRow + 1
        startIndex = startIndex + 1       

highestPoint = finalArr[len(finalArr) - 1].index('/')
rowString = ''.join([" "]*sum(input_value))
print(sliceAndInsert(highestPoint," o ",rowString))
print(sliceAndInsert(highestPoint,"/|\\\\",rowString))
print(sliceAndInsert(highestPoint,"< >",rowString))
for y in reversed(finalArr):
    print(y)`}
                                />}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="project-card p-1">
                        <CardContent>
                            <div className={`editor-container ${pyodide_error.length ? '' : 'overflow-auto'}`} id='output-section'>
                                <h5 className="pb-4 font-bold">Output:</h5>
                                {pyodide_output.length > 0 &&
                                    <>
                                        {pyodide_output.map((e, index) => <pre inputMode="text" key={index} className="text-success pl-4">{e}</pre>)}
                                    </>
                                }
                                {pyodide_error.length > 0 &&
                                    <pre className="text-danger text-wrap break-words">{pyodide_error}</pre>
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="text-end pt-4">
                    <Button disabled={!pyodide_initialized} variant="outlined" color="primary" onClick={run_python}>
                        Execute
                    </Button>
                </div>
            </div>
        </section>


    )
}

export default Wasm