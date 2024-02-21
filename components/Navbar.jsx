"use client"
import { BottomNavigation, BottomNavigationAction, IconButton, Snackbar } from "@mui/material"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { questrial } from "@components/themeregistry";
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

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const Navbar = () => {
    const [state, setState] = React.useState(false)
    const [value, setValue] = React.useState('h');
    const [profileicon, setProfile] = React.useState([
        // { img: 'icon.svg', quote: 'Code never lies,comments somtimes do', by: 'Ron Jeffries' },
        { img: 'interstellar.jpg', quote: 'Love is the one thing we\'re capable of perceiving that transcends time and space', by: 'Interstellar' },
        { img: 'batman.jpeg', quote: 'It\'s not who I am underneath, but what I do that defines me', by: 'Batman' },
        { img: 'spiderman.jpg', quote: 'With great power comes great responsibility', by: 'Spiderman' },
        { img: 'naruto.png', quote: 'Failing doesn\'t give you a reason to give up, as long as you believe.', by: 'Naruto' }

    ])
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [ltmed, setLtmed] = useState(false)

    const colorMode = React.useContext(ColorModeContext);
    const pathname = usePathname();
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
    const toggleDarkMode = () => {
        colorMode.toggleColorMode();
        const theme = document.documentElement.getAttribute('data-theme');
        setIsDarkMode(!isDarkMode)
    }

    const darkmodebtn = () => {
        return (
            <Tooltip title="Toggle Dark mode" placement="right" arrow>
                <IconButton onClick={toggleDarkMode} sx={ltmed ? { marginRight: '1rem' } : { border: '1px solid var(--text-color-level3)', marginBottom: '2rem', borderRadius: '50% !important' }}>
                    {isDarkMode ? <LightModeIcon color="primary" className="nav-icon" /> : <DarkModeIcon color="primary" className="nav-icon" />}
                </IconButton>
            </Tooltip>
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
                        <CloseIcon/>
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
            </BottomNavigation>}
            <nav className="top-nav">
                <Link className="w-full logo-txt " href="/">Exibit.H</Link>
                <div onClick={handleClick} className="cursor-pointer flex align-center">
                    {ltmed ? darkmodebtn() : <></>}
                    <div className="profile-circle">
                        <img alt="Profile image" src={`./${profileicon[0].img}`} />
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
                </div></div> : <div></div>}
                <div className="flex flex-col justify-end items-center h-full">
                    {darkmodebtn()}
                </div>
            </nav>
        </div >
    )
}

export default Navbar