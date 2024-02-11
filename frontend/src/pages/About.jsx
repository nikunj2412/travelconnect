import React from "react";
import { TfiThought } from "react-icons/tfi";
import { PiGlobeHemisphereEastBold } from "react-icons/pi";
import { SiEthiopianairlines } from "react-icons/si";

const About = () => {
  return (
    <>
      <section className="relative  bg-blueGray-50">
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-slate-400 bg-contain about-bg"
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-60 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Our story.
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto translate-z-0 bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          >
          </div>
        </div>
        <section className="pb-10 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                    <TfiThought/>
                    </div>
                    <h6 className="text-xl font-semibold">Vision</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    We envision a future where every journey is an opportunity for discovery, connection, and personal growth, enriching lives and shaping a more globally conscious community.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-orange-600">
                    <PiGlobeHemisphereEastBold/>
                    </div>
                    <h6 className="text-xl font-semibold">Mission</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    Our mission is to inspire and empower travelers by providing them with comprehensive resources, personalized recommendations, and seamless booking experiences
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <SiEthiopianairlines/>
                    </div>
                    <h6 className="text-xl font-semibold">Values</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                    We prioritize the needs and preferences of our users, delivering personalized and memorable experiences. We are committed to environmental responsibility and promoting sustainable travel practices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default About;
