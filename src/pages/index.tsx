import Image from "next/image";
import Container from "@mui/material/Container";

import PanelLayout from "../layouts/panel";

export default function Home() {
  return (
    <PanelLayout>
      <Container
        maxWidth="lg"
        sx={{
          mt: 20,
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
      </Container>
    </PanelLayout>
  );
}
