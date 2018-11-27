import React from 'react';
import HomeCard from '../Components/Elements/HomeCard';

const Home = () => {
  return (
    <div className="home">
      <div className="box">
        <div className="home-cards">
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </div>
      </div>
    </div>
  );
};

export default Home;