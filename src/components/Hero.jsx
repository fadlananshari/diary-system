import Profile from '../assets/profile.png';


const Hero = () => {

  return (
    <div id="about" className="pt-20 xl:pt-36 text-6xl mx-auto font-montserrat">
      <div className="relative overflow-hidden h-[80vh] md:h-[65vh] text-center lg:text-start">
        <div className="absolute grid lg:grid-flow-col lg:gap-20 xl:gap-32 mt-5 md:mt-10 mx-auto overflow-hidden">
          <div className="">
            <img src={Profile} alt="" className="left-0 w-[150px] md:w-[230px] lg:w-[350px] bg-blue-300 rounded-full mx-auto" />
          </div>
          <div className="overflow-hidden h-full my-auto pb-5">
            <h2 className="text-xl lg:text-3xl mt-5 lg:mt-0 md:mb-3">Hello, I am</h2>
            <h1 className="text-2xl lg:text-5xl font-bold overflow-hidden mb-5">
              Muhamad Fadlan Anshari, <span className="text-blue-400">Web</span> Developer
            </h1>
            <p className="text-base">
              A Computer Science student at the Institute of Technology Indonesia with experience in web programming, particularly with React.js, Bootstrap, Tailwind, and Express.js.. Have a desire to develop skills in the field of web
              programming.
            </p>
            <a href="https://fadlansporto.vercel.app/" download="Muhamad_Fadlan_Anshari-Resume.pdf" className="font-semibold py-3 px-5 bg-blue-400 hover:bg-blue-500 rounded-md text-white text-base">
              Detail Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;