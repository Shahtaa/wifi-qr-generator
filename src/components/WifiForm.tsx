import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
} from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import { SnackbarCloseReason } from '@mui/material/Snackbar';

interface WifiFormProps {
  setQrData: (data: string) => void;
}

const WifiForm: React.FC<WifiFormProps> = ({ setQrData }) => {
  const [ssid, setSsid] = useState('');
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [key, setKey] = useState('');
  const [hidden, setHidden] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const validateInput = () => {
    if (ssid.length < 8 || ssid.length > 32) {
      setSnackbarMessage('SSID must be between 8 and 32 characters long.');
      setSnackbarOpen(true);
      return false;
    }
    if (!ssid) {
      setSnackbarMessage('SSID is required.');
      setSnackbarOpen(true);
      return false;
    }

    // Validation for Key (password)
    if (encryption !== 'nopass' && key.length < 8) {
      setSnackbarMessage('Password must be at least 8 characters long.');
      setSnackbarOpen(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInput()) return;

    const data = `WIFI:S:${ssid};T:${encryption};P:${key};H:${hidden};`;
    setQrData(data);

    // Clear inputs after submission
    setSsid('');
    setKey('');
    setHidden(false);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="ssid"         // Unique ID for the SSID input
            name="ssid"       // Name attribute for the SSID input
            label="SSID"
            variant="outlined"
            fullWidth
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            autoComplete="ssid" // Autocomplete attribute for better autofill
            sx={{ bgcolor: '#f9f9f9' }}
            required // Mark as required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="encryption"    // Unique ID for the encryption input
            name="encryption"  // Name attribute for the encryption input
            label="Encryption"
            variant="outlined"
            select
            fullWidth
            SelectProps={{
              native: true,
            }}
            value={encryption}
            onChange={(e) => setEncryption(e.target.value as 'WPA' | 'WEP' | 'nopass')}
            sx={{ bgcolor: '#f9f9f9' }}
          >
            <option value="WPA">WPA/WPA2/WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No Password</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="key"          // Unique ID for the key input
            name="key"        // Name attribute for the key input
            label="Key"
            variant="outlined"
            type="password"
            fullWidth
            value={key}
            onChange={(e) => setKey(e.target.value)}
            disabled={encryption === 'nopass'}
            autoComplete="current-password" // Autocomplete attribute for better autofill
            sx={{ bgcolor: '#f9f9f9' }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={hidden}
                onChange={(e) => setHidden(e.target.checked)}
                color="primary"
                id="hidden-network" // Unique ID for the hidden network checkbox
                name="hidden-network" // Name attribute for the hidden network checkbox
              />
            }
            label="Hidden Network"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<WifiIcon />}
            sx={{
              borderRadius: '25px',
              padding: '10px',
              '&:hover': {
                backgroundColor: '#0056b3',
              },
            }}
          >
            Generate QR Code
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default WifiForm;
