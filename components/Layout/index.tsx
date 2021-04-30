import { Box } from "@material-ui/core";
import { Aside } from "./index/Aside";
import { Footer } from "./index/Footer";
import { Header } from "./index/Header";
import { Meta } from "./index/Meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <Box bgcolor="#EAEDF2">
      <Meta />
      <Header />
      <Box display="flex" justifyContent="center">
        <main
          style={{ background: "#fff", width: "780px", marginRight: "34px" }}
        >
          {children}
        </main>
        <Aside />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
