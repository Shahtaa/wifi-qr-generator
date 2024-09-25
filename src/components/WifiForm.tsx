import React, { useState } from 'react';
import { TextField, Button, Grid, FormControlLabel, Checkbox } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi'; // Importing Wifi Icon

interface WifiFormProps {
  setQrData: (data: string) => void;
}

const WifiForm: React.FC<WifiFormProps> = ({ setQrData }) => {
  const [ssid, setSsid] = useState('');
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [key, setKey] = useState('');
  const [hidden, setHidden] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = `WIFI:S:${ssid};T:${encryption};P:${key};H:${hidden};`;
    setQrData(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="SSID"
            variant="outlined"
            fullWidth
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            sx={{ bgcolor: '#f9f9f9' }} // Light background for input
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Encryption"
            variant="outlined"
            select
            fullWidth
            SelectProps={{
              native: true,
            }}
            value={encryption}
            onChange={(e) => setEncryption(e.target.value as 'WPA' | 'WEP' | 'nopass')}
            sx={{ bgcolor: '#f9f9f9' }} // Light background for input
          >
            <option value="WPA">WPA/WPA2/WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No Password</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Key"
            variant="outlined"
            type="password"
            fullWidth
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={encryption === 'nopass'}
            sx={{ bgcolor: '#f9f9f9' }} // Light background for input
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={hidden}
                onChange={(e) => setHidden(e.target.checked)}
                color="primary"
              />
            }
            label="Hidden Network"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"  // Use 'contained' variant for a solid button
            color="primary"      // Set the primary color
            fullWidth
            startIcon={<WifiIcon />} // Add the icon here
            sx={{
              borderRadius: '25px', // Round edges for a modern look
              padding: '10px',      // Padding for comfort
              '&:hover': {          // Custom hover effect
                backgroundColor: '#0056b3', // Darker shade on hover
              },
            }}
          >
            Generate QR Code
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default WifiForm;
