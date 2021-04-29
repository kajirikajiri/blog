import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { Button, createStyles, makeStyles, Popover, Typography, Theme } from '@material-ui/core'

type Props = {
  children?: ReactNode
  title?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
  }),
);

const Layout = ({ children, title = 'This is the default title' }: Props) => {
    const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>
    <header>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <Image src="/a.jpg" width="256" height="68"></Image>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Open Popover
      </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
        <Typography className={classes.typography}>The content of the Popover.</Typography>

        </Popover>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
        |{' '}
          <Link href="/about">
            <a>About</a>
          </Link>{' '}
        |{' '}
          <Link href="/users">
            <a>Users List</a>
          </Link>{' '}
        | <a href="/api/users">Users API</a>
        </nav>
      </div>
    </header>
    {children}
    <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer>
  </div>
)
        }

export default Layout
