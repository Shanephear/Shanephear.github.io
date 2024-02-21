import Chip from '@mui/material/Chip';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import WorkIcon from '@mui/icons-material/Work';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
const page = () => {
    return (
        <section className="standard-container page-animation pb-48-lt-m">
            <div className='flex gap-2 pb-8 animate-container'>
                <p className='text-2xl font-medium'>Experience</p>
                <Chip className='portfolio-chip' label="3 years 3 months" variant="outlined" />
            </div>
            <div className='animate-container-2'>
                <div className='experience-section flex gap-8'>
                    <div className='flex flex-col gap-8'>
                        <WorkIcon sx={{ fontSize: '20px', 'marginTop': '0.5rem' }} />
                        <div className='timeline'>
                        </div>
                    </div>
                    <div>
                        <p className='text-xl font-normal text-color-level-2'>Senior System Engineer (Full Stack Developer)</p>
                        <div className='pt-4 flex items-center gap-4'>
                            <p className='text-xl font-normal text-color-level-2'>Infosys</p>
                            <Chip size='small' className='portfolio-chip' label="Oct 2019 - Jul 2022 (2 years 10 months)" variant="outlined" />
                        </div>
                        <List>
                            <ListItem>
                                <RadioButtonUncheckedIcon sx={{ fontSize: '18px', paddingRight: '0.5rem' }} />
                                <p>Worked as a Full Stack Developer in a multi-tenant Learning and Training web application
                                    (product).</p>
                            </ListItem>
                            <ListItem>
                                <RadioButtonUncheckedIcon sx={{ fontSize: '18px', paddingRight: '0.5rem' }} />
                                <p>Involved significantly in changing the architecture from traditional to micro frontend
                                    and made it a progressive web app (PWA) leading to optimized API calls and build.</p>
                            </ListItem>
                            <ListItem>
                                <RadioButtonUncheckedIcon sx={{ fontSize: '18px', paddingRight: '0.5rem' }} />
                                <p>Revamped the player module, embracing micro frontend to address intricate use cases as
                                    both child and standalone application. </p>
                            </ListItem>
                            <ListItem>
                                <RadioButtonUncheckedIcon sx={{ fontSize: '18px', paddingRight: '0.5rem' }} />
                                <p>Optimized heavy payload hierarchy REST calls in player, resulting in a 33% reduction in
                                    execution time.</p>
                            </ListItem>
                            <ListItem>
                                <RadioButtonUncheckedIcon sx={{ fontSize: '18px', paddingRight: '0.5rem' }} />
                                <p>Developed an IFRAME communication framework for secured data transfer between host and
                                    child.</p>
                            </ListItem>
                            <ListItem>
                                <RadioButtonUncheckedIcon sx={{ fontSize: '18px', paddingRight: '0.5rem' }} />
                                <p>Designed a SCORM supportive player, implemented video streaming player using video.js
                                    library with encryption, transcoding, telemetry and created offline player for Android
                                    and IOS.</p>
                            </ListItem>
                            <ListItem>
                                <RadioButtonUncheckedIcon sx={{ fontSize: '18px', paddingRight: '0.5rem' }} />
                                <p>Developed the admin module reducing 75% backend requests.</p>
                            </ListItem>
                            <ListItem>
                                <RadioButtonUncheckedIcon sx={{ fontSize: '18px', paddingRight: '0.5rem' }} />
                                <p>Generated analytics reports by monitoring user progress in terms of learning and feature
                                    usage adhering to a telemetry standard with light weight programming techniques.</p>
                            </ListItem>
                        </List>
                    </div>
                </div>
                <div className='experience-section flex gap-8 pt-8'>
                    <WorkIcon sx={{ fontSize: '20px', 'marginTop': '0.5rem' }} />
                    <div>
                        <p className='text-xl font-normal text-color-level-2'>System Engineer Trainee (Full Stack Developer)</p>
                        <div className='pt-4 flex items-center gap-4'>
                            <p className='text-xl font-normal text-color-level-2'>Infosys</p>
                            <Chip size='small' className='portfolio-chip' label="May 2019 - Sep 2019 (5 months)" variant="outlined" />
                        </div>
                        <List>
                            <ListItem>
                                <RadioButtonUncheckedIcon sx={{ fontSize: '18px', paddingRight: '0.5rem' }} />
                                <p>Trained in Python, SQL, MongoDB (NoSQL), HTML, CSS, JavaScript, Node JS, React JS,
                                    Angular, Express JS as Full Stack developer.</p>
                            </ListItem>
                            <ListItem>
                                <RadioButtonUncheckedIcon sx={{ fontSize: '18px', paddingRight: '0.5rem' }} />
                                <p>Developed a sample Ticket Booking Application using React JS for UI and Node JS, Express
                                    JS, MongoDB for backend.</p>
                            </ListItem>
                        </List>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page