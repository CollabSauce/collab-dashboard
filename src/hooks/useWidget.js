import { useEffect } from 'react';

const widgetAvailable = process.env.REACT_APP_SHOW_WIDGET;
const widgetUrl = process.env.REACT_APP_WIDGET_URL;

export const useWidget = () => {
  useEffect(() => {
    if (widgetAvailable) {
      const script = document.createElement('script');

      script.src = widgetUrl;
      script.async = true;
      script.type = 'text/javascript';

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);
};
