declare module 'react-qr-code' {
    import * as React from 'react';
  
    interface QRCodeProps {
      value: string;
      size?: number;
      fgColor?: string;
      bgColor?: string;
      level?: 'L' | 'M' | 'Q' | 'H';
      style?: React.CSSProperties;
      className?: string;
      includeMargin?: boolean;
      renderAs?: 'svg' | 'canvas';
    }
  
    const QRCode: React.FC<QRCodeProps>;
    export default QRCode;
  }
  