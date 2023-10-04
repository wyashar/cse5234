import React from "react";
import YasharHeadshot from "../Images/headshotYashar.jpg";
import HunterHeadshot from "../Images/suitHunter.jpg";
import MacrayHeadshot from "../Images/HeadshotMac.jpg";

const About = () => {
  
  const headingStyle = {
    marginTop: "20px",
    marginBottom: "40px",
  };

  return (
      <div className="container">
        <h1 style = {headingStyle}>About Us</h1>
        <div className="row">
          <div className="col-md-4">
            <h1>Macray Curran - CEO</h1>
            <img src={MacrayHeadshot} width="256" height="256"></img>
            <p>Macray is the visionary leader at the helm of our company. With a passion for innovation and a strong background in computer science, Macray has a track record of transforming startups into industry leaders. Prior to founding our company, Macray served as the CTO of a renowned tech firm, where he led groundbreaking projects in artificial intelligence and software development. His strategic thinking and commitment to fostering a culture of creativity make him a driving force behind our company's success.</p>
          </div>
          <div className="col-md-4">
            <h1>Yashar Bakhshaeisarand - CFO</h1>
            <img src={YasharHeadshot} width="256" height="256"></img>
            <p>Yashar, our CFO, brings a wealth of financial expertise to the team, combined with a deep understanding of technology. Having worked in both finance and software engineering roles, Yashar possesses a unique skill set that bridges the gap between technology and fiscal responsibility. Before joining our company, he served as the finance director of a cutting-edge startup, where he orchestrated successful funding rounds and managed complex financial strategies.</p>
          </div>
          <div className="col-md-4">
            <h1>Hunter Ashburn - CIO</h1>
            <img src={HunterHeadshot} width="256" height="256"></img>
            <p>Hunter, our CIO, is the tech genius who ensures our company's digital infrastructure runs seamlessly. With a background in computer science and a string of impressive achievements in software engineering, Hunter is a natural fit for this role. Prior to joining our team, he led the development of groundbreaking software solutions at a prominent tech giant, earning a reputation for his innovative problem-solving and forward-thinking approach to technology.</p>
          </div>
        </div>
      </div>
  );
};
  
export default About;