"use client"
import { BottomNavigation, BottomNavigationAction, IconButton, Snackbar, Button } from "@mui/material"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { ColorModeContext, questrial } from "@components/themeregistry";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useEffect, useState } from "react";
import React from "react";
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Navbar = () => {
    const [state, setState] = React.useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [value, setValue] = React.useState('h');
    const [profileicon, setProfile] = React.useState([
        { img: 'batman.jpeg', quote: 'It\'s not who I am underneath, but what I do that defines me', by: 'Batman' },
        { img: 'spiderman.jpg', quote: 'With great power comes great responsibility', by: 'Spiderman' },
        { img: 'naruto.png', quote: 'Failing doesn\'t give you a reason to give up, as long as you believe.', by: 'Naruto' },
        { img: 'icon.svg', quote: 'Code never lies,comments somtimes do', by: 'Ron Jeffries' },
        { img: 'interstellar.jpg', quote: 'Love is the one thing we\'re capable of perceiving that transcends time and space', by: 'Interstellar' }
    ])
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [ltmed, setLtmed] = useState(false)

    const colorMode = React.useContext(ColorModeContext);
    const pathname = usePathname();
    const [exibit_message, SetMessage] = useState('')
    const ex_icon_text = 'Exibit'
    const [exibit_icon, SetEicon] = useState(false)
    const [exibit_icon_text, setEText] = useState(-1)
    const checkpath = (path) => {
        if (path == pathname) {
            return 'var(--text-color-level1)'
        }
        return 'var(--text-color-level3)'
    }
    useEffect(() => {
        // Function to update window size
        const handleResize = () => {
            if (window.innerWidth < 959) {
                setLtmed(true)
            }
            else {
                setLtmed(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        if (pathname == '/') {
            SetEicon(true)
            setEText((exibit_icon_text + 1)%3)
            SetMessage("The Application is built using <span>Next.js</span> a react framework, <span>Tailwind</span> for css, <span>Material ui</span> for components and design inspired from <span>Material 3</span>.")
        }
        else if (pathname == '/wasm') {
            SetEicon(true)
            setEText((exibit_icon_text + 1)%3)
            SetMessage("The Web Assembly project is built using <span>emscripten</span> for transpiling C program to <span>web assembly</span>, <span>pyodide</span> which is a client side library built using emscripten to transpile python and <span>Monaco editor</span> for code editing.")
        }
        else if (pathname == '/video') {
            SetEicon(true)
            setEText((exibit_icon_text + 1)%3)
            SetMessage("The HLS Video Streaming project is built using <span>video.js</span> library for client side video rendering , <span>Django</span> for backend , <span>sqllite 3</span> for database, <span>ffmpeg</span> to perform video transcoding and the backend is available through a <span>Docker</span> image in docker hub.")
        }
        else {
            SetEicon(false)
            SetMessage('')
        }
    }, [pathname])
    const toggleDarkMode = () => {
        colorMode.toggleColorMode();
        const theme = document.documentElement.getAttribute('data-theme');
        setIsDarkMode(!isDarkMode)
    }

    const darkmodebtn = () => {
        return (
            <>
                {exibit_icon && <Tooltip title="About the application" placement="right" arrow>
                    <IconButton onClick={() => { setDialogOpen(true) }} sx={ltmed ? { marginRight: '0.5rem' } : { border: '1px solid var(--text-color-level3)', marginBottom: '1rem', borderRadius: '50% !important' }}>
                        {/* <TipsAndUpdatesIcon color="primary" className="nav-icon-exibit"></TipsAndUpdatesIcon> */}
                        <div className="nav-icon-exibit">{ex_icon_text[exibit_icon_text]}.H</div>
                    </IconButton>
                </Tooltip>}
                <Tooltip title="Toggle Dark mode" placement="right" arrow>
                    <IconButton onClick={toggleDarkMode} sx={ltmed ? { marginRight: '0.5rem' } : { border: '1px solid var(--text-color-level3)', marginBottom: '2rem', borderRadius: '50% !important' }}>
                        {isDarkMode ? <LightModeIcon color="primary" className="nav-icon" /> : <DarkModeIcon color="primary" className="nav-icon" />}
                    </IconButton>
                </Tooltip>
            </>
        )
    }
    const handleClick = () => {
        setState(true);
    };

    const handleClose = async () => {
        setState(false)
        setTimeout(() => {
            let new_state = [...profileicon]
            const append_value = new_state.shift(1)
            new_state.push(append_value)
            setProfile(new_state)
        }, 500)
    };

    return (
        <div className={`${questrial.variable}`}>
            <Dialog
                open={dialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => { setDialogOpen(false) }}
                aria-describedby="alert-dialog-slide-description"
            >
                {/* <DialogTitle><span className="logo-text-gradient text-2xl">Exibit.H</span></DialogTitle> */}
                <DialogContent>
                    <p className="text-sm pb-4 text-color-level-2">Note: This Dialog box tells how the page/application is exhibited</p>
                    <p className="exibit-lines" dangerouslySetInnerHTML={{ __html: exibit_message }} />
                </DialogContent>
                <DialogActions>
                    <div className="pr-4 pb-2">
                        <Button variant="outlined" onClick={() => { setDialogOpen(false) }}>Close</Button>
                    </div>
                </DialogActions>
            </Dialog>
            <Snackbar
                className={`${!ltmed ? 'pr-12' : 'pb-12'} snackbar`}
                anchorOrigin={ltmed ? { vertical: 'bottom', horizontal: 'center' } : { vertical: 'top', horizontal: 'right' }}
                open={state}
                onClose={handleClose}
                message={<div className="snackbar-msg">
                    <div>
                        <p>{profileicon[0].quote}
                        </p>
                        <i>-- {profileicon[0].by}
                        </i>
                    </div>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                }
            />
            {(pathname.startsWith('/portfolio') && ltmed) && <BottomNavigation
                elevation={5}
                className="fixed flex z-10 w-full bottom-0"
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >

                <BottomNavigationAction component={Link} href="/portfolio" value="h" label="Portfolio" icon={<HomeOutlinedIcon />} />
                <BottomNavigationAction component={Link} href="/portfolio/about" value="p" label="About" icon={<PersonOutlineOutlinedIcon />} />
                <BottomNavigationAction component={Link} href="/portfolio/experience" value="w" label="Experience" icon={<WorkOutlineOutlinedIcon />} />
                <BottomNavigationAction component={Link} href="/portfolio/resume" value="i" label="Resume" icon={<InsertDriveFileOutlinedIcon />} />
                <BottomNavigationAction component={Link} href="/portfolio/certifications" value="c" label="Certifications" icon={<CardMembershipOutlinedIcon />} />
            </BottomNavigation>}
            <nav className="top-nav">
                <div className="w-full"><Link className={`logo-txt ${pathname !== '/' ? 'logo-text-gradient' : ''}`} href="/">Exibit.H</Link></div>
                <div className="flex align-center">
                    {ltmed ? darkmodebtn() : <></>}
                    <div onClick={handleClick} className="profile-circle cursor-pointer">
                        <img alt="Profile image" src={`/${profileicon[0].img}`} />
                        <div></div>
                    </div>
                </div>
            </nav>
            <nav className="left-nav flex flex-col">
                {pathname.startsWith('/portfolio') ? <div className="h-full"><div className="flex flex-col justify-center items-center gap-3 h-full">
                    <Tooltip title="Portfolio" placement="right" arrow>
                        <IconButton component={Link} href="/portfolio" sx={{ color: checkpath("/portfolio") }}>
                            <HomeOutlinedIcon className="nav-icon" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="About" placement="right" arrow>
                        <IconButton component={Link} href="/portfolio/about" sx={{ color: checkpath("/portfolio/about") }}>
                            <PersonOutlineOutlinedIcon className="nav-icon" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Experience" placement="right" arrow>
                        <IconButton component={Link} href="/portfolio/experience" sx={{ color: checkpath("/portfolio/experience") }}>
                            <WorkOutlineOutlinedIcon className="nav-icon" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Resume" placement="right" arrow>
                        <IconButton component={Link} href="/portfolio/resume" sx={{ color: checkpath("/portfolio/resume") }}>
                            <InsertDriveFileOutlinedIcon className="nav-icon" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Certifications" placement="right" arrow>
                        <IconButton component={Link} href="/portfolio/certifications" sx={{ color: checkpath("/portfolio/certifications") }}>
                            <CardMembershipOutlinedIcon className="nav-icon" />
                        </IconButton>
                    </Tooltip>
                </div></div> : <div></div>}
                <div className="flex flex-col justify-end items-center h-full">
                    {darkmodebtn()}
                </div>
            </nav>
        </div >
    )
}

export default Navbar