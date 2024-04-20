import React from 'react';

export default function Blog() {
  return (
    <div>
      <section className="pt-24 pb-36 bg-cyan-950 overflow-hidden">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl mt-20 md:text-4xl pt-35 mb-6 text-6xl xl:text-10xl text-white font-bold font-heading tracking-px-n leading-none transform transition duration-500 hover:scale-110 hover:rotate-12 hover:text-yellow-400">
            Reading Material for Winning Pitch Decks
          </h2>

          <div className="flex flex-wrap -m-8">
            <div className="w-full md:w-1/3 p-8">
              <div className="p-4 h-full bg-gray-900 bg-opacity-70 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 hover:shadow-lg">
                <div className="mb-8">
                  <div className="mb-9 w-full overflow-hidden rounded-2xl">
                    <a href="https://www.parati.in/post/building-blocks-of-a-perfect-pitch-deck" target="_blank" rel="noopener noreferrer">
                      <img className="w-full h-18 transform hover:scale-105 transition ease-in-out duration-1000" src="https://raw.githubusercontent.com/Adarshaparati/Eos-suit/main/Basics%20of%20pitchdeck.png" alt="Thumbnail" />
                    </a>
                  </div>
                  <p className="mb-3 text-sm text-gray-400 font-medium">Basics of pitchdeck</p>
                  <a href="https://www.parati.in/post/building-blocks-of-a-perfect-pitch-deck" target="_blank" rel="noopener noreferrer" className="inline-block text-white hover:text-gray-200 hover:underline">
                    <h3 className="text-xl font-bold font-heading leading-normal">Building blocks of a perfect pitch deck</h3>
                  </a>
                </div>
                <p className="text-sm text-gray-400 font-medium"></p>
              </div>
            </div>
            {/* Repeat the same structure for other blog items */}
            <div className="w-full md:w-1/3 p-8">
              <div className="p-4 h-full bg-gray-900 bg-opacity-70 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 hover:shadow-lg">
                <div className="mb-8">
                  <div className="mb-9 w-full overflow-hidden rounded-2xl">
                    <a href="https://www.parati.in/post/from-diy-to-ai-the-evolution-of-pitch-deck-creation" target="_blank" rel="noopener noreferrer">
                      <img className="w-full transform hover:scale-105 transition ease-in-out duration-1000" src="https://raw.githubusercontent.com/Adarshaparati/Eos-suit/main/DIY%20to%20AI.png" alt="Thumbnail" />
                    </a>
                  </div>
                  <p className="mb-3 text-sm text-gray-400 font-medium">DIY to AI</p>
                  <a href="https://www.parati.in/post/from-diy-to-ai-the-evolution-of-pitch-deck-creation" target="_blank" rel="noopener noreferrer" className="inline-block text-white hover:text-gray-200 hover:underline">
                    <h3 className="text-xl font-bold font-heading leading-normal">From DIY to AI: The Evolution of Pitch Deck Creation</h3>
                  </a>
                </div>
                <p className="text-sm text-gray-400 font-medium"></p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-8">
              <div className="p-4 h-full bg-gray-900 bg-opacity-70 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:border-blue-500 hover:shadow-lg">
                <div className="mb-8">
                  <div className="mb-9 w-full overflow-hidden rounded-2xl">
                    <a href="https://www.parati.in/post/the-investor-s-perspective-what-they-look-for-in-a-pitch-deck" target="_blank" rel="noopener noreferrer">
                      <img className="w-full transform hover:scale-105 transition ease-in-out duration-1000" src="https://raw.githubusercontent.com/Adarshaparati/Eos-suit/main/Investors%20Perspective.jpg" alt="Thumbnail" />
                    </a>
                  </div>
                  <p className="mb-3 text-sm text-gray-400 font-medium">Investors Perspective</p>
                  <a href="https://www.parati.in/post/the-investor-s-perspective-what-they-look-for-in-a-pitch-deck" target="_blank" rel="noopener noreferrer" className="inline-block text-white hover:text-gray-200 hover:underline">
                    <h3 className="text-xl font-bold font-heading leading-normal">The Investor's Perspective: What They Look for in a Pitch Deck</h3>
                  </a>
                </div>
                <p className="text-sm text-gray-400 font-medium"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
