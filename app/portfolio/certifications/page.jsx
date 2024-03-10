"use client"
import Link from 'next/link';
import { Box, Card, CardActionArea } from "@mui/material"
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
const page = () => {
    return (
        <section className="standard-container page-animation pb-60-lt-m">
            <p className='text-2xl font-medium mb-8 animate-container'>Certifications</p>
            <div className="flex flex-col gap-8 pl-8">
                <Card className="animate-container-2 certification-card-parent" component={Link} target="_blank" href="https://www.credly.com/badges/a0af4319-53c9-49a2-8436-dd845f9536bf/linked_in_profile">
                    <CardActionArea>
                        <div className="w-full certification-card flex">
                            <div className="certi-icon-container">
                                <VerifiedUserOutlinedIcon className="certi-icon"></VerifiedUserOutlinedIcon >
                            </div>
                            <div className="p-4">
                                <p className="text-xl pb-3">AWS Certified Cloud Practitioner</p>
                                <p className="text-color-level-2">Amazon Web Services (AWS)</p>
                                <p className="text-color-level-2">Certified on May 2023</p>
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
                <Card className=" animate-container-2 certification-card-parent" component={Link} target="_blank" href="https://www.coursera.org/account/accomplishments/certificate/JPR76M4KHNKV">
                    <CardActionArea>
                        <div className="w-full certification-card flex">
                            <div className="certi-icon-container">
                                <SecurityOutlinedIcon className="certi-icon"></SecurityOutlinedIcon>
                            </div>
                            <div className="p-4">
                                <p className="text-xl pb-3">Algorithmic Toolbox (University of California San Diego)</p>
                                <p className="text-color-level-2">Coursera</p>
                                <p className="text-color-level-2">Certified on Aug 2023</p>
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
                <Card className="animate-container-2 certification-card-parent" component={Link} target="_blank" href="https://www.credly.com/badges/79743106-8124-42a1-93da-ffd3da942070/linked_in_profile">
                    <CardActionArea>
                        <div className="w-full certification-card flex">
                            <div className="certi-icon-container">
                                <VerifiedUserOutlinedIcon className="certi-icon"></VerifiedUserOutlinedIcon >
                            </div>
                            <div className="p-4">
                                <p className="text-xl pb-3">AWS Certified Solutions Architect</p>
                                <p className="text-color-level-2">Amazon Web Services (AWS)</p>
                                <p className="text-color-level-2">Certified on Dec 2023</p>
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
                <Card className="animate-container-2 certification-card-parent" component={Link} target="_blank" href="https://certificates.cs50.io/b9a52243-01f0-4b46-bc66-f836833b22c5.pdf">
                    <CardActionArea>
                        <div className="w-full certification-card flex">
                            <div className="certi-icon-container">
                                <LocalPoliceOutlinedIcon className="certi-icon"></LocalPoliceOutlinedIcon>
                            </div>
                            <div className="p-4">
                                <p className="text-xl pb-3">CS50’s Introduction to Computer Science</p>
                                <p className="text-color-level-2">CS50</p>
                                <p className="text-color-level-2">Certified on Feb 2024</p>
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            </div>
        </section>
    )
}

export default page