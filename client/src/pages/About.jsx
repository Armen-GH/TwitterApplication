import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center">
      {/* Logo */}
      <div className="mb-6">
        <Twitter size={48} className="text-blue-500" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-center">About This Platform</h1>

      {/* Description */}
      <div className="text-gray-400 text-center max-w-2xl space-y-4 text-base">
        <p>
          Welcome to our Twitter/X clone; a social media platform where users share short, real-time posts called tweets.
        </p>
        <p>
          Designed as part of a full-stack development curriculum, this app merges modern tech with real-world functionality.
        </p>
        <p>
          You can post text, images, videos, or even polls to engage with the community instantly.
        </p>
        <p>
          Features like hashtags, mentions, and retweets make interactions dynamic and contextual.
        </p>
        <p>
          Enjoy a real-time feed, push notifications, and PWA support for a seamless experience.
        </p>
        <p>
          Built with React, NodeJS, and PostgreSQL/MongoDB, it's scalable and production-ready.
        </p>
        <p>
          Explore user profiles, manage your account, and search for others with ease.
        </p>
        <p>
          Stay connected, express freely, and be part of meaningful conversations — all in one place.
        </p>
      </div>

      {/* Back link */}
      <Link to="/login" className="mt-10 text-blue-400 hover:underline text-sm">
        ← Back to Login
      </Link>
    </div>
  );
};

export default About;
