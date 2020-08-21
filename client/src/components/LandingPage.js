/* eslint no-use-before-define: 0 */ // --> OFF
import React from 'react';

export default function LandingPage() {
  return (
    <>
      <div
        className="py-20"
        style={{
          background:
            'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(189,246,212,1) 0%, rgba(5,197,236,1) 77%)',
        }}
      >
        <div className="container mx-auto px-6 font-sans">
          <h2 className="text-6xl font-bold mb-2 text-black">
            Welcome to Group Tripper
          </h2>
          <h3 className="text-2xl mb-8 text-black-200">
            Design outstanding group travel iteneraries
          </h3>
          <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider hover:bg-teal-600 mt-4 mb-2">
            SIGN UP FOR FREE
          </button>
        </div>
      </div>
      <section className="container mx-auto px-6 p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Features
        </h2>
        <div className="flex items-center flex-wrap mb-20">
          <div className="w-full md:w-1/2">
            <h4 className="text-3xl text-gray-800 font-bold mb-3">
              A time saving tool for travel organizers
            </h4>
            <p className="text-gray-600 mb-8">
              GroupTripper is a group travel itinerary solution,allowing
              organizers and participants to save time while planning and
              designing attractive and complex itineraries..
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src="./map (1).png" alt="Monitoring" />
          </div>
        </div>

        <div className="flex items-center flex-wrap mb-20">
          <div className="w-full md:w-1/2">
            <img src="./project-plan.png" alt="Reporting" />
          </div>
          <div className="w-full md:w-1/2 pl-10">
            <h4 className="text-3xl text-gray-800 font-bold mb-3">Customize</h4>
            <p className="text-gray-600 mb-8">
              Modify your itenerary in any way you prefer, vote on preferred
              stops/activities, start conversation on details and much more
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap mb-20">
          <div className="w-full md:w-1/2">
            <h4 className="text-3xl text-gray-800 font-bold mb-3">
              Collaborate
            </h4>
            <p className="text-gray-600 mb-8">
              Not the only one in charge of organizing a trip ? No worries.
              Collaborate on your plan with your team, local agency or guide.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src="./team.png" alt="team" />
          </div>
        </div>
      </section>
      <section class="bg-gray-100">
        <div class="container mx-auto px-6 py-20">
          <h2 class="text-4xl font-bold text-center text-gray-800 mb-8">
            Testimonials
          </h2>
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/3 px-2 mb-4">
              <div class="bg-white rounded shadow py-2">
                <p class="text-gray-800 text-base px-6 mb-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  sed, cupiditate debitis quibusdam eum quaerat. Corporis
                  sapiente quod amet ducimus.
                </p>
                <p class="text-gray-500 text-xs md:text-sm px-6">John Doe</p>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2 mb-4">
              <div class="bg-white rounded shadow py-2">
                <p class="text-gray-800 text-base px-6 mb-5">
                  I downloaded this app a while back. It was nothing bad at
                  first until I began to enjoy it too much. I became obsessed.
                  My wife, Karen, hated my obsession. She said I yelled too much
                  My own children were scared of me. She sent me to rehab and
                  and it worked! I felt like a new man! Everything was great
                  until the app… it seemed it lurked in my dreams. There was no
                  escape. I couldn’t help myself. It was worse than ever.
                  Constantly I was using this app, everything I did was about
                  this app, all I did was use this app. Overall it’s a great
                  app, but Karen, if you see this, please come back, and at
                  least let me see my kids on Christmas.
                </p>
                <p class="text-gray-500 text-xs md:text-sm px-6">Joe Doe</p>
              </div>
            </div>
            <div class="w-full md:w-1/3 px-2 mb-4">
              <div class="bg-white rounded shadow py-2">
                <p class="text-gray-800 text-base px-6 mb-5">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Expedita iusto debitis labore numquam praesentium.
                </p>
                <p class="text-gray-500 text-xs md:text-sm px-6">James Doe</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="bg-gray-100">
        <div class="container mx-auto px-6 pt-10 pb-6">
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 text-center md:text-center">
              <h5 class="uppercase mb-6 font-bold">Links</h5>
              <ul class="mb-4">
                <li class="mt-2">
                  <a
                    href="#"
                    class="hover:underline text-gray-600 hover:text-orange-500"
                  >
                    FAQ
                  </a>
                </li>
                <li class="mt-2">
                  <a
                    href="#"
                    class="hover:underline text-gray-600 hover:text-orange-500"
                  >
                    Help
                  </a>
                </li>
                <li class="mt-2">
                  <a
                    href="#"
                    class="hover:underline text-gray-600 hover:text-orange-500"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div class="w-full md:w-1/2 text-center md:text-center">
              <h5 class="uppercase mb-6 font-bold">Social</h5>
              <ul class="mb-4">
                <li class="mt-2">
                  <a
                    href="#"
                    class="hover:underline text-gray-600 hover:text-orange-500"
                  >
                    Facebook
                  </a>
                </li>
                <li class="mt-2">
                  <a
                    href="#"
                    class="hover:underline text-gray-600 hover:text-orange-500"
                  >
                    Linkedin
                  </a>
                </li>
                <li class="mt-2">
                  <a
                    href="#"
                    class="hover:underline text-gray-600 hover:text-orange-500"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
