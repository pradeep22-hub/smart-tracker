import React from 'react'

const Hero = () => {
  return (
    <section className="bg-white lg:grid lg:h-screen lg:place-content-center">
  <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-prose text-center">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
      Track Today,  
        <strong className="text-green-600"> Save </strong>
        Tomorrow
      </h1>

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
        “A simple way to manage spending and build better saving habits.”
      </p>

      <div className="mt-4 flex justify-center gap-4 sm:mt-6">
        <a
          className="inline-block rounded border border-green-600 bg-green-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-green-700"
          href="/sign-in"
        >
          Get Started
        </a>

       
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero