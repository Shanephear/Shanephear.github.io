"use client"
import { Box, Button, Card, CardContent, CircularProgress, Divider, FormControl, IconButton, Input, InputLabel, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from 'axios'
import dynamic from "next/dynamic";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Link from 'next/link';
import Commonloading from "@components/loading";
const VideoPlayer = dynamic(() => import("@components/Videoplayer"), {
    ssr: false,
    loading:() => <>{Commonloading()}</>,
});

const Video = () => {
    // Initialization
    const demo_video_info = {
        title: 'How to run django backend',
        hls_file: '/hls/8866cbf4-e244-4151-b421-34d676e94720_master.m3u8',
        id: 'demo-video-exibit-h',
        duration: '01:28'
    }
    const uploading_inital_state = {
        upload: {
            loader: false,
            show_icon: false
        },
        convert: {
            loader: false,
            show_icon: false
        },
        meta: {
            loader: false,
            show_icon: false
        },
        start: false
    }
    const demo_video = {
        name: demo_video_info.title,
        dropped: false,
        player: true,
        id: demo_video_info.id,
        videojs: {
            autoplay: true,
            controls: true,
            loop: true,
            muted: true,
            sources: [
                {
                    src: demo_video_info.hls_file,
                    type: 'application/x-mpegURL',
                },
            ],
        }
    }
    const [formData, setFormData] = useState({
        title: '',
        video_file: null,
    })

    const [videoData, setVideoJs] = useState(demo_video);
    const [duration, setDuration] = useState(0)
    const [opacity, setOpacity] = useState(1)
    const [videoDetails, setVideoDetails] = useState([demo_video_info])
    const [deleting, setDeleting] = useState('')
    const [uploading, setUploading] = useState(uploading_inital_state)
    const [showMessage, setMessage] = useState(false)
    const [backend, setBackend] = useState(true)
    // Use Effect

    useEffect(() => {
        playVideo(demo_video_info)
        fetchVideoDetails();
    }, [])
    const fetchVideoDetails = (type) => {
        axios.get('http://127.0.0.1:8000/video/getall').then((response) => {
            [demo_video_info,...response.data].forEach((e) => {
                const du = Number(e.duration)
                const minutes = Math.floor(du / 60)
                const secondsRemaining = Math.floor(du % 60)
                e.duration = `${minutes > 9 ? String(minutes):('0' + String(minutes))}:${secondsRemaining > 9 ? String(secondsRemaining):('0' + String(secondsRemaining))}`
            })
            setVideoDetails([demo_video_info,...response.data])
            if (type == 'reset') {
                setUploading({
                    upload: {
                        loader: false,
                        show_icon: true
                    },
                    convert: {
                        loader: false,
                        show_icon: true
                    },
                    meta: {
                        loader: false,
                        show_icon: true
                    },
                    start: true
                })
                setMessage(true)
                setTimeout(() => {
                    set_uploading()
                    removeFile()
                    playVideo(response.data[0])
                }, 2000)
            }
            if (type == 'delete') {
                setDeleting('')
            }
        }).catch((err) => {
            if (type == 'reset') {
                set_uploading()
            }
            if (err.code == "ERR_NETWORK") {
                setBackend(false)
            }
            if (type == 'delete') {
                setDeleting('')
            }
        })
    }
    useEffect(() => {
        if (duration != 0) {
            upload_convert()
        }
    }, [duration])

    const set_uploading = () => {
        setUploading(uploading_inital_state)
        setMessage(false)
    }
    const handleUpload = () => {
        if (formData.video_file.size && formData.title) {
            setUploading({
                ...uploading,
                upload: {
                    loader: true,
                    show_icon: false
                },
                start: true
            })
            get_duration()
        }
    };

    const upload_convert = () => {
        const form = new FormData()
        Object.keys(formData).forEach(v => {
            form.set(v, formData[v])
        })
        form.set('duration', duration)
        axios.post('http://127.0.0.1:8000/video/upload', form).then((result) => {
            const id = result.data.id
            convert_video(id)
        }).catch(() => {
            set_uploading()
        })
    }
    const convert_video = (id) => {
        setUploading({
            ...uploading,
            upload: {
                loader: false,
                show_icon: true
            },
            convert: {
                loader: true,
                show_icon: false
            },
            start: true
        })
        axios.post(`http://127.0.0.1:8000/video/convert/${id}`, {}).then(() => {
            setUploading({
                ...uploading,
                upload: {
                    loader: false,
                    show_icon: true
                },
                convert: {
                    loader: false,
                    show_icon: true
                },
                meta: {
                    loader: true,
                    show_icon: false
                },
            })
            fetchVideoDetails('reset')
        }).catch(() => {
            set_uploading()
        })
    }
    const get_duration = () => {
        const video_file = new File([formData.video_file], 'video.mp4');
        const video_url = URL.createObjectURL(video_file);
        const ele = document.createElement('video');
        ele.src = video_url;
        ele.addEventListener('loadedmetadata', function () {
            setDuration(ele.duration)
            ele.remove()
        })
    }

    const dropHandler = (ev) => {
        setOpacity(1)
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            [...ev.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    previewVideo(file)
                }
            });
        }
    }

    const clickhandler = (ev) => {
        const fileinput = document.getElementById('input-file-form')
        fileinput.reset()
        if (!videoData.dropped) {
            document.getElementById('file-input').click()
        }
    }
    const opacityhandler = (ev) => {
        if (ev.target.id == 'drop_zone') {
            ev.stopPropagation();
            ev.preventDefault();
            setOpacity(1)
        }
    }
    const removeFile = () => {
        const fileinput = document.getElementById('input-file-form')
        fileinput.reset()
        setVideoJs({ player: false })
        setDuration(0)
        setFormData({
            title: '',
            video_file: null,
        })

    }

    const previewVideo = (videoInfo) => {
        setFormData({
            ...formData,
            video_file: videoInfo
        })
        const fileUrl = URL.createObjectURL(videoInfo);
        const fileType = videoInfo.type;
        setVideoJs({
            name: videoInfo.name,
            id: '',
            dropped: true,
            player: true,
            videojs: {
                autoplay: true,
                controls: true,
                loop: true,
                muted: true,
                sources: [
                    {
                        src: fileUrl,
                        type: fileType == 'video/quicktime' ? 'video/mp4' : fileType,
                    },
                ],
            },
        })

    }

    const playVideo = (videoInfo) => {
        setVideoJs({
            name: videoInfo.title,
            dropped: false,
            player: true,
            id: videoInfo.id,
            videojs: {
                autoplay: true,
                controls: true,
                loop: true,
                muted: true,
                sources: [
                    {
                        src: videoInfo.hls_file.startsWith('videos/') ? 'http://127.0.0.1:8000/media/' + videoInfo.hls_file : videoInfo.hls_file,
                        type: 'application/x-mpegURL',
                    },
                ],
            }
        })
    }

    const delete_video = (id) => {
        setDeleting(id)
        axios.delete(`http://127.0.0.1:8000/video/delete/${id}`).then(() => {
            if (videoData.id == id) {
                removeFile()
            }
            fetchVideoDetails('delete')
        }).catch(() => { })
    }

    const get_status = (type) => {
        return (
            <>
                {uploading[type].show_icon ? <CheckCircleOutlineIcon className="complete-icon"></CheckCircleOutlineIcon> :
                    <>
                        {uploading[type].loader ? <div><CircularProgress className="circular-progress-video"></CircularProgress></div> : <CheckCircleOutlineIcon className="complete-icon invisible"></CheckCircleOutlineIcon>}
                    </>
                }
            </>)
    }

    return (
        <section className="px-8">
            <div className='flex project-container gap-6'>
                <div className="w-1/2 sub-container pt-8 pb-4">
                    <h1>HLS Video Streaming</h1>
                    <p className="my-4 text-color-level-2">HTTP Live Streaming (HLS) is a video streaming protocol that can be used for live and on-demand streaming. HLS works by breaking video files into smaller HTTP files, which are then delivered using the HTTP protocol.</p>
                    <p className="my-4 text-color-level-2">It uses video and audio compression to transmit a stream via the MPEG-TS container format. The HTTP server then creates M3U8 playlists, also called manifest files, to keep the bits in order.</p>
                    <div className="flex flex-col gap-4 pb-6">
                        <div>
                            <h4 className="font-medium pb-2">Converting uploaded videos into M3U8 format</h4>
                            <p className="text-color-level-2 pb-2">
                                You can load a video file here, upload it to a django-powered backend server that runs locally in a docker environment, and it will convert it to m3u8 and store it on your file system.The videojs library is used to stream these videos in the browser.
                            </p>
                        </div>
                        <div style={{ borderColor: 'var(--text-color-level2)' }} className="border p-4 border-solid rounded-3xl">
                            <div className="flex item-start">
                                <InfoOutlinedIcon className="pr-1 text-color-level-2 text-sm" />
                                <div>
                                    <p className="text-color-level-2 text-sm">On page load, a demonstration of how to run the backend server locally and convert video is shown.</p>
                                    <p className="text-color-level-2 text-sm"><i>Note: Docker should be installed in your system to run this locally</i></p>
                                </div>
                            </div>
                            <div className="text-end pt-2">
                                <Link target='_blank' href="https://hub.docker.com/r/shanephear/exibit-django-backend">
                                    <Button variant="outlined" color="primary">
                                        Docker Image
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="pb-4">
                        <h5 className="font-medium pb-4">Run Django Server</h5>
                        <Paper className="code-paper" elevation={3}>
                            <pre className="code-snippet-header">Docker pull</pre>
                            <div className="code-snippet mb-4 flex items-center flex-between">
                                <code className="w-full">Docker pull shanephear/exibit-django-backend</code>
                                <IconButton onClick={()=>{navigator.clipboard.writeText("Docker pull shanephear/exibit-django-backend");}}><ContentCopyOutlinedIcon></ContentCopyOutlinedIcon></IconButton>
                            </div>
                        </Paper>
                        <Paper className="code-paper" elevation={3}>
                            <pre className="code-snippet-header">Docker run</pre>
                            <div className="code-snippet mb-2 flex items-center flex-between">
                                <code className="w-full">Docker run -p 8000:8000 shanephear/exibit-django-backend</code>
                                <IconButton onClick={()=>{navigator.clipboard.writeText("Docker run -p 8000:8000 shanephear/exibit-django-backend");}}><ContentCopyOutlinedIcon></ContentCopyOutlinedIcon></IconButton>
                            </div>
                        </Paper>
                    </div>
                    <div>
                        <h5 className="font-medium pb-4">Drop Files for HLS Conversion</h5>
                        <Card className="project-card p-1">
                            <CardContent>
                                <TextField className="w-full" autoComplete="off" onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        title: e.target.value
                                    })
                                }} required value={formData.title} name="text-input" label="Enter the file name" variant="outlined" />
                                <div className={`${videoData.dropped ? '' : 'cursor-pointer'}  relative mt-6`} style={{ opacity: `${opacity}` }}>
                                    {videoData.dropped ? <div className="drop-zone-abs">
                                        <div className="flex gap-2">
                                            <UploadFileIcon></UploadFileIcon>
                                            {videoData.name}
                                        </div>
                                    </div> : <div className="drop-zone-abs" >
                                        <UploadFileIcon className="upload-icon"></UploadFileIcon>
                                        <p>Click to Browse or Drag and Drop a file here</p>
                                        <p className="text-xs">File supported: avi, mov, mp4, webm, wmv</p>
                                    </div>
                                    }
                                    {videoData.dropped && <IconButton onClick={removeFile} className="removefile"><CloseIcon></CloseIcon></IconButton>}
                                    <div onClick={clickhandler} className="drop-zone"
                                        onDragEnter={(e) => { e.stopPropagation(); e.preventDefault(); setOpacity(0.5) }}
                                        onDragLeave={opacityhandler} id="drop_zone" onDragOver={(ev) => { ev.preventDefault(); }} onDrop={dropHandler}></div>
                                </div>
                                <form id='input-file-form' className="hidden">
                                    <Input
                                        onChange={(event) => { previewVideo(event.target.files[0]) }}
                                        type="file"
                                        id="file-input"
                                        name="file-input"
                                    />
                                </form>
                                <div className="flex justify-between items-center pt-4">
                                    <p className={`text-sm pl-4 text-danger ${!backend ? '' : 'invisible'}`}>Backend Server not found</p>
                                    <Button onClick={handleUpload} disabled={!(formData.video_file && formData.title) || uploading.start || !backend} variant="contained" color="primary">Upload</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="pt-4">
                        <h5 className="pb-4">Uploaded Videos</h5>
                        <Card className={`project-card p-1 ${deleting ? 'pointer-events-none' : ''}`}>
                            <CardContent>
                                <div className="flex gap-2">
                                    <div className="flex justify-between items-center w-full px-2">
                                        <p className="text-start font-bold text-color-level-2"> <PlayCircleOutlineIcon className="invisible mr-1"></PlayCircleOutlineIcon>Title</p>
                                        <p className="font-bold text-color-level-2">Duration</p>
                                    </div>
                                    <IconButton className="invisible"><DeleteOutlineIcon></DeleteOutlineIcon></IconButton>
                                </div>
                                <Divider variant="middle"></Divider>
                                {
                                    videoDetails.length > 0 ?
                                        videoDetails.map((vi, index) => (
                                            <div key={vi.id}>
                                                <div className="flex gap-2 py-1 items-center justify-center">
                                                    <PlayCircleOutlineIcon className={`${videoData.id == vi.id ? '' : 'invisible'}`} ></PlayCircleOutlineIcon>
                                                    <Button onClick={(e) => { playVideo(vi) }} className={`w-full ${videoData.id == vi.id ? 'pointer-events-none' : ''}`}>
                                                        <div className="flex justify-between items-center w-full">
                                                            <p className="text-start">{vi.title}</p>
                                                            <p>{vi.duration}</p>
                                                        </div>
                                                    </Button>
                                                    {
                                                        deleting == vi.id ? <div className="delete-progress-div flex items-center"><CircularProgress className="delete-progress m-2" /></div> :
                                                            <IconButton disabled={vi.id == demo_video_info.id} onClick={() => { delete_video(vi.id) }}><DeleteOutlineIcon></DeleteOutlineIcon></IconButton>
                                                    }
                                                </div>
                                                {index == videoDetails.length - 1 ? <></> : <Divider variant="middle"></Divider>}
                                            </div>
                                        ))
                                        : <div></div>
                                }
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="w-1/2 sub-container">
                    <div className="project-video sticky top-0">
                        {
                            uploading.start ?
                                <Card id="project-video-card">
                                    <CardContent id="project-video-card-content">
                                        <div className="card-div flex justify-center items-center h-full">
                                            <div className="upload-loader">
                                                <div><div>{get_status('upload')}</div><p>Uploading...</p></div>
                                                <div><div>{get_status('convert')}</div><p>Converting...</p></div>
                                                <div><div>{get_status('meta')}</div><p>Fetching meta...</p></div>
                                                <div className={`${showMessage ? '' : 'invisible'}`}><div><CircularProgress className="circular-progress-video" /></div><p>The uploaded video will play now</p></div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card> : <> {videoData.player ? <VideoPlayer options={videoData.videojs}></VideoPlayer> : <Card id="project-video-card">
                                    <CardContent id="project-video-card-content">
                                        <div className="card-div flex flex-col justify-center items-center h-full project-video-border">
                                            <div>
                                                <h3>
                                                    Video appears here :)
                                                </h3>
                                            </div>
                                        </div>
                                    </CardContent></Card>}</>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Video