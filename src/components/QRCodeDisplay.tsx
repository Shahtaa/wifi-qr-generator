import React from 'react';
import { Box } from '@mui/material';
import QRCode from 'react-qr-code';

interface QRCodeDisplayProps {
  qrData: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ qrData }) => {
  return (
    <Box textAlign="center" marginTop="2rem">
      <QRCode value={qrData} size={256} />
    </Box>
  );
};

export default QRCodeDisplay;
