"use client"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';
var rendered = false;
const Home = () => {
  useEffect(() => {
    if (!rendered) {
      setTimeout(() => {
        rendered = true;
      }, 4000)
    }
  });
  return (<section className={`page-container  ${rendered ? 'page-animation' : 'initial-animation'} `}>
    <div className='about-container'>
      <div className='w-fit'>
        <h1 className='text-wrap font-medium type-heading heading-animation'>Hello,This is project Exibit.H </h1>
      </div>
      <br></br>
      <p className='text-lg animate-container'>&ldquo;Exibit.H, a web application crafted by Shanephear John Cleetus, serves as a captivating
        showcase for all my projects. The name &prime;Exibit.H&prime; cleverly combines &prime;exhibit&prime; with a touch of uniqueness,
        reflecting the platform&prime;s purpose. Explore this immersive space curated by me to experience a comprehensive presentation of my work,
        seamlessly presented and easily accessible in one centralized location.&rdquo;</p>
    </div>
    <div className='contents-container animate-container-2 flex flex-col gap-16'>
      <div>
        <h2>Portfolio</h2>
        <div className='flex'>
          <Link href="/portfolio">
            <Card className='card' sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  className='card-image'
                  image="/profile.svg"
                />
                <CardContent>
                  <p>
                    Designing tommorow today.Get to know me.
                  </p>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
      </div>
      <div>
        <h2>Github Projects</h2>
        <div className='flex gap-8 flex-wrap'>
          <Card target='_blank' component={Link} href='https://github.com/Shanephear/text_editor' className='card' sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                className='card-image'
                image="/rs_editor.jpg"
              />
              <CardContent>
                <p className='font-black pb-4'>RS Editor: Text Editor</p>
                <p className='text-sm'>
                  Developed a text editor using C utilizing termios.h for customized terminal configuration and code driven input
                  handling for file operations like read, write, edit, save, and search.
                </p>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card component={Link} target='_blank' href='https://github.com/Shanephear/decision_t_reg_car' className='card' sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                className='card-image'
                image="/regressor.jpg"
              />
              <CardContent>
                <p className='font-black pb-4'>
                  Used Car Price Prediction
                </p>
                <p className='text-sm'>Employed a prediction model using Decision Tree Regressor without and with imputed data (using an
                  approximation method and HistGradientBoostingClassifier).</p>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  </section>)
}

export default Home;