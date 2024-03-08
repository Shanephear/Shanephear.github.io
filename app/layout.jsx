import "@styles/global.scss";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import Themeregistry from "@components/themeregistry";
export const metadata = {
  title: "Exhibit",
  description: "This is a website to showcase the works of Shanephear John Cleetus",
  author: "Shanephear John Cleetus",
  keywords: "Shanephear, exibit.h, Shanephear John Cleetus, exibit.h project"

};
import Navbar from "@components/Navbar";
const RootLayout = ({ children }) => (
  <html lang='en'>
    <head>
      <meta charSet="UTF-8"></meta>
    </head>
    <body>
      <AppRouterCacheProvider options={{ key: 'css' }}>
        <Themeregistry>
          <Navbar />
          <main className='root'>
            <div className="app-container">
              {children}
            </div>
          </main>
        </Themeregistry>
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default RootLayout;