import React, { useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import WifiForm from './components/WifiForm';
import QRCodeDisplay from './components/QRCodeDisplay';

const App: React.FC = () => {
  const [qrData, setQrData] = useState<string | null>(null);

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Paper elevation={5} style={{ padding: '2rem', borderRadius: '10px', backgroundColor: '#ffffff' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
          WiFi QR Code Generator
        </Typography>
        <WifiForm setQrData={setQrData} />
        {qrData && <QRCodeDisplay qrData={qrData} />}
      </Paper>
    </Container>
  );
};

export default App;
