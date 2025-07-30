import Image from "next/image";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";

import PanelLayout from "../layouts/panel";

export default function Home() {
  return (
    <PanelLayout>
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 400,
            mx: "auto",
            pt: 20,
            height: 80,
          }}
        >
          <Image
            src="/ZimaLogo.svg"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            width={258}
            height={104}
            alt="CashInRevenue"
            loading="eager"
            priority
          />
        </Box>
      </Container>
    </PanelLayout>
  );
}
