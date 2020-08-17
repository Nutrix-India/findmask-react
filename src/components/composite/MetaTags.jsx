import React from 'react';
import Head from 'next/head';
import { lightTheme } from '@constants/index';

const appUrl = 'https://findmask.ml/';

const MetaTags = () => {
  const title = 'Mask Detector';
  const description = 'A Deep Learning based server-less REST API client';
  const ogUrl = `${appUrl}og.png`;
  const canonicalUrl = appUrl;
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta property="og:image" content={ogUrl} />
      <meta property="twitter:image" content={ogUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary" />
      <meta property="og:type" content="website" />
      <meta
        name="author"
        content="Vinay Kudari, Jaswanth Sai Sattenapalli &amp; Vaishnavi Chityala"
      />
      <meta
        name="keywords"
        content="mask detection, recognition, REST api, AI, Deep Learning, object detection, Vinay Kudari, Jaswanth Sai Sattenapalli, Vaishnavi Chityala, find mask"
      />
      <meta name="theme-color" content={lightTheme.colors.blueGreen} />
      <meta name="twitter:site" content="@nutrix-ind" />
      <meta property="og:site_name" content="Mask Detector" />
    </Head>
  );
};

export default MetaTags;
