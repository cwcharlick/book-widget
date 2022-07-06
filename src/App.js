import './App.css';
import React, { useState, useEffect } from 'react';
import Widget from './components/Widget';
import { getPublicRestaurant, getPublicStyles } from './api/public';

function App() {
  const [restaurantId, setRestaurantId] = useState();
  let defaultStyle = {
    logoUrl: undefined,
    homeUrl: undefined,
    logoStyle: {},
    colors: {
      accent: '#1e90ff',
      background: '#ffffff',
      primary: 'rgb(30, 30, 30)',
      secondary: 'rgb(100, 100, 100)',
      tertiary: 'rgb(210, 210, 210)',
      danger: 'orange',
    },
    phone: '01934 123 456',
  };
  const [style, setStyle] = useState(defaultStyle);
  const [loading, setLoading] = useState(true);

  // style = {
  //   logoUrl: 'https://i.ibb.co/VM1ktWW/newinncross.webp',
  //   homeUrl: 'https://www.newinncross.co.uk/',
  //   logoStyle: { width: 566, height: 362 },
  //   colors: {
  //     accent: 'rgb(164,152,115)',
  //     background: '#000000',
  //     primary: 'rgb(200, 200, 200)',
  //     secondary: 'rgb(100, 100, 100)',
  //     tertiary: 'rgb(100, 100, 100)',
  //     danger: 'rgb(191,149,21)',
  //   },
  //   phone: '01934 123 457',
  // };

  const slug = window.location.pathname.split('/')[1];
  useEffect(() => {
    getPublicRestaurant(slug).then((v) => {
      setRestaurantId(v);
    });
  }, []);

  useEffect(() => {
    if (!restaurantId) return;
    getPublicStyles(restaurantId)
      .then((v) => {
        const res = v[0];

        console.log('no wai', res, style);
        setStyle(res);
        setLoading(false);
      })
      .catch((e) => e.throw);
  }, [restaurantId]);

  if (loading) return;

  return (
    <div
      className="main-container"
      style={{
        '--accent': style.colors.accent,
        '--primary': style.colors.primary,
        '--background': style.colors.background,
        '--secondary': style.colors.secondary,
        '--tertiary': style.colors.tertiary,
        '--danger': style.colors.danger,
        flexDirection: 'column',
        background: style.colors.background,
        color: style.colors.primary,
      }}
    >
      <div>
        <img
          src={style.logoUrl}
          alt="logo"
          style={{
            marginTop: 20,
            width: style.logoStyle.width,
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: 350,
          marginTop: 20,
        }}
      >
        <div style={{ flex: 1, paddingLeft: 20 }}></div>
        <div style={{ fontSize: '1.3rem' }}>Make a Booking</div>
        <div style={{ flex: 1, justifyContent: 'flex-end', paddingRight: 20 }}>
          <a
            href={style.homeUrl}
            style={{
              textDecoration: 'none',
              color: 'var(--accent)',
            }}
          >
            Home
          </a>
        </div>
      </div>
      <hr style={{ marginTop: 30 }} />
      <div className="middle-container">
        <Widget restaurantId={restaurantId} />
      </div>
    </div>
  );
}

export default App;
