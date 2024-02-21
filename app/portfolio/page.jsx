"use client"
import Button from '@mui/material/Button';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import Chip from '@mui/material/Chip';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { dm_mono } from '@components/themeregistry';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Portfolio = () => {
    const [copy_text, update_text] = useState('Copy email')
    const [time, setTime] = useState('')
    const copyToClipboard = () => {
        navigator.clipboard.writeText("shanephear.jc@gmail.com");
        update_text("Copied");
        setTimeout(() => {
            update_text("Copy email");
        }, 2 * 1000)
    }
    const updateCurrentTime = () => {
        let currentTime = new Date();
        let hours_24 = currentTime.getHours();
        let hours_12 = hours_24 % 12;
        let minutes = currentTime.getMinutes();
        hours_12 = hours_12 < 10 ? "0" + hours_12 : hours_12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        setTime((hours_12 == 0 ? 12 : hours_12) + ":" + minutes + (hours_24 > 11 ? ' PM' : ' AM'))
    }
    useEffect(() => {
        updateCurrentTime();
        setInterval(() => {
            updateCurrentTime();
        }, 1000);
    })
    return (
        <section className="standard-container flex flex-col gap-10 page-animation pb-60-lt-m">
            <div className={`${dm_mono.variable} animate-container`}>
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className='location h-10 text-color-level-3 font-black' id="current-time">{time}</div>
                    <div className="profile-circle-lg">
                        <Image alt='Profile image' src="/profile.svg"/>
                        <div></div>
                    </div>
                    <div>
                        <p className='text-2xl font-medium mb-2'>Shanephear John Cleetus</p>
                        <p className='text-xl font-normal text-color-level-2 mb-2'>MS in Information Technology Management</p>
                        <p className="blinker-container mb-3">
                            <span className="available"></span>
                            <span className='text-color-level-2'>Available for new opportunities</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link target='_blank' href="https://www.linkedin.com/in/shanephear-john-cleetus-875776197">
                            <Button className='portfolio' variant="contained" color="primary">
                                LinkedIn
                                <LinkedInIcon className='ml-1 small-icon-level1' />
                            </Button>
                        </Link>
                        <p>or</p>
                        <Button onClick={copyToClipboard} className='portfolio' variant="outlined" color="primary">
                            {copy_text}
                            <ContentCopyOutlinedIcon className='ml-1 small-icon-level2' />
                        </Button>
                    </div>
                    <p className='location h-10 text-color-level-3 flex items-center justify-center font-black'>RICHARDSON, TX, USA 32.9483° N, 96.7299° W</p>
                </div>
            </div>
            <div className='portfolio-section flex gap-16 portfolio-about animate-container-2'>
                <p className='portfolio-heading'>About</p>
                <div>
                    <p>I am Shanephear John Cleetus currently pursuing Masters in Information Technology and
                        Management
                        with 3 years of experience as a Full stack developer.</p>
                    <br></br>
                    <p>I would describe myself as follows: If something fascinates me, I will give it my all. I
                        prefer
                        unconventional
                        methods and wind up exploring a lot of concepts in the process, resulting in a beneficial
                        outcome that has always
                        delighted me. Whenever I encounter blank pages, the drive to fill them arises because doing
                        so
                        will be worth every
                        second I put in.</p>
                    <div className='h-4'></div>
                    <Link href="portfolio/about">
                        <Button className='portfolio w-full' variant="outlined" color="primary">
                            View All
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='portfolio-section flex gap-16 animate-container-2'>
                <p className='portfolio-heading'>Education</p>
                <div className='w-full'>
                    <div className='flex'>
                        <div className='portfolio-icon flex items-center justify-center rounded-lg'>
                            <SchoolOutlinedIcon sx={{ color: 'var(--primary-color-level2-contrastText)' }} />
                        </div>
                        <div className='pl-4 w-full'>
                            <p>The University of Texas at Dallas</p>
                            <p className='text-sm pb-2'>Master&prime;s degree, Information Technology and Management</p>
                            <Chip className='portfolio-chip' label="Aug 2022 - May 2024" variant="outlined" />
                            <hr className='m-5 mx-0 divider'></hr>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='portfolio-icon flex items-center justify-center rounded-lg'>
                            <SchoolOutlinedIcon sx={{ color: 'var(--primary-color-level2-contrastText)' }} />
                        </div>
                        <div className='pl-4 w-full'>
                            <p>St. Joseph&prime;s College Of Engineering</p>
                            <p className='text-sm pb-2'>Bachelor of Engineering - BE, Electronics and Communication Engineering</p>
                            <Chip className='portfolio-chip' label="Jul 2015 - Apr 2019" variant="outlined" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='portfolio-section flex gap-16 animate-container-2'>
                <p className='portfolio-heading'>Experience</p>
                <div className='w-full'>
                    <div className='flex'>
                        <div className='portfolio-icon outline flex items-center justify-center rounded-lg'>
                            <WorkOutlineOutlinedIcon sx={{ color: 'var(--primary-color-level2)' }} />
                        </div>
                        <div className='pl-4 w-full'>
                            <p>Senior System Engineer (Full Stack Developer)</p>
                            <p className='text-sm pb-2'>Infosys</p>
                            <Chip className='portfolio-chip' label="Oct 2019 - Jul 2022" variant="outlined" />
                            <Chip className='portfolio-chip' label="2 years 10 months" variant="outlined" />
                            <hr className='m-5 mx-0 divider'></hr>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='portfolio-icon flex outline items-center justify-center rounded-lg'>
                            <WorkOutlineOutlinedIcon sx={{ color: 'var(--primary-color-level2)' }} />
                        </div>
                        <div className='pl-4 w-full'>
                            <p>System Engineer Trainee (Full Stack Developer)</p>
                            <p className='text-sm pb-2'>Infosys</p>
                            <Chip className='portfolio-chip' label="May 2019 - Sep 2019" variant="outlined" />
                            <Chip className='portfolio-chip' label="5 months" variant="outlined" />
                        </div>
                    </div>
                    <div className='h-4'></div>
                    <Link href="portfolio/experience">
                        <Button className='portfolio w-full' variant="outlined" color="primary">
                            View All
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Portfolio